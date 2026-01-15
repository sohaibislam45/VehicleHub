import type { Request, Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
export declare const getVehicles: (req: Request, res: Response) => Promise<void>;
export declare const getVehicleById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createVehicle: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateVehicle: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteVehicle: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=vehicleController.d.ts.map