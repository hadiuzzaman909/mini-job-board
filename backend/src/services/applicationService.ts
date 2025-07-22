import { ApplicationModel } from '../models/application.model';
import { JobModel } from '../models/job.model';
import { IApplicationService } from './types/applicationService.interface';
import { IApplication } from '../models/types/application.interface';
import { NotFoundError } from '../utils/appError';

export const createApplication: IApplicationService['createApplication'] = async (
  applicationData: IApplication
): Promise<IApplication> => {

  const job = await JobModel.findById(applicationData.jobId);
  if (!job) throw new NotFoundError('Job');
  
  const newApplication = new ApplicationModel(applicationData);
  return newApplication.save();
};