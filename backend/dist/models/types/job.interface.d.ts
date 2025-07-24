import { Types } from 'mongoose';
export interface Location {
    city: string;
    state: string;
    country: string;
    zipCode?: string;
}
export interface Salary {
    min: number;
    max: number;
    currency: string;
}
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type JobStatus = 'Active' | 'Closed' | 'On Hold';
export interface IJob {
    _id: Types.ObjectId;
    title: string;
    company: string;
    location: Location;
    description: string;
    salary: Salary;
    jobType: JobType;
    requirements: string[];
    benefits?: string[];
    applicationDeadline: Date;
    jobStatus: JobStatus;
    postedBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=job.interface.d.ts.map