import { Scooter } from "../entity/scooter.entity";

export interface IScooterRepository {
  create(scooter: Scooter): Promise<Scooter>;
  findAll(): Promise<Scooter[]>;
  findById(id: number): Promise<Scooter | null>;
  findByUid(uid: string): Promise<Scooter | null>;
  findBySerialNumber(serialNumber: string): Promise<Scooter | null>;
  findByModelId(modelId: number): Promise<Scooter[]>;
  findByModelUid(modelUid: string): Promise<Scooter[]>;
  findByStatus(status: string): Promise<Scooter[]>;
  update(scooter: Scooter): Promise<Scooter>;
  delete(id: number): Promise<void>;
}
