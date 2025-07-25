"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Job Board</Link>
      </div>
      <div className={styles.nav}>
        {isLoggedIn ? (
          <>
            <Link href="/" className={styles.addJobButton}>
              Dashboard
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className={styles.loginButton}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
