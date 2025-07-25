import axios from 'axios';

import { IApplication } from '../types/application';

const API_URL = 'https://job-portal-63en.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getJobs = async () => {
  try {
    const response = await api.get('/jobs');
    return response.data;
  } catch (error: unknown) {
      if (error instanceof Error) {
    throw new Error(error.message);
  }
    throw new Error('Failed to fetch jobs');
  }
};

export const getJobById = async (id: string) => {
  try {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  } catch (error: unknown) {
      if (error instanceof Error) {
    throw new Error(error.message);
  }
    throw new Error('Failed to fetch job details');
  }
};

export const postApplication = async (applicationData: IApplication) => {

  try {
    const response = await api.post('/applications', applicationData);

    return response.data;
  } catch (error: unknown) {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
    throw new Error('Failed to submit application');
  }
};


export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;

}

export const login = async (credentials: ILoginCredentials): Promise<ILoginResponse> => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error: unknown) {
      if (error instanceof Error) {
    throw new Error(error.message);
  }
    throw new Error("Failed to login");
  }
};

export default api;