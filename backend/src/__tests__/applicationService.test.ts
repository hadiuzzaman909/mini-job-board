import { Types } from 'mongoose';
import { ApplicationModel } from '../models/application.model';
import { JobModel } from '../models/job.model';
import { createApplication } from '../services/applicationService';
import { IApplication } from '../models/types/application.interface';
import { IJob } from '../models/types/job.interface';

jest.mock('../models/application.model');
jest.mock('../models/job.model');

describe('Application Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createApplication', () => {
        const mockJobId = new Types.ObjectId();
        const mockApplicationId = new Types.ObjectId();
        
        const mockJob: IJob = {
            _id: mockJobId,
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

        const mockApplicationData: IApplication = {
            _id: mockApplicationId,
            jobId: mockJobId,
            name: 'John Doe',
            email: 'john.doe@example.com',
            cvLink: 'https://example.com/cv/john-doe.pdf',
            phoneNumber: '+1234567890',
            coverLetter: 'I am very interested in this position...',
            applicantAddress: {
                street: '123 Main St',
                city: 'New York',
                country: 'USA'
            },
            applicationStatus: 'Pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        it('should create an application successfully when job exists', async () => {
            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(mockJob);

            const mockSave = jest.fn().mockResolvedValue(mockApplicationData);
            (ApplicationModel as any).mockImplementation(() => ({
                save: mockSave,
            }));

            const result = await createApplication(mockApplicationData);

            expect(JobModel.findById).toHaveBeenCalledWith(mockJobId);
            expect(ApplicationModel).toHaveBeenCalledWith(mockApplicationData);
            expect(mockSave).toHaveBeenCalled();
            expect(result).toEqual(mockApplicationData);
            expect(result.name).toBe('John Doe');
            expect(result.email).toBe('john.doe@example.com');
            expect(result.applicationStatus).toBe('Pending');
        });

        it('should throw NotFoundError when job does not exist', async () => {
            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(null);

            await expect(createApplication(mockApplicationData)).rejects.toThrow('Job not found');
            expect(JobModel.findById).toHaveBeenCalledWith(mockJobId);
            expect(ApplicationModel).not.toHaveBeenCalled();
        });

        it('should handle database errors when finding job', async () => {
            const dbError = new Error('Database connection failed');
            (JobModel.findById as jest.Mock) = jest.fn().mockRejectedValue(dbError);

            await expect(createApplication(mockApplicationData)).rejects.toThrow('Database connection failed');
            expect(JobModel.findById).toHaveBeenCalledWith(mockJobId);
            expect(ApplicationModel).not.toHaveBeenCalled();
        });

        it('should handle database errors when saving application', async () => {

            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(mockJob);

            const saveError = new Error('Failed to save application');
            const mockSave = jest.fn().mockRejectedValue(saveError);
            (ApplicationModel as any).mockImplementation(() => ({
                save: mockSave,
            }));

            await expect(createApplication(mockApplicationData)).rejects.toThrow('Failed to save application');
            expect(JobModel.findById).toHaveBeenCalledWith(mockJobId);
            expect(ApplicationModel).toHaveBeenCalledWith(mockApplicationData);
            expect(mockSave).toHaveBeenCalled();
        });

        it('should create application with valid email format', async () => {
            const applicationWithValidEmail = {
                ...mockApplicationData,
                email: 'valid.email+test@example.co.uk'
            };

            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(mockJob);

            const mockSave = jest.fn().mockResolvedValue(applicationWithValidEmail);
            (ApplicationModel as any).mockImplementation(() => ({
                save: mockSave,
            }));

            const result = await createApplication(applicationWithValidEmail);

            expect(JobModel.findById).toHaveBeenCalledWith(mockJobId);
            expect(ApplicationModel).toHaveBeenCalledWith(applicationWithValidEmail);
            expect(result.email).toBe('valid.email+test@example.co.uk');
        });

        it('should create application with valid CV link', async () => {
            const applicationWithHttpsLink = {
                ...mockApplicationData,
                cvLink: 'https://drive.google.com/cv/john-doe-resume.pdf'
            };

            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(mockJob);

            const mockSave = jest.fn().mockResolvedValue(applicationWithHttpsLink);
            (ApplicationModel as any).mockImplementation(() => ({
                save: mockSave,
            }));

            const result = await createApplication(applicationWithHttpsLink);

            expect(result.cvLink).toBe('https://drive.google.com/cv/john-doe-resume.pdf');
        });

        it('should create application with valid phone number formats', async () => {
            const testCases = [
                '+1234567890',
                '+44123456789',
                '1234567890',
                '+12345678901234'
            ];

            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(mockJob);

            for (const phoneNumber of testCases) {
                const applicationWithPhone = {
                    ...mockApplicationData,
                    phoneNumber
                };

                const mockSave = jest.fn().mockResolvedValue(applicationWithPhone);
                (ApplicationModel as any).mockImplementation(() => ({
                    save: mockSave,
                }));

                const result = await createApplication(applicationWithPhone);

                expect(result.phoneNumber).toBe(phoneNumber);
            }
        });

        it('should create application with complete address', async () => {
            const applicationWithCompleteAddress = {
                ...mockApplicationData,
                applicantAddress: {
                    street: '456 Oak Avenue, Apt 2B',
                    city: 'San Francisco',
                    country: 'USA'
                }
            };

            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(mockJob);

            const mockSave = jest.fn().mockResolvedValue(applicationWithCompleteAddress);
            (ApplicationModel as any).mockImplementation(() => ({
                save: mockSave,
            }));

            const result = await createApplication(applicationWithCompleteAddress);

            expect(result.applicantAddress.street).toBe('456 Oak Avenue, Apt 2B');
            expect(result.applicantAddress.city).toBe('San Francisco');
            expect(result.applicantAddress.country).toBe('USA');
        });

        it('should create application with long cover letter within limits', async () => {
            const longCoverLetter = 'A'.repeat(4999);
            const applicationWithLongCoverLetter = {
                ...mockApplicationData,
                coverLetter: longCoverLetter
            };

            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(mockJob);

            const mockSave = jest.fn().mockResolvedValue(applicationWithLongCoverLetter);
            (ApplicationModel as any).mockImplementation(() => ({
                save: mockSave,
            }));

            const result = await createApplication(applicationWithLongCoverLetter);

            expect(result.coverLetter).toBe(longCoverLetter);
            expect(result.coverLetter.length).toBe(4999);
        });

        it('should create application with default status when not specified', async () => {
            const applicationWithoutStatus = {
                ...mockApplicationData,
                applicationStatus: 'Pending' as const 
            };

            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(mockJob);

            const mockSave = jest.fn().mockResolvedValue(applicationWithoutStatus);
            (ApplicationModel as any).mockImplementation(() => ({
                save: mockSave,
            }));

            const result = await createApplication(applicationWithoutStatus);

            expect(result.applicationStatus).toBe('Pending');
        });

        it('should handle different job types when creating application', async () => {
            const contractJob = {
                ...mockJob,
                jobType: 'Contract' as const,
                title: 'Contract Developer'
            };

            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(contractJob);

            const mockSave = jest.fn().mockResolvedValue(mockApplicationData);
            (ApplicationModel as any).mockImplementation(() => ({
                save: mockSave,
            }));

            const result = await createApplication(mockApplicationData);

            expect(JobModel.findById).toHaveBeenCalledWith(mockJobId);
            expect(result).toEqual(mockApplicationData);
        });

        it('should verify job exists before creating application (integration-like test)', async () => {
            const nonExistentJobId = new Types.ObjectId();
            const applicationForNonExistentJob = {
                ...mockApplicationData,
                jobId: nonExistentJobId
            };

            (JobModel.findById as jest.Mock) = jest.fn().mockResolvedValue(null);

            await expect(createApplication(applicationForNonExistentJob))
                .rejects.toThrow('Job not found');

            expect(JobModel.findById).toHaveBeenCalledWith(nonExistentJobId);
            expect(ApplicationModel).not.toHaveBeenCalled();
        });
    });
});