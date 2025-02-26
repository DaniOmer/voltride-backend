import {
  Maintenance,
  MaintenanceStatus,
  IMaintenanceRepository,
} from "../../domain";
import { MaintenanceType } from "../../domain";
import { MaintenanceModel } from "../models/maintenance.model";

export class PostgresMaintenanceRepository implements IMaintenanceRepository {
  async create(maintenance: Maintenance): Promise<Maintenance> {
    await MaintenanceModel.create({
      uid: maintenance.uid,
      scooterId: maintenance.scooterId,
      scooterUid: maintenance.scooterUid,
      maintenanceType: maintenance.maintenanceType,
      status: maintenance.status,
      scheduledDate: maintenance.scheduledDate,
      completedDate: maintenance.completedDate,
      technician: maintenance.technician,
      cost: maintenance.cost,
      notes: maintenance.notes,
      replacedParts: maintenance.replacedParts,
    });
    return maintenance;
  }

  async findAll(): Promise<Maintenance[]> {
    const maintenanceModels = await MaintenanceModel.findAll();
    return maintenanceModels.map((model) => this.mapToEntity(model));
  }

  async findById(id: number): Promise<Maintenance | null> {
    const maintenanceModel = await MaintenanceModel.findByPk(id);
    if (!maintenanceModel) return null;
    return this.mapToEntity(maintenanceModel);
  }

  async findByUid(uid: string): Promise<Maintenance | null> {
    const maintenanceModel = await MaintenanceModel.findOne({
      where: { uid },
    });
    if (!maintenanceModel) return null;
    return this.mapToEntity(maintenanceModel);
  }

  async findByScooterId(scooterId: number): Promise<Maintenance[]> {
    const maintenanceModels = await MaintenanceModel.findAll({
      where: { scooterId },
    });
    return maintenanceModels.map((model) => this.mapToEntity(model));
  }

  async findByScooterUid(scooterUid: string): Promise<Maintenance[]> {
    const maintenanceModels = await MaintenanceModel.findAll({
      where: { scooterUid },
    });
    return maintenanceModels.map((model) => this.mapToEntity(model));
  }

  async findByMaintenanceType(type: MaintenanceType): Promise<Maintenance[]> {
    const maintenanceModels = await MaintenanceModel.findAll({
      where: { maintenanceType: type },
    });
    return maintenanceModels.map((model) => this.mapToEntity(model));
  }

  async findByStatus(status: MaintenanceStatus): Promise<Maintenance[]> {
    const maintenanceModels = await MaintenanceModel.findAll({
      where: { status },
    });
    return maintenanceModels.map((model) => this.mapToEntity(model));
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<Maintenance[]> {
    const { Op } = require("sequelize");
    const maintenanceModels = await MaintenanceModel.findAll({
      where: {
        scheduledDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    return maintenanceModels.map((model) => this.mapToEntity(model));
  }

  async findByTechnician(technician: string): Promise<Maintenance[]> {
    const maintenanceModels = await MaintenanceModel.findAll({
      where: { technician },
    });
    return maintenanceModels.map((model) => this.mapToEntity(model));
  }

  async update(maintenance: Maintenance): Promise<Maintenance> {
    await MaintenanceModel.update(
      {
        scooterId: maintenance.scooterId,
        scooterUid: maintenance.scooterUid,
        maintenanceType: maintenance.maintenanceType,
        status: maintenance.status,
        scheduledDate: maintenance.scheduledDate,
        completedDate: maintenance.completedDate,
        technician: maintenance.technician,
        cost: maintenance.cost,
        notes: maintenance.notes,
        replacedParts: maintenance.replacedParts,
      },
      { where: { uid: maintenance.uid } }
    );
    return maintenance;
  }

  async delete(id: number): Promise<void> {
    await MaintenanceModel.destroy({ where: { id } });
  }

  private mapToEntity(model: MaintenanceModel): Maintenance {
    return new Maintenance({
      id: model.id,
      uid: model.uid,
      scooterId: model.scooterId,
      scooterUid: model.scooterUid,
      maintenanceType: model.maintenanceType,
      status: model.status,
      scheduledDate: model.scheduledDate,
      completedDate: model.completedDate,
      technician: model.technician,
      cost: model.cost,
      notes: model.notes,
      replacedParts: model.replacedParts,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}
