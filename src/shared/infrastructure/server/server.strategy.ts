export type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

export interface ServerStrategy {
  start(): void;
  stop(): void;
  registerRoute(method: HttpMethod, path: string, handler: Function): void;
  registerMiddleware(middleware: any): void;
}
