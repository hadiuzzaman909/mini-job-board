import { IJob } from '../../models/types/job.interface'; 

export interface IJobService {
    createJob(jobData: IJob): Promise<IJob>;
    getJobs(): Promise<IJob[]>;
    getJobById(jobId: string): Promise<IJob>;
    updateJob(jobId: string, jobData: IJob): Promise<IJob>;
    deleteJob(jobId: string): Promise<{ message: string }>;
}