import { IApplication } from '../../models/types/application.interface';  

export interface IApplicationService {
    createApplication(applicationData: IApplication): Promise<IApplication>;
}
