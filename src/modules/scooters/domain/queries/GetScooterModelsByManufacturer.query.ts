export interface GetScooterModelsByManufacturerQueryProps {
  manufacturer: string;
}

export class GetScooterModelsByManufacturerQuery {
  public readonly manufacturer: string;

  constructor(props: GetScooterModelsByManufacturerQueryProps) {
    this.manufacturer = props.manufacturer;
  }
}
