import { ApplicationModel } from '../models/application.model';
import logger from '../config/logger';
import AppError from '../utils/AppError';  
import { IApplication } from '../models/types/application.interface';  

class ApplicationService {

    async createApplication(applicationData: IApplication): Promise<IApplication> {
        try {
            const newApplication = new ApplicationModel(applicationData);
            await newApplication.save();
            return newApplication;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error(error.message);
            } else {
                logger.error('Unknown error occurred');
            }
            throw new AppError('Error while submitting application', 500);  
        }
    }
}

export default new ApplicationService();