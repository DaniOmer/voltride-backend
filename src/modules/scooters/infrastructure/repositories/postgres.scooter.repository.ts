import { Scooter, IScooterRepository } from "../../domain";
import { ScooterModel } from "../models/scooter.model";

export class PostgresScooterRepository implements IScooterRepository {
  async create(scooter: Scooter): Promise<Scooter> {
    await ScooterModel.create({
      uid: scooter.uid,
      serialNumber: scooter.serialNumber,
      modelId: scooter.modelId,
      modelUid: scooter.modelUid,
      modelName: scooter.modelName,
      status: scooter.status,
      batteryLevel: scooter.batteryLevel,
      mileage: scooter.mileage,
      chargeCycles: scooter.chargeCycles,
      lastMaintenanceDate: scooter.lastMaintenanceDate,
      lastTechnicalReviewDate: scooter.lastTechnicalReviewDate,
      purchaseDate: scooter.purchaseDate,
      warrantyEndDate: scooter.warrantyEndDate,
      isActive: scooter.isActive,
    });
    return scooter;
  }

  async findAll(): Promise<Scooter[]> {
    const scooterModels = await ScooterModel.findAll();
    return scooterModels.map((scooterModel) => this.mapToEntity(scooterModel));
  }

  async findById(id: number): Promise<Scooter | null> {
    const scooterModel = await ScooterModel.findByPk(id);
    if (!scooterModel) return null;
    return this.mapToEntity(scooterModel);
  }

  async findByUid(uid: string): Promise<Scooter | null> {
    const scooterModel = await ScooterModel.findOne({ where: { uid } });
    if (!scooterModel) return null;
    return this.mapToEntity(scooterModel);
  }

  async findBySerialNumber(serialNumber: string): Promise<Scooter | null> {
    const scooterModel = await ScooterModel.findOne({
      where: { serialNumber },
    });
    if (!scooterModel) return null;
    return this.mapToEntity(scooterModel);
  }

  async findByModelId(modelId: number): Promise<Scooter[]> {
    const scooterModels = await ScooterModel.findAll({ where: { modelId } });
    return scooterModels.map((scooterModel) => this.mapToEntity(scooterModel));
  }

  async findByModelUid(modelUid: string): Promise<Scooter[]> {
    const scooterModels = await ScooterModel.findAll({ where: { modelUid } });
    return scooterModels.map((scooterModel) => this.mapToEntity(scooterModel));
  }

  async findByStatus(status: string): Promise<Scooter[]> {
    const scooterModels = await ScooterModel.findAll({ where: { status } });
    return scooterModels.map((scooterModel) => this.mapToEntity(scooterModel));
  }

  async update(scooter: Scooter): Promise<Scooter> {
    await ScooterModel.update(
      {
        serialNumber: scooter.serialNumber,
        modelId: scooter.modelId,
        modelUid: scooter.modelUid,
        modelName: scooter.modelName,
        status: scooter.status,
        batteryLevel: scooter.batteryLevel,
        mileage: scooter.mileage,
        chargeCycles: scooter.chargeCycles,
        lastMaintenanceDate: scooter.lastMaintenanceDate,
        lastTechnicalReviewDate: scooter.lastTechnicalReviewDate,
        purchaseDate: scooter.purchaseDate,
        warrantyEndDate: scooter.warrantyEndDate,
        isActive: scooter.isActive,
      },
      { where: { uid: scooter.uid } }
    );
    return scooter;
  }

  async delete(id: number): Promise<void> {
    await ScooterModel.destroy({ where: { id } });
  }

  private mapToEntity(model: ScooterModel): Scooter {
    return new Scooter({
      id: model.id,
      uid: model.uid,
      serialNumber: model.serialNumber,
      modelId: model.modelId,
      modelUid: model.modelUid,
      modelName: model.modelName,
      status: model.status,
      batteryLevel: model.batteryLevel,
      mileage: model.mileage,
      chargeCycles: model.chargeCycles,
      lastMaintenanceDate: model.lastMaintenanceDate,
      lastTechnicalReviewDate: model.lastTechnicalReviewDate,
      purchaseDate: model.purchaseDate,
      warrantyEndDate: model.warrantyEndDate,
      isActive: model.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}
