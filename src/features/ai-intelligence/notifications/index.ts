/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Multi-Channel Notification & Alert Rules
 */

export type NotificationChannel = "Email" | "Webhook" | "InApp";

export interface NotificationPreference {
  organizationId: string;
  enabledChannels: NotificationChannel[];
  targetEmail?: string;
  webhookUrl?: string;
}

export interface AlertRule {
  id: string;
  organizationId: string;
  metricName: "overallScore" | "citationCount";
  threshold: number;
  condition: "below" | "above";
  channels: NotificationChannel[];
}

export interface INotificationDeliverer {
  deliver(
    organizationId: string,
    channel: NotificationChannel,
    subject: string,
    body: string
  ): Promise<boolean>;
}

/**
 * Concrete Multi-Channel Notification Dispatcher
 */
export class NotificationDeliverer implements INotificationDeliverer {
  private deliveryHistory: { channel: NotificationChannel; subject: string; deliveredAt: string }[] = [];

  public async deliver(
    organizationId: string,
    channel: NotificationChannel,
    subject: string,
    body: string
  ): Promise<boolean> {
    console.log(`[NotificationDeliverer] Tenant ${organizationId} Routing Alert via ${channel}...`);
    console.log(`   * Subject: "${subject}"`);
    console.log(`   * Content: "${body.substring(0, 100)}..."`);

    this.deliveryHistory.push({
      channel,
      subject,
      deliveredAt: new Date().toISOString()
    });

    return true;
  }

  public getHistory(): typeof this.deliveryHistory {
    return this.deliveryHistory;
  }
}
