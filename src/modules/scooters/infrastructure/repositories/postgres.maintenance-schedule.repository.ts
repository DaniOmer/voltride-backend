import {
  MaintenanceSchedule,
  IMaintenanceScheduleRepository,
  NotificationStatus,
} from "../../domain";
import { IntervalUnit, MaintenanceType } from "../../domain";
import { MaintenanceScheduleModel } from "../models/maintenance-schedule.model";

export class PostgresMaintenanceScheduleRepository
  implements IMaintenanceScheduleRepository
{
  async create(schedule: MaintenanceSchedule): Promise<MaintenanceSchedule> {
    await MaintenanceScheduleModel.create({
      uid: schedule.uid,
      scooterId: schedule.scooterId,
      scooterUid: schedule.scooterUid,
      scooterModelId: schedule.scooterModelId,
      scooterModelUid: schedule.scooterModelUid,
      maintenanceType: schedule.maintenanceType,
      interval: schedule.interval,
      intervalUnit: schedule.intervalUnit,
      lastPerformedDate: schedule.lastPerformedDate,
      nextDueDate: schedule.nextDueDate,
      notificationSent: schedule.notificationSent,
      notificationStatus: schedule.notificationStatus,
      notificationDate: schedule.notificationDate,
      notificationRecipients: schedule.notificationRecipients,
      isActive: schedule.isActive,
    });
    return schedule;
  }

  async findAll(): Promise<MaintenanceSchedule[]> {
    const scheduleModels = await MaintenanceScheduleModel.findAll();
    return scheduleModels.map((model) => this.mapToEntity(model));
  }

  async findById(id: number): Promise<MaintenanceSchedule | null> {
    const scheduleModel = await MaintenanceScheduleModel.findByPk(id);
    if (!scheduleModel) return null;
    return this.mapToEntity(scheduleModel);
  }

  async findByUid(uid: string): Promise<MaintenanceSchedule | null> {
    const scheduleModel = await MaintenanceScheduleModel.findOne({
      where: { uid },
    });
    if (!scheduleModel) return null;
    return this.mapToEntity(scheduleModel);
  }

  async findByScooterId(scooterId: number): Promise<MaintenanceSchedule[]> {
    const scheduleModels = await MaintenanceScheduleModel.findAll({
      where: { scooterId },
    });
    return scheduleModels.map((model) => this.mapToEntity(model));
  }

  async findByScooterUid(scooterUid: string): Promise<MaintenanceSchedule[]> {
    const scheduleModels = await MaintenanceScheduleModel.findAll({
      where: { scooterUid },
    });
    return scheduleModels.map((model) => this.mapToEntity(model));
  }

  async findByScooterModelId(modelId: number): Promise<MaintenanceSchedule[]> {
    const scheduleModels = await MaintenanceScheduleModel.findAll({
      where: { scooterModelId: modelId },
    });
    return scheduleModels.map((model) => this.mapToEntity(model));
  }

  async findByMaintenanceType(
    type: MaintenanceType
  ): Promise<MaintenanceSchedule[]> {
    const scheduleModels = await MaintenanceScheduleModel.findAll({
      where: { maintenanceType: type },
    });
    return scheduleModels.map((model) => this.mapToEntity(model));
  }

  async findByIntervalUnit(unit: IntervalUnit): Promise<MaintenanceSchedule[]> {
    const scheduleModels = await MaintenanceScheduleModel.findAll({
      where: { intervalUnit: unit },
    });
    return scheduleModels.map((model) => this.mapToEntity(model));
  }

  async findDueSchedules(date?: Date): Promise<MaintenanceSchedule[]> {
    const { Op } = require("sequelize");
    const currentDate = date || new Date();
    const scheduleModels = await MaintenanceScheduleModel.findAll({
      where: {
        nextDueDate: {
          [Op.lte]: currentDate,
        },
        isActive: true,
      },
    });
    return scheduleModels.map((model) => this.mapToEntity(model));
  }

  async findActiveSchedules(): Promise<MaintenanceSchedule[]> {
    const scheduleModels = await MaintenanceScheduleModel.findAll({
      where: { isActive: true },
    });
    return scheduleModels.map((model) => this.mapToEntity(model));
  }

  async findPendingNotifications(): Promise<MaintenanceSchedule[]> {
    const scheduleModels = await MaintenanceScheduleModel.findAll({
      where: {
        notificationSent: false,
        notificationStatus: NotificationStatus.PENDING,
        isActive: true,
      },
    });
    return scheduleModels.map((model) => this.mapToEntity(model));
  }

  async update(schedule: MaintenanceSchedule): Promise<MaintenanceSchedule> {
    await MaintenanceScheduleModel.update(
      {
        scooterId: schedule.scooterId,
        scooterUid: schedule.scooterUid,
        scooterModelId: schedule.scooterModelId,
        scooterModelUid: schedule.scooterModelUid,
        maintenanceType: schedule.maintenanceType,
        interval: schedule.interval,
        intervalUnit: schedule.intervalUnit,
        lastPerformedDate: schedule.lastPerformedDate,
        nextDueDate: schedule.nextDueDate,
        notificationSent: schedule.notificationSent,
        notificationStatus: schedule.notificationStatus,
        notificationDate: schedule.notificationDate,
        notificationRecipients: schedule.notificationRecipients,
        isActive: schedule.isActive,
      },
      { where: { uid: schedule.uid } }
    );
    return schedule;
  }

  async delete(id: number): Promise<void> {
    await MaintenanceScheduleModel.destroy({ where: { id } });
  }

  private mapToEntity(model: MaintenanceScheduleModel): MaintenanceSchedule {
    return new MaintenanceSchedule({
      id: model.id,
      uid: model.uid,
      scooterId: model.scooterId,
      scooterUid: model.scooterUid,
      scooterModelId: model.scooterModelId,
      scooterModelUid: model.scooterModelUid,
      maintenanceType: model.maintenanceType,
      interval: model.interval,
      intervalUnit: model.intervalUnit,
      lastPerformedDate: model.lastPerformedDate,
      nextDueDate: model.nextDueDate,
      notificationSent: model.notificationSent,
      notificationStatus: model.notificationStatus,
      notificationDate: model.notificationDate,
      notificationRecipients: model.notificationRecipients,
      isActive: model.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}
