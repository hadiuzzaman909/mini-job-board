import { Types } from 'mongoose';

export interface Address {
  street: string;
  city:   string;
  country:string;
}

export type ApplicationStatus = 'Pending' | 'Under Review' | 'Accepted' | 'Rejected';

export interface IApplication {
  _id:              Types.ObjectId;
  jobId:            Types.ObjectId;
  name:             string;
  email:            string;
  cvLink:           string;
  phoneNumber:      string;
  coverLetter:      string;
  applicantAddress: Address;
  applicationStatus: ApplicationStatus;
  createdAt:        Date;
  updatedAt:        Date;
}
