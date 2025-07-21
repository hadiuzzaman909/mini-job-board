import { IJob } from '../../models/types/job.interface';

interface IJobService {
    createJob(jobData: IJob): Promise<IJob>;
    getJobs(): Promise<IJob[]>;
    getJobById(jobId: string): Promise<IJob>;
    updateJob(jobId: string, jobData: IJob): Promise<IJob>;
    deleteJob(jobId: string): Promise<{ message: string }>;
}

export default IJobService;
