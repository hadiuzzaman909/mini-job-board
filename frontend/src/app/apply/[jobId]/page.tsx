"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../styles/Apply.module.css";
import { IApplication } from "@/app/types/application";
import { postApplication } from "../../services/api";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyPage = () => {
  const params = useParams();
  const { jobId } = params;
  const router = useRouter();

  const [formData, setFormData] = useState<IApplication>({
    jobId: jobId as string,
    name: "",
    email: "",
    cvLink: "",
    phoneNumber: "",
    coverLetter: "",
    applicantAddress: { street: "", city: "", country: "" },
    applicationStatus: "Pending",
  });

  const [errors, setErrors] = useState<{
    name: string;
    email: string;
    cvLink: string;
    phoneNumber: string;
    coverLetter: string;
    applicantAddress: {
      street: string;
      city: string;
      country: string;
    };
  }>({
    name: "",
    email: "",
    cvLink: "",
    phoneNumber: "",
    coverLetter: "",
    applicantAddress: { street: "", city: "", country: "" },
  });

  useEffect(() => {
    if (!jobId) {
      router.push("/");
    } else {
      setFormData((prev) => ({ ...prev, jobId: jobId as string }));
    }
  }, [jobId, router]);

  const validateField = (name: string, value: any) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        break;
      case "email":
        if (!value) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) return "Invalid email address";
        break;
      case "cvLink":
        if (!value) return "CV link is required";
        try {
          new URL(value);
        } catch {
          return "Invalid URL";
        }
        break;
      case "phoneNumber":
        const phoneRegex = /^\+[1-9]\d{1,2}\d{6,12}$/;
        if (!value) return "Phone number is required";
        if (!phoneRegex.test(value))
          return "Invalid phone number! Use format: +[countrycode][number], e.g., +12025550123";
        break;
      case "coverLetter":
        if (!value) return "Cover letter is required";
        break;
      case "applicantAddress.street":
        if (!value) return "Street is required";
        break;
      case "applicantAddress.city":
        if (!value) return "City is required";
        break;
      case "applicantAddress.country":
        if (!value) return "Country is required";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("applicantAddress.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        applicantAddress: { ...prev.applicantAddress, [addressField]: value },
      }));

      // Validate nested applicantAddress field
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        applicantAddress: {
          ...prev.applicantAddress,
          [addressField]: errorMsg,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const validateAllFields = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      cvLink: validateField("cvLink", formData.cvLink),
      phoneNumber: validateField("phoneNumber", formData.phoneNumber),
      coverLetter: validateField("coverLetter", formData.coverLetter),
      applicantAddress: {
        street: validateField("applicantAddress.street", formData.applicantAddress.street),
        city: validateField("applicantAddress.city", formData.applicantAddress.city),
        country: validateField("applicantAddress.country", formData.applicantAddress.country),
      },
    };

    setErrors(newErrors);

    // Check if any errors exist
    const hasErrors =
      Object.values(newErrors).some((val) => {
        if (typeof val === "object") {
          return Object.values(val).some((v) => v !== "");
        }
        return val !== "";
      });

    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAllFields()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }
 try {
    await postApplication(formData);
    toast.success("Application submitted successfully!");

    setTimeout(() => {
      router.push("/");
    }, 2000);
    
  } catch (error) {
    console.error("Error submitting application:", error);
    toast.error("Failed to submit application. Please try again.");
  }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.jobTitle}>Apply the Job</h1>
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`${styles.input} ${errors.name ? styles.errorInput : ""}`}
              />
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
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
                className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
              />
              {errors.email && <p className={styles.errorText}>{errors.email}</p>}
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
                className={`${styles.input} ${errors.cvLink ? styles.errorInput : ""}`}
              />
              {errors.cvLink && <p className={styles.errorText}>{errors.cvLink}</p>}
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
                className={`${styles.input} ${errors.phoneNumber ? styles.errorInput : ""}`}
              />
              {errors.phoneNumber && <p className={styles.errorText}>{errors.phoneNumber}</p>}
            </div>


            <div className={styles.formGroup}>
              <label htmlFor="coverLetter">Cover Letter *</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                className={`${styles.textarea} ${errors.coverLetter ? styles.errorInput : ""}`}
              />
              {errors.coverLetter && <p className={styles.errorText}>{errors.coverLetter}</p>}
            </div>


            <div className={styles.formGroup}>
              <label>Applicant Address *</label>
              <input
                type="text"
                placeholder="Street"
                name="applicantAddress.street"
                value={formData.applicantAddress.street}
                onChange={handleChange}
                required
                className={`${styles.input} ${errors.applicantAddress.street ? styles.errorInput : ""}`}
              />
              {errors.applicantAddress.street && (
                <p className={styles.errorText}>{errors.applicantAddress.street}</p>
              )}

              <input
                type="text"
                placeholder="City"
                name="applicantAddress.city"
                value={formData.applicantAddress.city}
                onChange={handleChange}
                required
                className={`${styles.input} ${errors.applicantAddress.city ? styles.errorInput : ""}`}
              />
              {errors.applicantAddress.city && (
                <p className={styles.errorText}>{errors.applicantAddress.city}</p>
              )}

              <input
                type="text"
                placeholder="Country"
                name="applicantAddress.country"
                value={formData.applicantAddress.country}
                onChange={handleChange}
                required
                className={`${styles.input} ${errors.applicantAddress.country ? styles.errorInput : ""}`}
              />
              {errors.applicantAddress.country && (
                <p className={styles.errorText}>{errors.applicantAddress.country}</p>
              )}
            </div>


            <button type="submit" className={styles.applyButton}>
              Submit Application
            </button>
            <button
              type="button"
              className={styles.applyButton}
              onClick={() => router.push(`/job/${jobId}`)}
              style={{ backgroundColor: "#6b7280", marginLeft: "1rem" }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Footer />
    </div>
  );
};

export default ApplyPage;
