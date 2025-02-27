import { AppConfig } from "../../../config/app.config";
import { NotificationStrategy } from "../../application/services/notification.strategy";
import { BrevoMailer } from "./backends/email/brevo.backend";
import { HelperUtils } from "../../utils/helper.utils";

export type MailerDataType = {
  recipient: string;
  subject: string;
  templateName: string;
  params: object;
};

export class EmailNotification implements NotificationStrategy {
  readonly mailer: BrevoMailer;

  constructor() {
    this.mailer = new BrevoMailer(
      AppConfig.notification.email.brevoApiKey as string
    );
  }

  prepare(data: MailerDataType) {
    const { recipient, subject, templateName, params } = data;
    const templateContent = HelperUtils.htmlTemplateReader(templateName);
    return {
      recipient: recipient,
      subject: subject,
      template: templateContent,
      params: params,
    };
  }

  async send(data: MailerDataType): Promise<any> {
    const { recipient, subject, template, params } = this.prepare(data);
    const resultData = await this.mailer.sendEmail(
      recipient,
      subject,
      template,
      params
    );
    return resultData;
  }
}
