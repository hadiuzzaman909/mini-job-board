import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3>About Us</h3>
          <Link href="/">Our Mission</Link>
          <Link href="/">Our Team</Link>
          <Link href="/">Careers</Link>
        </div>
        <div className={styles.footerSection}>
          <h3>Resources</h3>
          <Link href="/">Blog</Link>
          <Link href="/">FAQ</Link>
          <Link href="/">Support</Link>
        </div>
        <div className={styles.footerSection}>
          <h3>Contact</h3>
          <p>Email: support@jobportal.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Job St, Career City</p>
        </div>

      </div>
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;