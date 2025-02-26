import {
  BaseRouter,
  ServerStrategy,
  ServerRequest,
  ServerResponse,
} from "../../../../shared/infrastructure";
import { FaultController } from "../controllers/fault.controller";

export class FaultRouter implements BaseRouter {
  constructor(private readonly controller: FaultController) {}

  registerRoutes(server: ServerStrategy): void {
    // Report a fault
    server.registerRoute(
      "post",
      "/api/faults/report",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.reportFault(req, res)
    );

    // Resolve a fault
    server.registerRoute(
      "post",
      "/api/faults/resolve",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.resolveFault(req, res)
    );

    // Get all faults
    server.registerRoute(
      "get",
      "/api/faults",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getAllFaults(req, res)
    );

    // Get fault by ID
    server.registerRoute(
      "get",
      "/api/faults/:id",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getFaultById(req, res)
    );

    // Get fault by UID
    server.registerRoute(
      "get",
      "/api/faults/uid/:uid",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getFaultByUid(req, res)
    );

    // Get faults by scooter ID
    server.registerRoute(
      "get",
      "/api/faults/scooter/:scooterId",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getFaultsByScooterId(req, res)
    );

    // Get faults by status
    server.registerRoute(
      "get",
      "/api/faults/status/:status",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.getFaultsByStatus(req, res)
    );

    // Update fault severity
    server.registerRoute(
      "patch",
      "/api/faults/:id/severity",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.updateFaultSeverity(req, res)
    );

    // Update warranty status
    server.registerRoute(
      "patch",
      "/api/faults/:id/warranty",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.updateWarrantyStatus(req, res)
    );
  }
}
