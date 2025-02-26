import { ServerStrategy } from "../../../../shared/infrastructure";
import { IEventStore } from "../../../../shared/domain";
import { PostgresScooterModelRepository } from "../repositories/postgres.scooter-model.repository";
import { PostgresScooterRepository } from "../repositories/postgres.scooter.repository";
import { PostgresMaintenanceRepository } from "../repositories/postgres.maintenance.repository";
import { PostgresMaintenanceScheduleRepository } from "../repositories/postgres.maintenance-schedule.repository";
import { PostgresFaultRepository } from "../repositories/postgres.fault.repository";
import {
  DefineMaintenanceScheduleHandler,
  LogMaintenanceScheduleDefinedHandler,
  MaintenanceScheduleDefinedListener,
  UpdateScooterStatusHandler,
  ScheduleMaintenanceHandler,
  CompleteMaintenanceHandler,
  MaintenanceSchedulingService,
  MaintenanceNotificationService,
  CreateScooterHandler,
  UpdateScooterHandler,
  UpdateScooterBatteryHandler,
  UpdateScooterMileageHandler,
  ReportFaultHandler,
  ResolveFaultHandler,
  FaultTrackingService,
} from "../../application";
import { MaintenanceController } from "../../interface/controllers/maintenance.controller";
import { MaintenanceRouter } from "../../interface/routes/maintenance.router";
import { ScooterController } from "../../interface/controllers/scooter.controller";
import { ScooterRouter } from "../../interface/routes/scooter.router";
import { FaultController } from "../../interface/controllers/fault.controller";
import { FaultRouter } from "../../interface/routes/fault.router";
import { ScooterModelController } from "../../interface/controllers/scooter-model.controller";
import { ScooterModelRouter } from "../../interface/routes/scooter-model.router";

export function composeScooterModule(
  app: ServerStrategy,
  eventStore: IEventStore
) {
  // Repositories
  const scooterModelRepository = new PostgresScooterModelRepository();
  const scooterRepository = new PostgresScooterRepository();
  const maintenanceRepository = new PostgresMaintenanceRepository();
  const maintenanceScheduleRepository =
    new PostgresMaintenanceScheduleRepository();
  const faultRepository = new PostgresFaultRepository();

  // Services
  const maintenanceNotificationService = new MaintenanceNotificationService();
  const maintenanceSchedulingService = new MaintenanceSchedulingService(
    maintenanceScheduleRepository,
    scooterRepository,
    scooterModelRepository,
    eventStore
  );
  const faultTrackingService = new FaultTrackingService(
    faultRepository,
    scooterRepository,
    eventStore
  );

  // Command Handlers - Maintenance
  const defineMaintenanceScheduleHandler = new DefineMaintenanceScheduleHandler(
    scooterModelRepository,
    eventStore
  );

  const scheduleMaintenanceHandler = new ScheduleMaintenanceHandler(
    scooterRepository,
    scooterModelRepository,
    eventStore,
    maintenanceSchedulingService
  );

  const completeMaintenanceHandler = new CompleteMaintenanceHandler(
    scooterRepository,
    maintenanceRepository,
    maintenanceSchedulingService,
    maintenanceNotificationService,
    eventStore
  );

  // Command Handlers - Scooter
  const createScooterHandler = new CreateScooterHandler(scooterRepository);

  const updateScooterHandler = new UpdateScooterHandler(
    scooterRepository,
    eventStore
  );

  const updateScooterStatusHandler = new UpdateScooterStatusHandler(
    scooterRepository,
    eventStore
  );

  const updateScooterBatteryHandler = new UpdateScooterBatteryHandler(
    scooterRepository,
    eventStore
  );

  const updateScooterMileageHandler = new UpdateScooterMileageHandler(
    scooterRepository,
    eventStore
  );

  // Command Handlers - Fault
  const reportFaultHandler = new ReportFaultHandler(
    scooterRepository,
    faultTrackingService,
    maintenanceNotificationService,
    eventStore
  );

  const resolveFaultHandler = new ResolveFaultHandler(
    scooterRepository,
    faultRepository,
    faultTrackingService,
    maintenanceNotificationService,
    eventStore
  );

  // Event Handlers
  const logMaintenanceScheduleDefinedHandler =
    new LogMaintenanceScheduleDefinedHandler();

  // Event Listeners
  const maintenanceScheduleDefinedListener =
    new MaintenanceScheduleDefinedListener(eventStore, (event) =>
      logMaintenanceScheduleDefinedHandler.handle(event)
    );
  maintenanceScheduleDefinedListener.listen();

  // Controllers
  const maintenanceController = new MaintenanceController(
    scheduleMaintenanceHandler,
    completeMaintenanceHandler,
    defineMaintenanceScheduleHandler
  );

  const scooterController = new ScooterController(
    createScooterHandler,
    updateScooterHandler,
    updateScooterStatusHandler,
    updateScooterBatteryHandler,
    updateScooterMileageHandler
  );

  const faultController = new FaultController(
    reportFaultHandler,
    resolveFaultHandler
  );

  const scooterModelController = new ScooterModelController(
    scooterModelRepository
  );

  // Routers
  const maintenanceRouter = new MaintenanceRouter(maintenanceController);
  const scooterRouter = new ScooterRouter(scooterController);
  const faultRouter = new FaultRouter(faultController);
  const scooterModelRouter = new ScooterModelRouter(scooterModelController);

  // Register routes
  scooterModelRouter.registerRoutes(app);
  scooterRouter.registerRoutes(app);
  faultRouter.registerRoutes(app);
  maintenanceRouter.registerRoutes(app);

  return {
    maintenanceRouter,
    scooterRouter,
    faultRouter,
    scooterModelRouter,
  };
}
