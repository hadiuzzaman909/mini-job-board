import { Request, Response } from 'express';
import * as applicationService from '../services/applicationService';
import { catchAsync } from '../utils/catchAsync';

export const createApplication = catchAsync(
  async (req: Request, res: Response) => {
    const newApplication = await applicationService.createApplication(req.body);
    res.status(201).json(newApplication);
  }
);
