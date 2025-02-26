import { v4 as uuidv4 } from "uuid";
import {
  IMaintenanceScheduleRepository,
  IScooterRepository,
  IScooterModelRepository,
  MaintenanceSchedule,
  MaintenanceType,
  IntervalUnit,
  MaintenanceDueEvent,
} from "../../domain";
import { IEventStore } from "../../../../shared/domain/events/events.interface";

export class MaintenanceSchedulingService {
  constructor(
    private readonly maintenanceScheduleRepository: IMaintenanceScheduleRepository,
    private readonly scooterRepository: IScooterRepository,
    private readonly scooterModelRepository: IScooterModelRepository,
    private readonly eventStore: IEventStore
  ) {}

  async scheduleMaintenanceForScooter(
    scooterId: number,
    scooterUid: string,
    scooterModelId: number,
    scooterModelUid: string,
    maintenanceType: MaintenanceType,
    interval: number,
    intervalUnit: IntervalUnit,
    nextDueDate: Date,
    notificationRecipients?: string[]
  ): Promise<MaintenanceSchedule> {
    // Create a new maintenance schedule
    const maintenanceSchedule = new MaintenanceSchedule({
      uid: uuidv4(),
      scooterId,
      scooterUid,
      scooterModelId,
      scooterModelUid,
      maintenanceType,
      interval,
      intervalUnit,
      nextDueDate,
      notificationSent: false,
      notificationRecipients,
      isActive: true,
    });

    // Save the maintenance schedule
    await this.maintenanceScheduleRepository.create(maintenanceSchedule);

    return maintenanceSchedule;
  }

  async updateMaintenanceSchedule(
    scheduleId: number,
    interval?: number,
    intervalUnit?: IntervalUnit,
    nextDueDate?: Date,
    isActive?: boolean
  ): Promise<MaintenanceSchedule | null> {
    // Find the maintenance schedule
    const schedule = await this.maintenanceScheduleRepository.findById(
      scheduleId
    );
    if (!schedule) {
      return null;
    }

    // Update the schedule properties
    if (interval !== undefined) {
      schedule.interval = interval;
    }
    if (intervalUnit !== undefined) {
      schedule.intervalUnit = intervalUnit;
    }
    if (nextDueDate !== undefined) {
      schedule.nextDueDate = nextDueDate;
    }
    if (isActive !== undefined) {
      if (isActive) {
        schedule.activate();
      } else {
        schedule.deactivate();
      }
    }

    // Save the updated schedule
    await this.maintenanceScheduleRepository.update(schedule);

    return schedule;
  }

  async markMaintenanceAsPerformed(
    scheduleId: number,
    performedDate: Date
  ): Promise<MaintenanceSchedule | null> {
    // Find the maintenance schedule
    const schedule = await this.maintenanceScheduleRepository.findById(
      scheduleId
    );
    if (!schedule) {
      return null;
    }

    // Update the last performed date and calculate the next due date
    schedule.updateLastPerformedDate(performedDate);

    // Save the updated schedule
    await this.maintenanceScheduleRepository.update(schedule);

    return schedule;
  }

  async checkDueMaintenances(): Promise<void> {
    // Get all active maintenance schedules that are due
    const dueSchedules =
      await this.maintenanceScheduleRepository.findDueSchedules();

    // Process each due schedule
    for (const schedule of dueSchedules) {
      // Get the scooter details
      const scooter = await this.scooterRepository.findById(schedule.scooterId);
      if (!scooter) {
        continue;
      }

      // Calculate days overdue
      const now = new Date();
      const daysOverdue = Math.ceil(
        (now.getTime() - schedule.nextDueDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Publish a maintenance due event
      const maintenanceDueEvent = new MaintenanceDueEvent({
        scooterId: schedule.scooterId,
        scooterUid: schedule.scooterUid,
        scooterSerialNumber: scooter.serialNumber,
        scooterModelId: scooter.modelId,
        scooterModelUid: scooter.modelUid,
        scooterModelName: scooter.modelName,
        maintenanceType: schedule.maintenanceType,
        scheduledDate: schedule.nextDueDate,
        daysOverdue,
      });

      this.eventStore.publish(maintenanceDueEvent);
    }
  }

  async getUpcomingMaintenances(
    daysAhead: number = 7
  ): Promise<MaintenanceSchedule[]> {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + daysAhead);

    // Get all active schedules
    const activeSchedules =
      await this.maintenanceScheduleRepository.findActiveSchedules();

    // Filter schedules that are due within the specified days
    return activeSchedules.filter((schedule) => {
      return schedule.nextDueDate >= now && schedule.nextDueDate <= futureDate;
    });
  }

  async getMaintenanceSchedulesByScooter(
    scooterId: number
  ): Promise<MaintenanceSchedule[]> {
    return this.maintenanceScheduleRepository.findByScooterId(scooterId);
  }

  async getMaintenanceSchedulesByType(
    maintenanceType: MaintenanceType
  ): Promise<MaintenanceSchedule[]> {
    return this.maintenanceScheduleRepository.findByMaintenanceType(
      maintenanceType
    );
  }
}
