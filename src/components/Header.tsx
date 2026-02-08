"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image src="/logo/logo2.png" alt="Madness Expeditions Logo" width={isScrolled ? 80 : 150} height={isScrolled ? 40 : 50} style={{ transition: 'width 0.3s ease, height 0.3s ease' }} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/expediciones" className={styles.navLink}>Expediciones</Link>
        <div className={styles.navItem}>
          <span className={styles.navLink}>Internacional</span>
          <div className={styles.dropdownMenu}>
            <Link href="/internacional/nepal" className={styles.dropdownLink}>Nepal</Link>
            <Link href="/internacional/rusia" className={styles.dropdownLink}>Rusia</Link>
            <Link href="/internacional/tanzania" className={styles.dropdownLink}>Tanzania</Link>
          </div>
        </div>
        <Link href="/contacto" className={styles.navLink}>Contacto</Link>
      </nav>
    </header>
  );
};

export default Header;
