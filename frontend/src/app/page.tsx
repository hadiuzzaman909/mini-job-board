import { useEffect, useState } from 'react';
import { Job } from './types/job';


export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        console.log('Fetched jobs:', data);
        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Mini Job Board</h1>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {`${job.location.city}, ${job.location.state}, ${job.location.country} (${job.location.zipCode || 'N/A'})`}</p>
            <p><strong>Salary:</strong> {`${job.salary.currency} ${job.salary.min} - ${job.salary.max}`}</p>
            <p><strong>Type:</strong> {job.jobType}</p>
            <p><strong>Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</p>
            <a href={`/jobs/${job._id}`}>Details</a>
          </div>
        ))
      )}
    </div>
  );
}