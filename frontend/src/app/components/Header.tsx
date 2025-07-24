import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Job Portal</Link>
      </div>
      <div className={styles.nav}>
        <Link href="/login" className={styles.loginButton}>Login</Link>
      </div>
    </header>
  );
};

export default Header;
