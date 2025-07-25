"use client";

import { useEffect, useState } from 'react';
import { IJob } from './types/job';
import { getJobs } from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from '../app/styles/HomePage.module.css';
import Link from 'next/link';

const HomePage = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        console.log(data);
        setJobs(data);  
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);  
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className={styles.container}>
      <Header />  
      <main>
        <h1 className={styles.professionalTitle}>Explore Trending Jobs</h1>
        {loading ? (  
          <div className={styles.loader}>Loading...</div> 
        ) : (
          <ul className={styles.jobList}>
            {jobs.map((job) => (
              <li key={job._id} className={styles.jobItem}>
                <h2 className={styles.jobTitle}>{job.title}</h2>
                <p className={styles.jobCompany}>{job.company}</p>
                <p className={styles.jobLocation}>{job.location?.city}, {job.location?.country}</p>
                <p className={styles.jobDescription}>{job.description}</p>
                <p className={styles.jobSalary}>
                  Salary: {job.salary?.currency} {job.salary?.min} - {job.salary?.max}
                </p>
                <p className={styles.jobType}>Job Type: {job.jobType}</p>
                <p className={styles.jobSalary}>Application Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>
                <Link href={`/${job._id}`}>
                  <button className={styles.applyButton}>Show Details</button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />  
    </div>
  );
};

export default HomePage;