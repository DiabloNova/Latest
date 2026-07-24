# Campaign Management Architecture Specification

This document details the scheduling, execution, and state-machine transitions of GEO/AEO Evaluation campaigns.

---

## 1. Campaign Lifecycle

Campaigns transition through three explicit statuses:

```
  [draft] ──► [active] ──► [completed]
                ▲             │
                └─────────────┘
```

- **draft**: Template queries are set up. No executions are scheduled.
- **active**: Scheduled for automatic background ingestion runs.
- **completed**: Execution cycle concludes. No further queries are run.

---

## 2. Scheduling & Aggregation

The **`CampaignScheduler`** maps the execution interval of active campaigns (daily, weekly, monthly), computing exact next-run coordinates:
- **Daily**: 24-hour interval.
- **Weekly**: 7-day interval.
- **Monthly**: 30-day interval.

The **`CampaignExecutionTracker`** logs individual executions inside PostgreSQL tables, aggregating cost and processed observations counts per campaign run.
