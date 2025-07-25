"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../services/api";
import styles from "../styles/Login.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const LoginPage = () => {
    const router = useRouter();

    const [errors, setErrors] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ username: "admin@gmail.com", password: "Admin@123" });


    const validateField = (name: string, value: string) => {
        if (!value.trim()) {
            return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }
        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));


        const errorMsg = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };

    const validateAllFields = () => {
        const newErrors = {
            username: validateField("username", formData.username),
            password: validateField("password", formData.password),
        };
        setErrors(newErrors);

        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateAllFields()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/auth/login", formData);
            
            if (response.data.token) {
                localStorage.setItem("authToken", response.data.token);
                }
            if (response && response.data) {
                toast.success("Logged in successfully!");
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                toast.error("Login failed. Please try again.");
            }
        } catch (error: unknown) {
              if (error instanceof Error) {
    throw new Error(error.message);
  }
                toast.error("Login failed. Please check your credentials.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} noValidate className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username *</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.username ? styles.errorInput : ""}`}
                            required
                            disabled={loading}
                        />
                        {errors.username && <p className={styles.errorText}>{errors.username}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.password ? styles.errorInput : ""}`}
                            required
                            disabled={loading}
                        />
                        {errors.password && <p className={styles.errorText}>{errors.password}</p>}
                    </div>

                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <ToastContainer position="top-right" autoClose={5000} />
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
