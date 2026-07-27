import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { TenantContextManager } from '@/core/database/tenant-context';
import { PostgresClient } from '@/features/admin/infrastructure/persistence/postgres';

const querySchema = z.object({
  entityName: z.string().min(1, 'entityName must be provided'),
});

interface QueryRelationRow {
  id: string;
  relationship_type: string;
  properties: string | Record<string, unknown>;
  created_at: string;
  updated_at: string;
  source_entity_id: string;
  source_name: string;
  source_type: string;
  target_entity_id: string;
  target_name: string;
  target_type: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = querySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Bad Request', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { entityName } = parsed.data;

    // Secure multi-tenant context extraction
    const organizationId = req.headers.get('x-tenant-id') || 'tenant-pipeline-a';
    const userId = req.headers.get('x-user-id') || 'usr-1001';
    const requestId = req.headers.get('x-request-id') || `req-${Date.now()}`;

    const subGraph = await TenantContextManager.runWithTenantContext(
      organizationId,
      userId,
      requestId,
      async () => {
        const pg = PostgresClient.getInstance();

        // 1. Query target entity case-insensitively
        const entitySql = `
          SELECT id, name, type, properties, created_at, updated_at
          FROM kg_entities
          WHERE LOWER(name) = LOWER($1) LIMIT 1;
        `;
        const entityRes = await pg.query(entitySql, [entityName]);

        if (!entityRes.rowCount || entityRes.rowCount === 0) {
          return {
            entity: null,
            relationships: [],
          };
        }

        const entityRow = entityRes.rows[0];
        const entity = {
          id: entityRow.id,
          name: entityRow.name,
          type: entityRow.type,
          properties: typeof entityRow.properties === 'string'
            ? JSON.parse(entityRow.properties)
            : (entityRow.properties || {}),
          createdAt: entityRow.created_at,
          updatedAt: entityRow.updated_at,
        };

        // 2. Query all 1-hop relationships (where target entity is source or target)
        const relSql = `
          SELECT
            r.id,
            r.source_entity_id,
            r.target_entity_id,
            r.relationship_type,
            r.properties,
            r.created_at,
            r.updated_at,
            s.name AS source_name,
            s.type AS source_type,
            t.name AS target_name,
            t.type AS target_type
          FROM kg_relationships r
          JOIN kg_entities s ON r.source_entity_id = s.id
          JOIN kg_entities t ON r.target_entity_id = t.id
          WHERE r.source_entity_id = $1 OR r.target_entity_id = $1;
        `;
        const relRes = await pg.query(relSql, [entity.id]);
        const relationshipsRows = (relRes.rows || []) as unknown as QueryRelationRow[];

        const relationships = relationshipsRows.map((row) => ({
          id: row.id,
          relationshipType: row.relationship_type,
          properties: typeof row.properties === 'string'
            ? JSON.parse(row.properties)
            : (row.properties || {}),
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          source: {
            id: row.source_entity_id,
            name: row.source_name,
            type: row.source_type,
          },
          target: {
            id: row.target_entity_id,
            name: row.target_name,
            type: row.target_type,
          },
        }));

        return {
          entity,
          relationships,
        };
      }
    );

    return NextResponse.json({ subGraph });
  } catch (error: unknown) {
    console.error('[API Knowledge Graph Query Route Error]:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal Server Error', message },
      { status: 500 }
    );
  }
}
