import { ScooterModel, IScooterModelRepository } from "../../domain";
import { ScooterModelModel } from "../models/scooter-model.model";

export class PostgresScooterModelRepository implements IScooterModelRepository {
  async create(scooterModel: ScooterModel): Promise<ScooterModel> {
    await ScooterModelModel.create({
      uid: scooterModel.uid,
      name: scooterModel.name,
      manufacturer: scooterModel.manufacturer,
      maxSpeed: scooterModel.maxSpeed,
      maxRange: scooterModel.maxRange,
      batteryCapacity: scooterModel.batteryCapacity,
      weight: scooterModel.weight,
      maxWeight: scooterModel.maxWeight,
      dimensions: scooterModel.dimensions,
      releaseYear: scooterModel.releaseYear,
      maintenanceRequirements: scooterModel.maintenanceRequirements,
      warrantyPeriod: scooterModel.warrantyPeriod,
    });
    return scooterModel;
  }

  async findAll(): Promise<ScooterModel[]> {
    const scooterModelModels = await ScooterModelModel.findAll();
    return scooterModelModels.map((model) => this.mapToEntity(model));
  }

  async findById(id: number): Promise<ScooterModel | null> {
    const scooterModelModel = await ScooterModelModel.findByPk(id);
    if (!scooterModelModel) return null;
    return this.mapToEntity(scooterModelModel);
  }

  async findByUid(uid: string): Promise<ScooterModel | null> {
    const scooterModelModel = await ScooterModelModel.findOne({
      where: { uid },
    });
    if (!scooterModelModel) return null;
    return this.mapToEntity(scooterModelModel);
  }

  async findByName(name: string): Promise<ScooterModel | null> {
    const scooterModelModel = await ScooterModelModel.findOne({
      where: { name },
    });
    if (!scooterModelModel) return null;
    return this.mapToEntity(scooterModelModel);
  }

  async findByManufacturer(manufacturer: string): Promise<ScooterModel[]> {
    const scooterModelModels = await ScooterModelModel.findAll({
      where: { manufacturer },
    });
    return scooterModelModels.map((model) => this.mapToEntity(model));
  }

  async update(scooterModel: ScooterModel): Promise<ScooterModel> {
    await ScooterModelModel.update(
      {
        name: scooterModel.name,
        manufacturer: scooterModel.manufacturer,
        maxSpeed: scooterModel.maxSpeed,
        maxRange: scooterModel.maxRange,
        batteryCapacity: scooterModel.batteryCapacity,
        weight: scooterModel.weight,
        maxWeight: scooterModel.maxWeight,
        dimensions: scooterModel.dimensions,
        releaseYear: scooterModel.releaseYear,
        maintenanceRequirements: scooterModel.maintenanceRequirements,
        warrantyPeriod: scooterModel.warrantyPeriod,
      },
      { where: { uid: scooterModel.uid } }
    );
    return scooterModel;
  }

  async delete(id: number): Promise<void> {
    await ScooterModelModel.destroy({ where: { id } });
  }

  private mapToEntity(model: ScooterModelModel): ScooterModel {
    return new ScooterModel({
      id: model.id,
      uid: model.uid,
      name: model.name,
      manufacturer: model.manufacturer,
      maxSpeed: model.maxSpeed,
      maxRange: model.maxRange,
      batteryCapacity: model.batteryCapacity,
      weight: model.weight,
      maxWeight: model.maxWeight,
      dimensions: model.dimensions,
      releaseYear: model.releaseYear,
      maintenanceRequirements: model.maintenanceRequirements,
      warrantyPeriod: model.warrantyPeriod,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}
