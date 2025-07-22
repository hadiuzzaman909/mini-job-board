import { IJob } from '../models/types/job.interface';
import { JobModel } from '../models/job.model';
import { NotFoundError } from '../utils/appError';
import { IJobService } from './types/jobService.interface';

export const createJob: IJobService['createJob'] = async (
  jobData: IJob
): Promise<IJob> => {
  const newJob = new JobModel(jobData);
  return newJob.save();
};

export const getJobs: IJobService['getJobs'] = async (): Promise<IJob[]> => {
  return JobModel.find().sort({ createdAt: -1 });
};

export const getJobById: IJobService['getJobById'] = async (
  jobId: string
): Promise<IJob> => {
  const job = await JobModel.findById(jobId);
  if (!job) throw new NotFoundError('Job');
  return job;
};

export const updateJob: IJobService['updateJob'] = async (
  jobId: string,
  jobData: Partial<IJob>
): Promise<IJob> => {
  const updatedJob = await JobModel.findByIdAndUpdate(jobId, jobData, {
    new: true,
    runValidators: true
  });
  
  if (!updatedJob) throw new NotFoundError('Job');
  return updatedJob;
};

export const deleteJob: IJobService['deleteJob'] = async (
  jobId: string
): Promise<{ message: string }> => {
  const deletedJob = await JobModel.findByIdAndDelete(jobId);
  if (!deletedJob) throw new NotFoundError('Job');
  return { message: 'Job deleted successfully' };
};