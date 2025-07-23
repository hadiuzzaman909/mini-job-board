export interface Location {
  city: string;
  state: string;
  country: string;
  zipCode?: string; // Optional based on the schema
}

export interface Salary {
  min: number;
  max: number;
  currency: string;
}

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export type JobStatus = 'Active' | 'Closed' | 'On Hold';

export interface Job {
  _id: string; // Serialized ObjectId from API
  title: string;
  company: string;
  location: Location;
  description: string;
  salary: Salary;
  jobType: JobType;
  requirements: string[];
  benefits?: string[]; // Optional based on the schema
  applicationDeadline: string; // ISO date string from API
  jobStatus: JobStatus;
  postedBy: string; // Serialized ObjectId from API
  createdAt: string; // ISO date string from API
  updatedAt: string; // ISO date string from API
}