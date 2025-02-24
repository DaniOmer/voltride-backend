export interface NotificationStrategy {
  prepare(data: any): object;
  send(data: any): Promise<any>;
}
