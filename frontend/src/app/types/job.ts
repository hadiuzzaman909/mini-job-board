export interface ILocation {
  city: string;
  state: string;
  country: string;
  zipCode?: string;  
}

export interface ISalary {
  min: number;
  max: number;
  currency: string;
}

export interface IJob {
  id: string; 
  title: string;
  company: string;
  location: ILocation;
  description: string;
  salary: ISalary;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  requirements: string[];
  benefits: string[];
  applicationDeadline: string; 
  jobStatus: 'Active' | 'Closed' | 'On Hold';
}
