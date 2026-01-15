import type { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: any;
    firebaseUid?: string;
}
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const adminOnly: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map