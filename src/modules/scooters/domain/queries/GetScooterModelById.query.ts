export interface GetScooterModelByIdQueryProps {
  id: number;
}

export class GetScooterModelByIdQuery {
  public readonly id: number;

  constructor(props: GetScooterModelByIdQueryProps) {
    this.id = props.id;
  }
}
