export interface UpdateScooterModelCommandProps {
  id: number;
  name?: string;
  manufacturer?: string;
  maxSpeed?: number;
  maxRange?: number;
  batteryCapacity?: number;
  weight?: number;
  maxWeight?: number;
  dimensions?: string;
  releaseYear?: number;
  warrantyPeriod?: number;
}

export class UpdateScooterModelCommand {
  public readonly id: number;
  public readonly name?: string;
  public readonly manufacturer?: string;
  public readonly maxSpeed?: number;
  public readonly maxRange?: number;
  public readonly batteryCapacity?: number;
  public readonly weight?: number;
  public readonly maxWeight?: number;
  public readonly dimensions?: string;
  public readonly releaseYear?: number;
  public readonly warrantyPeriod?: number;

  constructor(props: UpdateScooterModelCommandProps) {
    this.id = props.id;
    this.name = props.name;
    this.manufacturer = props.manufacturer;
    this.maxSpeed = props.maxSpeed;
    this.maxRange = props.maxRange;
    this.batteryCapacity = props.batteryCapacity;
    this.weight = props.weight;
    this.maxWeight = props.maxWeight;
    this.dimensions = props.dimensions;
    this.releaseYear = props.releaseYear;
    this.warrantyPeriod = props.warrantyPeriod;
  }
}
