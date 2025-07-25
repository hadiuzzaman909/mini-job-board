"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../styles/Details.module.css";
import { IJob } from "../types/job";
import { getJobById } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const JobDetails = () => {
  const [job, setJob] = useState<IJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { jobId } = params;
  const router = useRouter();

  useEffect(() => {
    if (jobId) {
      const fetchJobDetails = async () => {
        setIsLoading(true);
        try {
          const jobDetails = await getJobById(jobId as string);
          setJob(jobDetails);
        } catch (error) {
          console.error("Failed to fetch job details:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchJobDetails();
    }
  }, [jobId]);

  if (!jobId) return <div>Loading...</div>;

  const handleApplyNow = () => {
    if (router) {
      router.push(`/apply/${jobId}`);
    } else {
      console.error("Router not available");
    }
  };

  return (
    <div>
      <Header />
      {isLoading && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <div>Loading job details...</div>
        </div>
      )}
      {!isLoading && job && (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.jobTitle}>{job.title}</h1>
            <h2 className={styles.companyName}>{job.company}</h2>
            <p className={styles.jobLocation}>
              <strong>Location:</strong> {job.location?.city}, {job.location?.country}
            </p>
            <p className={styles.jobDescription}>
              <strong>Description:</strong> {job.description}
            </p>

            <h3 className={styles.sectionTitle}>Job Responsibilities</h3>
            <ul className={styles.jobList}>
              {job.jobResponsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>

            <h3 className={styles.sectionTitle}>Skill Requirements</h3>
            <ul className={styles.jobList}>
              {job.skillRequirements.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <div className={styles.jobDetails}>
              <p>
                <strong>Salary:</strong> {job.salary.currency} {job.salary.min} - {job.salary.max}
              </p>
              <p>
                <strong>Job Type:</strong> {job.jobType}
              </p>
              <p>
                <strong>Application Deadline:</strong>{" "}
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
            </div>

            <button className={styles.applyButton} onClick={handleApplyNow}>
              Apply Now
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default JobDetails;
