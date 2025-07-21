import { JobModel } from '../models/job.model';  
import logger from '../config/logger';
import AppError from '../utils/AppError';  
import { IJob } from '../models/types/job.interface';  

class JobService {
    async createJob(jobData: IJob): Promise<IJob> {
        try {
            const newJob = new JobModel(jobData);
            await newJob.save();
            return newJob;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error(error.message);
            } else {
                logger.error('Unknown error occurred while creating job');
            }
            throw new AppError('Error while creating job', 500);  
        }
    }

    async getJobs(): Promise<IJob[]> {
        try {
            return await JobModel.find();
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error(error.message);
            } else {
                logger.error('Unknown error occurred while fetching jobs');
            }
            throw new AppError('Error fetching jobs', 500);  
        }
    }

    async getJobById(jobId: string): Promise<IJob> {
        try {
            const job = await JobModel.findById(jobId);
            if (!job) {
                throw new AppError('Job not found', 404);  
            }
            return job;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error(error.message);
            } else {
                logger.error('Unknown error occurred while fetching job by ID');
            }
            throw new AppError('Error fetching job by ID', 500);  
        }
    }

    async updateJob(jobId: string, jobData: IJob): Promise<IJob> {
        try {
            const updatedJob = await JobModel.findByIdAndUpdate(jobId, jobData, { new: true });
            if (!updatedJob) {
                throw new AppError('Job not found', 404);  
            }
            return updatedJob;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error(error.message);
            } else {
                logger.error('Unknown error occurred while updating job');
            }
            throw new AppError('Error updating job', 500);  
        }
    }

    async deleteJob(jobId: string): Promise<{ message: string }> {
        try {
            const deletedJob = await JobModel.findByIdAndDelete(jobId);
            if (!deletedJob) {
                throw new AppError('Job not found', 404); 
            }
            return { message: 'Job deleted successfully' };
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error(error.message);
            } else {
                logger.error('Unknown error occurred while deleting job');
            }
            throw new AppError('Error deleting job', 500);  
        }
    }
}

export default new JobService();