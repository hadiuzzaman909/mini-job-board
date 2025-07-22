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

        describe('getJobById', () => {
        it('should get a job by ID successfully', async () => {
            const mockJobId = new Types.ObjectId();
            const mockJob: IJob = {
                _id: mockJobId,
                title: 'Frontend Developer',
                company: 'Web Solutions',
                location: { city: 'San Francisco', state: 'CA', country: 'USA' },
                description: 'React developer needed',
                salary: { min: 70000, max: 110000, currency: 'USD' },
                jobType: 'Full-time',
                requirements: ['React', 'JavaScript', 'CSS'],
                applicationDeadline: new Date('2024-12-15'),
                jobStatus: 'Active',
                postedBy: new Types.ObjectId(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
       
            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(mockJob);


            const result = await getJobById(mockJobId.toString());


            expect(JobModel.findById).toHaveBeenCalledWith(mockJobId.toString());
            expect(result).toEqual(mockJob);
            expect(result.title).toBe('Frontend Developer');
            expect(result.company).toBe('Web Solutions');
        });


        it('should throw NotFoundError when job is not found', async () => {
            const nonExistentId = new Types.ObjectId().toString();
            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(null);


            await expect(getJobById(nonExistentId)).rejects.toThrow('Job not found');
            expect(JobModel.findById).toHaveBeenCalledWith(nonExistentId);
        });
    });


    describe('deleteJob', () => {
        it('should delete a job successfully', async () => {
            const mockJobId = new Types.ObjectId().toString();
            const mockDeletedJob: IJob = {
                _id: new Types.ObjectId(mockJobId),
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
            };


            (JobModel.findByIdAndDelete as jest.Mock) = jest.fn().mockResolvedValue(mockDeletedJob);


            const result = await deleteJob(mockJobId);


            expect(JobModel.findByIdAndDelete).toHaveBeenCalledWith(mockJobId);
            expect(result).toEqual({ message: 'Job deleted successfully' });
        });


        it('should throw NotFoundError when job to delete is not found', async () => {
            const nonExistentId = new Types.ObjectId().toString();


            (JobModel.findByIdAndDelete as jest.Mock) = jest.fn().mockResolvedValue(null);


            await expect(deleteJob(nonExistentId)).rejects.toThrow('Job not found');
            expect(JobModel.findByIdAndDelete).toHaveBeenCalledWith(nonExistentId);
        });


        it('should handle database errors during deletion', async () => {
            const mockJobId = new Types.ObjectId().toString();
            const dbError = new Error('Database connection failed');


            (JobModel.findByIdAndDelete as jest.Mock) = jest.fn().mockRejectedValue(dbError);


            await expect(deleteJob(mockJobId)).rejects.toThrow('Database connection failed');
            expect(JobModel.findByIdAndDelete).toHaveBeenCalledWith(mockJobId);
        });


        it('should delete job with valid ObjectId format', async () => {
            const validObjectId = new Types.ObjectId();
            const mockDeletedJob: IJob = {
                _id: validObjectId,
                title: 'Backend Developer',
                company: 'API Solutions',
                location: { city: 'Seattle', state: 'WA', country: 'USA' },
                description: 'Node.js backend developer',
                salary: { min: 85000, max: 125000, currency: 'USD' },
                jobType: 'Full-time',
                requirements: ['Node.js', 'MongoDB'],
                applicationDeadline: new Date('2024-12-20'),
                jobStatus: 'Active',
                postedBy: new Types.ObjectId(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };


            (JobModel.findByIdAndDelete as jest.Mock) = jest.fn().mockResolvedValue(mockDeletedJob);


            const result = await deleteJob(validObjectId.toString());


            expect(JobModel.findByIdAndDelete).toHaveBeenCalledWith(validObjectId.toString());
            expect(result).toEqual({ message: 'Job deleted successfully' });
        });
    });


});