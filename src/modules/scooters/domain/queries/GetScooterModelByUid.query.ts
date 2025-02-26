export interface GetScooterModelByUidQueryProps {
  uid: string;
}

export class GetScooterModelByUidQuery {
  public readonly uid: string;

  constructor(props: GetScooterModelByUidQueryProps) {
    this.uid = props.uid;
  }
}
