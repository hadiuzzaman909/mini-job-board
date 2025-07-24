export interface IAddress {
  street: string;
  city: string;
  country: string;
}

export interface IApplication {
  jobId: string; 
  name: string;
  email: string;
  cvLink: string;
  phoneNumber: string;
  coverLetter: string;
  applicantAddress: IAddress;
  applicationStatus: 'Pending' | 'Under Review' | 'Accepted' | 'Rejected';
}
