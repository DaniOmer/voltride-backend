import {
  BaseRouter,
  ServerStrategy,
  ServerRequest,
  ServerResponse,
} from "../../../../shared/infrastructure";
import { MaintenanceController } from "../controllers/maintenance.controller";

export class MaintenanceRouter implements BaseRouter {
  constructor(private readonly controller: MaintenanceController) {}

  registerRoutes(server: ServerStrategy): void {
    // Schedule maintenance
    server.registerRoute(
      "post",
      "/api/maintenances/schedule",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.scheduleMaintenance(req, res)
    );

    // Define maintenance schedule for a scooter model
    server.registerRoute(
      "post",
      "/api/maintenance-schedules/define",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.defineMaintenanceSchedule(req, res)
    );

    // Complete maintenance
    server.registerRoute(
      "post",
      "/api/maintenances/complete",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.completeMaintenance(req, res)
    );

    // Get all maintenances
    server.registerRoute(
      "get",
      "/api/maintenances",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getAllMaintenances(req, res)
    );

    // Get maintenance by ID
    server.registerRoute(
      "get",
      "/api/maintenances/:id",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getMaintenanceById(req, res)
    );

    // Get maintenance by UID
    server.registerRoute(
      "get",
      "/api/maintenances/uid/:uid",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getMaintenanceByUid(req, res)
    );

    // Get maintenances by scooter ID
    server.registerRoute(
      "get",
      "/api/maintenances/scooter/:scooterId",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getMaintenancesByScooterId(req, res)
    );

    // Get all maintenance schedules
    server.registerRoute(
      "get",
      "/api/maintenance-schedules",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getAllMaintenanceSchedules(req, res)
    );

    // Get maintenance schedule by ID
    server.registerRoute(
      "get",
      "/api/maintenance-schedules/:id",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getMaintenanceScheduleById(req, res)
    );

    // Get maintenance schedules by scooter ID
    server.registerRoute(
      "get",
      "/api/maintenance-schedules/scooter/:scooterId",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getMaintenanceSchedulesByScooterId(req, res)
    );

    // Get maintenance schedules by model ID
    server.registerRoute(
      "get",
      "/api/maintenance-schedules/model/:modelId",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getMaintenanceSchedulesByModelId(req, res)
    );
  }
}
