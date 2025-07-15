'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <Image
            src="/ColorStackUTAlogo.png"
            alt="ColorStack Logo"
            width={400}
            height={100}
            priority
          />
        </Link>

        {/* Hamburger Menu Icon */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Navigation Menu */}
        <nav className={`${styles.navbar} ${isMenuOpen ? styles.open : ''}`}>
          <ul>
            <li>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/sponsors" onClick={() => setIsMenuOpen(false)}>
                Sponsors
              </Link>
            </li>
            <li>
              <Link href="/students" onClick={() => setIsMenuOpen(false)}>
                Students
              </Link>
            </li>
            <li className={styles.joinWrapper}>
        <a
        href="https://linktr.ee/colorstack_uta?..."
        className={styles['join-now']}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setIsMenuOpen(false)}
        >
        Become a Member
        </a>
        </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}