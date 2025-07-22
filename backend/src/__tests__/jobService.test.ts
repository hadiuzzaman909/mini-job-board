import { Types } from 'mongoose';
import { JobModel } from '../models/job.model';
import { createJob, getJobById, getJobs, updateJob, deleteJob } from '../services/jobService';
import { IJob } from '../models/types/job.interface';


jest.mock('../models/job.model');

describe('Job Service - Complete Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createJob', () => {
        it('should create a job successfully', async () => {
            const mockJobData: IJob = {
                _id: new Types.ObjectId(),
                title: 'Software Engineer',
                company: 'Tech Corp',
                location: {
                    city: 'New York',
                    state: 'NY',
                    country: 'USA',
                },
                description: 'Full-stack developer position',
                salary: {
                    min: 80000,
                    max: 120000,
                    currency: 'USD',
                },
                jobType: 'Full-time',
                requirements: ['JavaScript', 'Node.js'],
                applicationDeadline: new Date('2024-12-31'),
                jobStatus: 'Active',
                postedBy: new Types.ObjectId(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const mockSave = jest.fn().mockResolvedValue(mockJobData);
            (JobModel as any).mockImplementation(() => ({
                save: mockSave,
            }));

            const result = await createJob(mockJobData);

            expect(JobModel).toHaveBeenCalledWith(mockJobData);
            expect(mockSave).toHaveBeenCalled();
            expect(result).toEqual(mockJobData);
            expect(result.title).toBe('Software Engineer');
        });
    });

    describe('getJobs', () => {
        it('should get all jobs successfully', async () => {
            const mockJobs: IJob[] = [
                {
                    _id: new Types.ObjectId(),
                    title: 'Software Engineer',
                    company: 'Tech Corp',
                    location: { city: 'New York', state: 'NY', country: 'USA' },
                    description: 'Full-stack developer position',
                    salary: { min: 80000, max: 120000, currency: 'USD' },
                    jobType: 'Full-time',
                    requirements: ['JavaScript', 'Node.js'],
                    applicationDeadline: new Date('2024-12-31'),
                    jobStatus: 'Active',
                    postedBy: new Types.ObjectId(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    _id: new Types.ObjectId(),
                    title: 'Data Analyst',
                    company: 'Data Co',
                    location: { city: 'Boston', state: 'MA', country: 'USA' },
                    description: 'Analyze business data',
                    salary: { min: 60000, max: 90000, currency: 'USD' },
                    jobType: 'Full-time',
                    requirements: ['SQL', 'Python'],
                    applicationDeadline: new Date('2024-11-30'),
                    jobStatus: 'Active',
                    postedBy: new Types.ObjectId(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ];

            const mockSort = jest.fn().mockResolvedValue(mockJobs);
            const mockFind = jest.fn().mockReturnValue({ sort: mockSort });
            (JobModel.find as jest.Mock) = mockFind;

            const result = await getJobs();

            expect(JobModel.find).toHaveBeenCalledWith();
            expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
            expect(result).toEqual(mockJobs);
            expect(result).toHaveLength(2);
            expect(result[0].title).toBe('Software Engineer');
        });

        it('should return empty array when no jobs exist', async () => {
            const mockSort = jest.fn().mockResolvedValue([]);
            const mockFind = jest.fn().mockReturnValue({ sort: mockSort });
            (JobModel.find as jest.Mock) = mockFind;

            const result = await getJobs();

            expect(JobModel.find).toHaveBeenCalledWith();
            expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
            expect(result).toEqual([]);
            expect(result).toHaveLength(0);
        });
    });

});