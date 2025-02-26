import {
  ReportFaultDTO,
  ResolveFaultDTO,
  UpdateFaultSeverityDTO,
  UpdateWarrantyStatusDTO,
} from "../dtos";
import { ReportFaultCommand, ResolveFaultCommand } from "../../domain";
import { ReportFaultHandler, ResolveFaultHandler } from "../../application";
import {
  ServerRequest,
  ServerResponse,
  ApiResponse,
} from "../../../../shared/infrastructure";

export class FaultController {
  constructor(
    private readonly reportFaultHandler: ReportFaultHandler,
    private readonly resolveFaultHandler: ResolveFaultHandler
  ) {}

  async reportFault(req: ServerRequest, res: ServerResponse): Promise<void> {
    const dto: ReportFaultDTO = req.body;

    const command = new ReportFaultCommand({
      scooterId: dto.scooterId,
      scooterUid: dto.scooterUid,
      title: dto.title,
      description: dto.description,
      reportedBy: dto.reportedBy,
      reportedDate: dto.reportedDate,
      severity: dto.severity,
      isWarrantyClaim: dto.isWarrantyClaim,
    });

    try {
      const result = await this.reportFaultHandler.execute(command);
      if (result.success) {
        ApiResponse.success(res, result.message, { faultId: result.faultId });
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async resolveFault(req: ServerRequest, res: ServerResponse): Promise<void> {
    const dto: ResolveFaultDTO = req.body;

    const command = new ResolveFaultCommand({
      faultId: dto.faultId,
      faultUid: dto.faultUid,
      resolutionDate: dto.resolutionDate,
      repairNotes: dto.repairNotes,
      cost: dto.cost,
      warrantyStatus: dto.warrantyStatus,
      warrantyNotes: dto.warrantyNotes,
    });

    try {
      const result = await this.resolveFaultHandler.execute(command);
      if (result.success) {
        ApiResponse.success(res, result.message);
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async getAllFaults(req: ServerRequest, res: ServerResponse): Promise<void> {
    // Implementation for getting all faults
    ApiResponse.success(res, "Get all faults endpoint");
  }

  async getFaultById(req: ServerRequest, res: ServerResponse): Promise<void> {
    // Implementation for getting fault by ID
    const id = parseInt((req.params as any).id);
    ApiResponse.success(res, `Get fault by ID: ${id} endpoint`);
  }

  async getFaultByUid(req: ServerRequest, res: ServerResponse): Promise<void> {
    // Implementation for getting fault by UID
    const uid = (req.params as any).uid;
    ApiResponse.success(res, `Get fault by UID: ${uid} endpoint`);
  }

  async getFaultsByScooterId(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting faults by scooter ID
    const scooterId = parseInt((req.params as any).scooterId);
    ApiResponse.success(res, `Get faults by scooter ID: ${scooterId} endpoint`);
  }

  async getFaultsByStatus(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting faults by status
    const status = (req.params as any).status;
    ApiResponse.success(res, `Get faults by status: ${status} endpoint`);
  }

  async updateFaultSeverity(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for updating fault severity
    const id = parseInt((req.params as any).id);
    const dto: UpdateFaultSeverityDTO = req.body;
    ApiResponse.success(res, `Update fault severity for ID: ${id} endpoint`);
  }

  async updateWarrantyStatus(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for updating warranty status
    const id = parseInt((req.params as any).id);
    const dto: UpdateWarrantyStatusDTO = req.body;
    ApiResponse.success(res, `Update warranty status for ID: ${id} endpoint`);
  }

  async getActiveFaults(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting active faults
    ApiResponse.success(res, "Get active faults endpoint");
  }

  async getResolvedFaults(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting resolved faults
    ApiResponse.success(res, "Get resolved faults endpoint");
  }
}
