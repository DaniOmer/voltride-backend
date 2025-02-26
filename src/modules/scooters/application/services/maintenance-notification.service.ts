import { NotificationFactory } from "../../../../shared/infrastructure/notifications/notification.factory";
import { NotificationStrategy } from "../../../../shared/application/services/notification.strategy";

export class MaintenanceNotificationService {
  private readonly emailNotification: NotificationStrategy;
  private readonly smsNotification: NotificationStrategy;

  constructor() {
    this.emailNotification = NotificationFactory.create("email");
    this.smsNotification = NotificationFactory.create("sms");
  }

  async sendMaintenanceDueNotification(
    recipients: string[],
    scooterSerialNumber: string,
    scooterModel: string,
    maintenanceType: string,
    scheduledDate: Date
  ): Promise<void> {
    const subject = `Maintenance Due: ${scooterSerialNumber} (${maintenanceType})`;
    const formattedDate = scheduledDate.toLocaleDateString();

    const message = `
      Maintenance Alert
      -----------------
      
      Scooter: ${scooterSerialNumber}
      Model: ${scooterModel}
      Maintenance Type: ${maintenanceType}
      Scheduled Date: ${formattedDate}
      
      Please schedule this maintenance as soon as possible.
      
      This is an automated notification from the VoltRide Maintenance System.
    `;

    // Send email notification
    for (const recipient of recipients) {
      await this.emailNotification.send({
        recipient,
        subject,
        templateName: "maintenance-due.html", // We'll use a generic template
        params: {
          message,
          scooterSerialNumber,
          scooterModel,
          maintenanceType,
          scheduledDate: formattedDate,
        },
      });
    }
  }

  async sendMaintenanceCompletedNotification(
    recipients: string[],
    scooterSerialNumber: string,
    scooterModel: string,
    maintenanceType: string,
    completedDate: Date,
    technician: string,
    cost: number
  ): Promise<void> {
    const subject = `Maintenance Completed: ${scooterSerialNumber} (${maintenanceType})`;
    const formattedDate = completedDate.toLocaleDateString();
    const formattedCost = cost.toFixed(2);

    const message = `
      Maintenance Completed
      --------------------
      
      Scooter: ${scooterSerialNumber}
      Model: ${scooterModel}
      Maintenance Type: ${maintenanceType}
      Completed Date: ${formattedDate}
      Technician: ${technician}
      Cost: $${formattedCost}
      
      The maintenance has been successfully completed.
      
      This is an automated notification from the VoltRide Maintenance System.
    `;

    // Send email notification
    for (const recipient of recipients) {
      await this.emailNotification.send({
        recipient,
        subject,
        templateName: "maintenance-completed.html", // We'll use a generic template
        params: {
          message,
          scooterSerialNumber,
          scooterModel,
          maintenanceType,
          completedDate: formattedDate,
          technician,
          cost: formattedCost,
        },
      });
    }
  }

  async sendFaultReportedNotification(
    recipients: string[],
    scooterSerialNumber: string,
    scooterModel: string,
    faultTitle: string,
    reportedBy: string,
    reportedDate: Date,
    severity: string,
    isWarrantyClaim: boolean
  ): Promise<void> {
    const subject = `Fault Reported: ${scooterSerialNumber} - ${faultTitle}`;
    const formattedDate = reportedDate.toLocaleDateString();
    const warrantyStatus = isWarrantyClaim ? "Yes (Pending)" : "No";

    const message = `
      Fault Report
      -----------
      
      Scooter: ${scooterSerialNumber}
      Model: ${scooterModel}
      Fault: ${faultTitle}
      Severity: ${severity.toUpperCase()}
      Reported By: ${reportedBy}
      Reported Date: ${formattedDate}
      Warranty Claim: ${warrantyStatus}
      
      Please review this fault report and take appropriate action.
      
      This is an automated notification from the VoltRide Maintenance System.
    `;

    // Send email notification
    for (const recipient of recipients) {
      await this.emailNotification.send({
        recipient,
        subject,
        templateName: "fault-reported.html", // We'll use a generic template
        params: {
          message,
          scooterSerialNumber,
          scooterModel,
          faultTitle,
          severity: severity.toUpperCase(),
          reportedBy,
          reportedDate: formattedDate,
          warrantyStatus,
        },
      });
    }

    // For critical faults, also send SMS
    if (severity === "critical") {
      const smsMessage = `CRITICAL FAULT: ${scooterSerialNumber} - ${faultTitle}. Immediate attention required.`;

      // Send to first recipient (usually the manager)
      if (recipients.length > 0) {
        await this.smsNotification.send({
          recipient: recipients[0],
          subject,
          templateName: "sms-template.txt", // Simple template for SMS
          params: {
            message: smsMessage,
          },
        });
      }
    }
  }

  async sendFaultResolvedNotification(
    recipients: string[],
    scooterSerialNumber: string,
    scooterModel: string,
    faultTitle: string,
    resolutionDate: Date,
    downtime: number,
    cost: number
  ): Promise<void> {
    const subject = `Fault Resolved: ${scooterSerialNumber} - ${faultTitle}`;
    const formattedDate = resolutionDate.toLocaleDateString();
    const formattedCost = cost.toFixed(2);
    const downtimeHours = Math.floor(downtime);
    const downtimeMinutes = Math.round((downtime - downtimeHours) * 60);

    const message = `
      Fault Resolution
      ---------------
      
      Scooter: ${scooterSerialNumber}
      Model: ${scooterModel}
      Fault: ${faultTitle}
      Resolution Date: ${formattedDate}
      Downtime: ${downtimeHours}h ${downtimeMinutes}m
      Cost: $${formattedCost}
      
      The fault has been successfully resolved.
      
      This is an automated notification from the VoltRide Maintenance System.
    `;

    // Send email notification
    for (const recipient of recipients) {
      await this.emailNotification.send({
        recipient,
        subject,
        templateName: "fault-resolved.html", // We'll use a generic template
        params: {
          message,
          scooterSerialNumber,
          scooterModel,
          faultTitle,
          resolutionDate: formattedDate,
          downtimeHours,
          downtimeMinutes,
          cost: formattedCost,
        },
      });
    }
  }
}
