import { Request, Response } from 'express';
import * as jobService from '../services/jobService';
import { catchAsync } from '../utils/catchAsync';

export const getJobs = catchAsync(async (req: Request, res: Response) => {
  const jobs = await jobService.getJobs();
  res.json(jobs);
});

export const getJobById = catchAsync(async (req: Request, res: Response) => {
  const job = await jobService.getJobById(req.params.id);
  res.json(job);
});

export const createJob = catchAsync(async (req: Request, res: Response) => {
  const newJob = await jobService.createJob(req.body);
  res.status(201).json(newJob);
});

export const updateJob = catchAsync(async (req: Request, res: Response) => {
  const updatedJob = await jobService.updateJob(req.params.id, req.body);
  res.json(updatedJob);
});

export const deleteJob = catchAsync(async (req: Request, res: Response) => {
  const response = await jobService.deleteJob(req.params.id);
  res.json(response);
});