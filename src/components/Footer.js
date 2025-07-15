'use client'

import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles['footer-container']}>
                <div className={styles['footer-column']}>
                    <h3>Join Our Community</h3>
                    <p>
                        Be part of a thriving network of Black and Latinx Computer Science students. Together, we grow, learn, and succeed.
                    </p>
                    <a
                        href="https://linktr.ee/colorstack_uta"
                        className={styles['footer-cta']}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Become a Member
                    </a>
                </div>

                <div className={styles['footer-column']}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <Link href="/">
                            Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                            About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/sponsors">
                            Sponsors
                            </Link>
                        </li>
                        <li>
                            <Link href="/students">
                            Students
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={styles['footer-column']}>
                    <h3>Follow Us</h3>
                    <div className={styles['social-icons']}>
                        <a href="https://www.instagram.com/colorstackuta" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://www.linkedin.com/in/colorstack-uta-118929326/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        {/*<a href="#" aria-label="Twitter">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>*/}
                        {/*<a href="#" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>*/}
                    </div>
                    <p>Stay connected for updates, events, and more!</p>
                </div>

                <div className={styles['footer-column']}>
                    <h3>Subscribe to Our Newsletter</h3>
                    <p>Get the latest news, events, and opportunities delivered to your inbox.</p>
                    <form className={styles['newsletter-form']}>
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className={styles['footer-bottom']}>
                <p>&copy; 2025 ColorStack UTA. All rights reserved.</p>
            </div>
        </footer>
    );
}
