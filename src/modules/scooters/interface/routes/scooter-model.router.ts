import {
  BaseRouter,
  ServerStrategy,
  ServerRequest,
  ServerResponse,
} from "../../../../shared/infrastructure";
import { ScooterModelController } from "../controllers/scooter-model.controller";

export class ScooterModelRouter implements BaseRouter {
  constructor(private readonly controller: ScooterModelController) {}

  registerRoutes(server: ServerStrategy): void {
    // Create a new scooter model
    server.registerRoute(
      "post",
      "/api/scooter-models",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.createScooterModel(req, res)
    );

    // Get all scooter models
    server.registerRoute(
      "get",
      "/api/scooter-models",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getAllScooterModels(req, res)
    );

    // Get scooter model by ID
    server.registerRoute(
      "get",
      "/api/scooter-models/:id",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getScooterModelById(req, res)
    );

    // Get scooter model by UID
    server.registerRoute(
      "get",
      "/api/scooter-models/uid/:uid",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getScooterModelByUid(req, res)
    );

    // Update scooter model
    server.registerRoute(
      "put",
      "/api/scooter-models/:id",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.updateScooterModel(req, res)
    );

    // Delete scooter model
    server.registerRoute(
      "delete",
      "/api/scooter-models/:id",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.deleteScooterModel(req, res)
    );
  }
}
