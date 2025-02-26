import { IntervalUnit, MaintenanceType } from "./scooter-model.entity";

export enum NotificationStatus {
  PENDING = "pending",
  SENT = "sent",
  FAILED = "failed",
}

export interface IMaintenanceSchedule {
  id?: number;
  uid: string;
  scooterId: number;
  scooterUid: string;
  scooterModelId: number;
  scooterModelUid: string;
  maintenanceType: MaintenanceType;
  interval: number;
  intervalUnit: IntervalUnit;
  lastPerformedDate?: Date;
  nextDueDate: Date;
  notificationSent: boolean;
  notificationStatus?: NotificationStatus;
  notificationDate?: Date;
  notificationRecipients?: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class MaintenanceSchedule implements IMaintenanceSchedule {
  public readonly id?: number;
  public uid: string;
  public scooterId: number;
  public scooterUid: string;
  public scooterModelId: number;
  public scooterModelUid: string;
  public maintenanceType: MaintenanceType;
  public interval: number;
  public intervalUnit: IntervalUnit;
  public lastPerformedDate?: Date;
  public nextDueDate: Date;
  public notificationSent: boolean;
  public notificationStatus?: NotificationStatus;
  public notificationDate?: Date;
  public notificationRecipients?: string[];
  public isActive: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(data: IMaintenanceSchedule) {
    this.id = data.id;
    this.uid = data.uid;
    this.scooterId = data.scooterId;
    this.scooterUid = data.scooterUid;
    this.scooterModelId = data.scooterModelId;
    this.scooterModelUid = data.scooterModelUid;
    this.maintenanceType = data.maintenanceType;
    this.interval = data.interval;
    this.intervalUnit = data.intervalUnit;
    this.lastPerformedDate = data.lastPerformedDate;
    this.nextDueDate = data.nextDueDate;
    this.notificationSent = data.notificationSent;
    this.notificationStatus = data.notificationStatus;
    this.notificationDate = data.notificationDate;
    this.notificationRecipients = data.notificationRecipients;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public updateLastPerformedDate(date: Date): void {
    this.lastPerformedDate = date;
    this.calculateNextDueDate();
    this.resetNotificationStatus();
  }

  public calculateNextDueDate(): void {
    if (!this.lastPerformedDate) {
      return;
    }

    const nextDate = new Date(this.lastPerformedDate);

    switch (this.intervalUnit) {
      case IntervalUnit.DAYS:
        nextDate.setDate(nextDate.getDate() + this.interval);
        break;
      case IntervalUnit.WEEKS:
        nextDate.setDate(nextDate.getDate() + this.interval * 7);
        break;
      case IntervalUnit.MONTHS:
        nextDate.setMonth(nextDate.getMonth() + this.interval);
        break;
      case IntervalUnit.YEARS:
        nextDate.setFullYear(nextDate.getFullYear() + this.interval);
        break;
      // For kilometers and charge_cycles, we don't update the date automatically
      // These will be updated based on scooter usage data
      default:
        break;
    }

    this.nextDueDate = nextDate;
  }

  public updateNextDueDate(date: Date): void {
    this.nextDueDate = date;
  }

  public markNotificationSent(recipients: string[]): void {
    this.notificationSent = true;
    this.notificationStatus = NotificationStatus.SENT;
    this.notificationDate = new Date();
    this.notificationRecipients = recipients;
  }

  public markNotificationFailed(): void {
    this.notificationStatus = NotificationStatus.FAILED;
    this.notificationDate = new Date();
  }

  public resetNotificationStatus(): void {
    this.notificationSent = false;
    this.notificationStatus = NotificationStatus.PENDING;
    this.notificationDate = undefined;
  }

  public activate(): void {
    this.isActive = true;
  }

  public deactivate(): void {
    this.isActive = false;
  }

  public updateInterval(interval: number, intervalUnit: IntervalUnit): void {
    this.interval = interval;
    this.intervalUnit = intervalUnit;
    this.calculateNextDueDate();
  }

  public isDue(): boolean {
    const now = new Date();
    return this.isActive && now >= this.nextDueDate;
  }

  public daysUntilDue(): number {
    const now = new Date();
    const diffTime = this.nextDueDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  toJSON() {
    return {
      id: this.id,
      uid: this.uid,
      scooterId: this.scooterId,
      scooterUid: this.scooterUid,
      scooterModelId: this.scooterModelId,
      scooterModelUid: this.scooterModelUid,
      maintenanceType: this.maintenanceType,
      interval: this.interval,
      intervalUnit: this.intervalUnit,
      lastPerformedDate: this.lastPerformedDate,
      nextDueDate: this.nextDueDate,
      notificationSent: this.notificationSent,
      notificationStatus: this.notificationStatus,
      notificationDate: this.notificationDate,
      notificationRecipients: this.notificationRecipients,
      isActive: this.isActive,
      isDue: this.isDue(),
      daysUntilDue: this.daysUntilDue(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
