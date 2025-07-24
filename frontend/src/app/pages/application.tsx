import { useState } from 'react';
import { postApplication } from '../services/api';
import { IApplication } from '../types/application';

const ApplicationPage = () => {
  const [formData, setFormData] = useState<IApplication>({
    jobId: '',
    name: '',
    email: '',
    cvLink: '',
    phoneNumber: '',
    coverLetter: '',
    applicantAddress: { street: '', city: '', country: '' },
    applicationStatus: 'Pending',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postApplication(formData); // Post application data
      alert('Application submitted!');
    } catch (error) {
      console.error("Failed to submit application:", error);
      alert('Error submitting application');
    }
  };

  return (
    <div>
      <h1>Apply for Job</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
        />
        <input
          type="url"
          name="cvLink"
          value={formData.cvLink}
          onChange={handleChange}
          placeholder="Your CV Link"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          placeholder="Cover Letter"
        />
        <input
          type="text"
          name="applicantAddress.street"
          value={formData.applicantAddress.street}
          onChange={handleChange}
          placeholder="Street"
        />
        <input
          type="text"
          name="applicantAddress.city"
          value={formData.applicantAddress.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="applicantAddress.country"
          value={formData.applicantAddress.country}
          onChange={handleChange}
          placeholder="Country"
        />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationPage;
