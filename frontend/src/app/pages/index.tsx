import { useEffect, useState } from 'react';
import { getJobs } from '../services/api';
import { IJob } from '../types/job';

const HomePage = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location.city}, {job.location.country}</p>
            <p>{job.description}</p>
            <button>Apply Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
