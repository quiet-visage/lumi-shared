export enum NotificationType {
  TICKET_CREATED = "TICKET_CREATED",
  TICKET_UPDATED = "TICKET_UPDATED",
  TICKET_COMMENT = "TICKET_COMMENT",
  TICKET_ASSIGNED = "TICKET_ASSIGNED",
  TICKET_AI_REPORT = "TICKET_AI_REPORT",
  SYSTEM_ALERT = "SYSTEM_ALERT",
}

export enum NotificationSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
}

export interface NotificationAction {
  label: string;
  url: string;
}

export interface Notification {
  id: string;
  recipientAccountId: string;
  title: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  type: NotificationType;
  severity: NotificationSeverity;
  metadata: { [key: string]: any };
  actions: NotificationAction[];
  createdAt: Date;
}
