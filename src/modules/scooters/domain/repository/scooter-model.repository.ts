import { ScooterModel } from "../entity/scooter-model.entity";

export interface IScooterModelRepository {
  create(scooterModel: ScooterModel): Promise<ScooterModel>;
  findAll(): Promise<ScooterModel[]>;
  findById(id: number): Promise<ScooterModel | null>;
  findByUid(uid: string): Promise<ScooterModel | null>;
  findByName(name: string): Promise<ScooterModel | null>;
  findByManufacturer(manufacturer: string): Promise<ScooterModel[]>;
  update(scooterModel: ScooterModel): Promise<ScooterModel>;
  delete(id: number): Promise<void>;
}
