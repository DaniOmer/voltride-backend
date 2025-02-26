import {
  Fault,
  FaultSeverity,
  FaultStatus,
  WarrantyStatus,
  IFaultRepository,
} from "../../domain";
import { FaultModel } from "../models/fault.model";

export class PostgresFaultRepository implements IFaultRepository {
  async create(fault: Fault): Promise<Fault> {
    await FaultModel.create({
      uid: fault.uid,
      scooterId: fault.scooterId,
      scooterUid: fault.scooterUid,
      title: fault.title,
      description: fault.description,
      reportedBy: fault.reportedBy,
      reportedDate: fault.reportedDate,
      severity: fault.severity,
      status: fault.status,
      diagnosisNotes: fault.diagnosisNotes,
      repairNotes: fault.repairNotes,
      resolutionDate: fault.resolutionDate,
      downtime: fault.downtime,
      isWarrantyClaim: fault.isWarrantyClaim,
      warrantyStatus: fault.warrantyStatus,
      warrantyNotes: fault.warrantyNotes,
      cost: fault.cost,
    });
    return fault;
  }

  async findAll(): Promise<Fault[]> {
    const faultModels = await FaultModel.findAll();
    return faultModels.map((model) => this.mapToEntity(model));
  }

  async findById(id: number): Promise<Fault | null> {
    const faultModel = await FaultModel.findByPk(id);
    if (!faultModel) return null;
    return this.mapToEntity(faultModel);
  }

  async findByUid(uid: string): Promise<Fault | null> {
    const faultModel = await FaultModel.findOne({
      where: { uid },
    });
    if (!faultModel) return null;
    return this.mapToEntity(faultModel);
  }

  async findByScooterId(scooterId: number): Promise<Fault[]> {
    const faultModels = await FaultModel.findAll({
      where: { scooterId },
    });
    return faultModels.map((model) => this.mapToEntity(model));
  }

  async findByScooterUid(scooterUid: string): Promise<Fault[]> {
    const faultModels = await FaultModel.findAll({
      where: { scooterUid },
    });
    return faultModels.map((model) => this.mapToEntity(model));
  }

  async findByStatus(status: FaultStatus): Promise<Fault[]> {
    const faultModels = await FaultModel.findAll({
      where: { status },
    });
    return faultModels.map((model) => this.mapToEntity(model));
  }

  async findBySeverity(severity: FaultSeverity): Promise<Fault[]> {
    const faultModels = await FaultModel.findAll({
      where: { severity },
    });
    return faultModels.map((model) => this.mapToEntity(model));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Fault[]> {
    const { Op } = require("sequelize");
    const faultModels = await FaultModel.findAll({
      where: {
        reportedDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    return faultModels.map((model) => this.mapToEntity(model));
  }

  async findByReportedBy(reportedBy: string): Promise<Fault[]> {
    const faultModels = await FaultModel.findAll({
      where: { reportedBy },
    });
    return faultModels.map((model) => this.mapToEntity(model));
  }

  async findWarrantyClaims(status?: WarrantyStatus): Promise<Fault[]> {
    const whereClause: any = { isWarrantyClaim: true };
    if (status) {
      whereClause.warrantyStatus = status;
    }
    const faultModels = await FaultModel.findAll({
      where: whereClause,
    });
    return faultModels.map((model) => this.mapToEntity(model));
  }

  async findUnresolvedFaults(): Promise<Fault[]> {
    const { Op } = require("sequelize");
    const faultModels = await FaultModel.findAll({
      where: {
        status: {
          [Op.notIn]: [FaultStatus.RESOLVED],
        },
      },
    });
    return faultModels.map((model) => this.mapToEntity(model));
  }

  async findByDowntimeRange(
    minHours: number,
    maxHours: number
  ): Promise<Fault[]> {
    const { Op } = require("sequelize");
    const faultModels = await FaultModel.findAll({
      where: {
        downtime: {
          [Op.between]: [minHours, maxHours],
        },
      },
    });
    return faultModels.map((model) => this.mapToEntity(model));
  }

  async update(fault: Fault): Promise<Fault> {
    await FaultModel.update(
      {
        scooterId: fault.scooterId,
        scooterUid: fault.scooterUid,
        title: fault.title,
        description: fault.description,
        reportedBy: fault.reportedBy,
        reportedDate: fault.reportedDate,
        severity: fault.severity,
        status: fault.status,
        diagnosisNotes: fault.diagnosisNotes,
        repairNotes: fault.repairNotes,
        resolutionDate: fault.resolutionDate,
        downtime: fault.downtime,
        isWarrantyClaim: fault.isWarrantyClaim,
        warrantyStatus: fault.warrantyStatus,
        warrantyNotes: fault.warrantyNotes,
        cost: fault.cost,
      },
      { where: { uid: fault.uid } }
    );
    return fault;
  }

  async delete(id: number): Promise<void> {
    await FaultModel.destroy({ where: { id } });
  }

  private mapToEntity(model: FaultModel): Fault {
    return new Fault({
      id: model.id,
      uid: model.uid,
      scooterId: model.scooterId,
      scooterUid: model.scooterUid,
      title: model.title,
      description: model.description,
      reportedBy: model.reportedBy,
      reportedDate: model.reportedDate,
      severity: model.severity,
      status: model.status,
      diagnosisNotes: model.diagnosisNotes,
      repairNotes: model.repairNotes,
      resolutionDate: model.resolutionDate,
      downtime: model.downtime,
      isWarrantyClaim: model.isWarrantyClaim,
      warrantyStatus: model.warrantyStatus,
      warrantyNotes: model.warrantyNotes,
      cost: model.cost,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}
