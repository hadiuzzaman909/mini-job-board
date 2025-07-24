export interface ILocation {
  city: string;
  state: string;
  country: string;
  zipCode?: string;  // Optional field for zip code
}

export interface ISalary {
  min: number;
  max: number;
  currency: string;
}

export interface IJob {
  _id: string;  // Unique job ID
  title: string;  // Job title (e.g., Software Developer)
  company: string;  // Company name (e.g., TechCorp)
  location: ILocation;  // Location object containing city, state, country, and optional zip code
  description: string;  // Job description
  jobResponsibilities: string[];  // Array of job responsibilities
  skillRequirements: string[];  // Array of skills required for the job
  salary: ISalary;  // Salary object containing min, max, and currency
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';  // Type of job (e.g., Full-time, Part-time)
  requirements: string[];  // Array of other general job requirements
  benefits: string[];  // Array of benefits (e.g., Health Insurance, 401K)
  applicationDeadline: string;  // Application deadline (ISO format date string)
  jobStatus: 'Active' | 'Closed' | 'On Hold';  // Status of the job posting
}