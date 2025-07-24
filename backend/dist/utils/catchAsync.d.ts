import { NextFunction, Request, Response } from 'express';
export declare const catchAsync: (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=catchAsync.d.ts.map