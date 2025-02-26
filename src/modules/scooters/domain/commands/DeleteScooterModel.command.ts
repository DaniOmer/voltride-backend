export interface DeleteScooterModelCommandProps {
  id: number;
}

export class DeleteScooterModelCommand {
  public readonly id: number;

  constructor(props: DeleteScooterModelCommandProps) {
    this.id = props.id;
  }
}
