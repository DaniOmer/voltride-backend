import {
  BaseRouter,
  ServerStrategy,
  ServerRequest,
  ServerResponse,
} from "../../../../shared/infrastructure";
import { ScooterController } from "../controllers/scooter.controller";

export class ScooterRouter implements BaseRouter {
  constructor(private readonly controller: ScooterController) {}

  registerRoutes(server: ServerStrategy): void {
    // Create a new scooter
    server.registerRoute(
      "post",
      "/api/scooters",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.createScooter(req, res)
    );

    // Get all scooters
    server.registerRoute(
      "get",
      "/api/scooters",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getAllScooters(req, res)
    );

    // Get scooter by ID
    server.registerRoute(
      "get",
      "/api/scooters/:id",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getScooterById(req, res)
    );

    // Get scooter by UID
    server.registerRoute(
      "get",
      "/api/scooters/uid/:uid",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getScooterByUid(req, res)
    );

    // Update scooter
    server.registerRoute(
      "put",
      "/api/scooters/:id",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.updateScooter(req, res)
    );

    // Update scooter status
    server.registerRoute(
      "patch",
      "/api/scooters/:id/status",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.updateScooterStatus(req, res)
    );

    // Update scooter battery level
    server.registerRoute(
      "patch",
      "/api/scooters/:id/battery",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.updateScooterBattery(req, res)
    );

    // Update scooter mileage
    server.registerRoute(
      "patch",
      "/api/scooters/:id/mileage",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.updateScooterMileage(req, res)
    );

    // Delete scooter
    server.registerRoute(
      "delete",
      "/api/scooters/:id",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.deleteScooter(req, res)
    );
  }
}
