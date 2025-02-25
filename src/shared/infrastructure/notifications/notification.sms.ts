import { NotificationStrategy } from "../../application/services/notification.strategy";

export class SMSNotification implements NotificationStrategy {
  prepare(data: any): object {
    return {};
  }

  async send(data: any): Promise<boolean> {
    return true;
  }
}
