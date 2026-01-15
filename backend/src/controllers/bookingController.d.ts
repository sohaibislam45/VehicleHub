import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
export declare const createBooking: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMyBookings: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=bookingController.d.ts.map