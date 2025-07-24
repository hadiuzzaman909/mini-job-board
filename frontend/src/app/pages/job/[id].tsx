import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getJobById } from '../../services/api';
import { IJob } from '../../types/job';

const JobDetailsPage = () => {
  const { query } = useRouter();
  const [job, setJob] = useState<IJob | null>(null);

  useEffect(() => {
    if (query.id) {
      const fetchJob = async () => {
        try {
          const data = await getJobById(query.id as string); 
          setJob(data);
        } catch (error) {
          console.error("Failed to fetch job:", error);
        }
      };
      fetchJob();
    }
  }, [query.id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.company}</p>
      <p>{job.location.city}, {job.location.country}</p>
      <p>{job.description}</p>
      <p>Salary: {job.salary.currency} {job.salary.min} - {job.salary.max}</p>
      <p>Application Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>
      <button>Apply Now</button>
    </div>
  );
};

export default JobDetailsPage;
