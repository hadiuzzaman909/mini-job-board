"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../styles/Apply.module.css';
import { IApplication } from '@/app/types/application';
import { postApplication } from '../../services/api';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';

const ApplyPage = () => {
  const params = useParams();
  const { jobId } = params;
  const router = useRouter();

  const [formData, setFormData] = useState<IApplication>({
    jobId: jobId as string,
    name: '',
    email: '',
    cvLink: '',
    phoneNumber: '',
    coverLetter: '',
    applicantAddress: { street: '', city: '', country: '' },
    applicationStatus: 'Pending',
  });

  useEffect(() => {
    if (!jobId) {
      router.push('/');
    } else {
      setFormData((prev) => ({ ...prev, jobId: jobId as string }));
    }
  }, [jobId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('applicantAddress.')) {
      const addressField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        applicantAddress: { ...prev.applicantAddress, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await postApplication(formData);
      alert('Application submitted successfully!'); 
      router.push('/'); 
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.jobTitle}>Apply the Job</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cvLink">CV Link *</label>
              <input
                type="url"
                id="cvLink"
                name="cvLink"
                value={formData.cvLink}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="coverLetter">Cover Letter *</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                className={styles.textarea}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Applicant Address</label>
              <input
                type="text"
                placeholder="Street"
                name="applicantAddress.street"
                value={formData.applicantAddress.street}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="City"
                name="applicantAddress.city"
                value={formData.applicantAddress.city}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Country"
                name="applicantAddress.country"
                value={formData.applicantAddress.country}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.applyButton}>
              Submit Application
            </button>
            <button
              type="button"
              className={styles.applyButton}
              onClick={() => router.push(`/job/${jobId}`)}
              style={{ backgroundColor: '#6b7280' }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplyPage;