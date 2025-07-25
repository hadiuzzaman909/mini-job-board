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
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error('Failed to fetch jobs');
  }
};

export const getJobById = async (id: string) => {
  try {
    const response = await api.get(`/jobs/${id}`);  
    return response.data;  
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw new Error('Failed to fetch job details');
  }
};

export const postApplication = async (applicationData: IApplication) => {
  try {
    const response = await api.post('/applications', applicationData);
    console.log(applicationData)
    return response.data;
  } catch (error) {
    console.error("Error posting application:", error);
    throw new Error('Failed to submit application');
  }
};

export default api;