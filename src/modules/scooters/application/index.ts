// Command Handlers
export * from "./handlers/command-handlers/CompleteMaintenance.handler";
export * from "./handlers/command-handlers/CreateScooter.handler";
export * from "./handlers/command-handlers/CreateScooterModel.handler";
export * from "./handlers/command-handlers/DefineMaintenanceSchedule.handler";
export * from "./handlers/command-handlers/DeleteScooter.handler";
export * from "./handlers/command-handlers/DeleteScooterModel.handler";
export * from "./handlers/command-handlers/ReportFault.handler";
export * from "./handlers/command-handlers/ResolveFault.handler";
export * from "./handlers/command-handlers/ScheduleMaintenance.handler";
export * from "./handlers/command-handlers/UpdateScooter.handler";
export * from "./handlers/command-handlers/UpdateScooterModel.handler";
export * from "./handlers/command-handlers/UpdateScooterStatus.handler";
export { UpdateScooterStatusCommandHandler as UpdateScooterStatusHandler } from "./handlers/command-handlers/UpdateScooterStatus.handler";
export { UpdateScooterBatteryCommandHandler as UpdateScooterBatteryHandler } from "./handlers/command-handlers/UpdateScooterBattery.handler";
export { UpdateScooterMileageCommandHandler as UpdateScooterMileageHandler } from "./handlers/command-handlers/UpdateScooterMileage.handler";

// Query Handlers
export * from "./handlers/query-handlers/GetAllScooters.handler";
export * from "./handlers/query-handlers/GetAllScooterModels.handler";
export * from "./handlers/query-handlers/GetScooterById.handler";
export * from "./handlers/query-handlers/GetScooterByUid.handler";
export * from "./handlers/query-handlers/GetScooterModelById.handler";
export * from "./handlers/query-handlers/GetScooterModelByUid.handler";
export * from "./handlers/query-handlers/GetScooterModelsByManufacturer.handler";
export * from "./handlers/query-handlers/GetScootersByModel.handler";
export * from "./handlers/query-handlers/GetScootersByStatus.handler";

// Event Handlers
export * from "./handlers/event-handlers/NotifyFaultReported.handler";
export * from "./handlers/event-handlers/SendMaintenanceNotification.handler";
export * from "./handlers/event-handlers/UpdateScooterStatus.handler";
export * from "./handlers/event-handlers/UpdateMaintenanceSchedule.handler";
export * from "./handlers/event-handlers/LogMaintenanceScheduleDefined.handler";

// Listeners
export * from "./listeners/FaultReported.listener";
export * from "./listeners/FaultResolved.listener";
export * from "./listeners/MaintenanceCompleted.listener";
export * from "./listeners/MaintenanceDue.listener";
export * from "./listeners/MaintenanceScheduleDefined.listener";

// Services
export * from "./services/fault-tracking.service";
export * from "./services/maintenance-scheduling.service";
export * from "./services/maintenance-notification.service";

// Module Initializer
// Uncomment when module initializer is implemented
// export * from "./scooter-module.initializer";
