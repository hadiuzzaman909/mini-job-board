import { IApplication } from '../../models/types/application.interface';

interface IApplicationService {
    createApplication(applicationData: IApplication): Promise<IApplication>;
}

export default IApplicationService;
