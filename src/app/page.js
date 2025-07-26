'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faGraduationCap, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import styles from './page.module.css';
import './globals.css';
import Carousel from '../components/Carousel.js';
import { motion } from 'framer-motion';


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function WhatWeDo() {
  return (
    <motion.section
      className={styles['what-we-do']}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
         className={`
           ${styles.container}
           flex flex-col-reverse    
           md:flex-row              
           items-center gap-8
         `}
       >
        <div className={styles['text-content']}>
          <h2>What We Do</h2>
          <p>
            At ColorStack UTA, we’re committed to increasing the number of Black
            and Latinx Computer Science graduates by building a supportive,
            inclusive tech community.
          </p>
          <a href="#" className={styles['btn-primary']}>
            Become a Member
          </a>
        </div>
        <div className={styles['carousel-container']}>
          <Carousel styles={styles} />
        </div>
      </div>
    </motion.section>
  )
}

function FeaturesSection() {
  return (
    <motion.section
      className={styles['features-section']}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles['section-title']}>Our Pillars</h2>
      <div className={styles['features-container']}>
        <div className={styles.feature}>
          <div className={styles['circle-background']}>
            {/*<i className="fa-solid fa-users feature-icon"></i>*/}
            <FontAwesomeIcon icon={faUsers} className={styles['feature-icon']} />
          </div>
          <h3>Community</h3>
          <p>
            <strong>Find your life-long support system and experience a truly safe space for Black and Latinx CS students.</strong>
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles['circle-background']}>
            {/*<i className="fa-solid fa-graduation-cap feature-icon"></i>*/}
            <FontAwesomeIcon icon={faGraduationCap} className={styles['feature-icon']} />
          </div>
          <h3>Academic</h3>
          <p>
            <strong>Get help with homework and advice in our Slack workspace and make friends with ColorStack members through social activities.</strong>
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles['circle-background']}>
            {/*<i className="fa-solid fa-suitcase feature-icon"></i>*/}
            <FontAwesomeIcon icon={faSuitcase} className={styles['feature-icon']} />
          </div>
          <h3>Career</h3>
          <p>
            <strong>Submit your resume to our partner companies and apply to programs/events in collaboration with our partners.</strong>
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function UpcomingEvents() {
  return (
   <motion.section
      className={styles['upcoming-events']}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles['section-title']}>Upcoming Events</h2>
      <div className={styles['events-container']}>

        <div className={`${styles['featured-event']} hidden md:block`}>

          <div className={`${styles['event-card']} ${styles.large}`}>
            <div className={styles['event-date']}>
              <span className={styles.month}>MONTH</span>
              <span className={styles.day}>DAY</span>
            </div>
            <div className={styles['event-image']}>
              <Image src="/PhotoPlaceholder.webp" alt="Career Fair Prep" width={200} height={150} />
            </div>
            <div className={styles['event-details']}>
              <h3 className={styles['event-title']}>Event Title</h3>
              <span className={`${styles['event-category']} ${styles.professional}`}>
              Professional Development
              </span>
              <div className={styles['event-time']}>
                <i className="clock-icon">⏰</i> 2:00 PM - 4:00 PM
              </div>
              <p className={styles['event-description']}>
                Event Description
              </p>
              <a href="#" className={styles['event-cta']}>
                Reserve Your Spot
              </a>
            </div>
          </div>
        </div>

        <div className={styles['other-events']}>
          <div className={`${styles['event-card']} ${styles.small}`}>
            <div className={styles['event-date']}>
              <span className={styles.month}>MONTH</span>
              <span className={styles.day}>DAY</span>
            </div>
            <div className={styles['event-image']}>
              <Image src="/PhotoPlaceholder.webp" alt="Game Night" width={300} height={150} />
            </div>
            <div className={styles['event-details']}>
              <h3 className={styles['event-title']}>Event Title</h3>
              <span className={`${styles['event-category']} ${styles.social}`}>
              Social
              </span>
              <div className={styles['event-time']}>
                <i className="clock-icon">⏰</i> 6:00 PM - 9:00 PM
              </div>
              <p className={styles['event-description']}>
                Event Description
              </p>
              <a href="#" className={styles['event-cta']}>
                Join Us
              </a>
            </div>
          </div>

          <div className={`${styles['event-card']} ${styles.small}`}>
            <div className={styles['event-date']}>
              <span className={styles.month}>MAR</span>
              <span className={styles.day}>22</span>
            </div>
            <div className={styles['event-image']}>
              <Image src="/PhotoPlaceholder.webp" alt="Networking Workshop" width={300} height={150} />
            </div>
            <div className={styles['event-details']}>
              <h3 className={styles['event-title']}>Event Title</h3>
              <span className={`${styles['event-category']} ${styles.gbm}`}>
              General Body Meeting
              </span>
              <div className={styles['event-time']}>
                <i className="clock-icon">⏰</i> 3:00 PM - 5:00 PM
              </div>
              <p className={styles['event-description']}>
                Event Description
              </p>
              <a href="#" className={styles['event-cta']}>
                Sign Up
              </a>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}

function InstagramSection() {
  return (
    <motion.section
      className={styles['instagram-section']}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles['section-title']}>Follow Our Socials!</h2>
      <div className={styles['card-container']}>
        <div className={styles.card}>
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/p/DF5p1WUJbwm/?utm_source=ig_embed&amp;utm_campaign=loading"
            data-instgrm-version="14"
          ></blockquote>
        </div>
        <div className={styles.card}>
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/p/DF5pNkYpHJf/?utm_source=ig_embed&amp;utm_campaign=loading"
            data-instgrm-version="14"
          ></blockquote>
        </div>
        <div className={styles.card}>
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/p/DFnnrDIJGgp/?utm_source=ig_embed&amp;utm_campaign=loading"
            data-instgrm-version="14"
          ></blockquote>
        </div>
      </div>
      <Script async src="//www.instagram.com/embed.js" />
    </motion.section>
  );
}

function CTASection() {
  return (
    <motion.section
      className={styles['cta-section']}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
    >
      <div className={styles['cta-content']}>
        <h2>Join ColorStack UTA Today!</h2>
        <p>
          Be part of a thriving community of Black and Latinx Computer Science students. Gain access to exclusive
          events, academic support, and career opportunities. Take the next step in your journey with us!
        </p>
        <a
          href="https://linktr.ee/colorstack_uta?fbclid=PAZXh0bgNhZW0CMTEAAaZ-huB0wubsKaEg9kR0V3_GwR79Zqmw8kz2f6BWWCVpCqx7j9ne0BhsfVI_aem_pxaAwxBnGLBBDUjBh71cog"
          className={styles['cta-button']}
          target="_blank"
          rel="noopener noreferrer"
        >
          Become a Member
        </a>
      </div>
    </motion.section>
  );
}

function SponsorsSection() {
  return (
    <motion.section
      className={styles['sponsors-section']}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
    >
      {/* !!! SPONSOR SECTION HIDDEN UNTIL WE GET SPONSORS !!!
      <h2
        className={`
          ${styles['sponsors-heading']}
          text-4xl md:text-5xl
          font-extrabold uppercase tracking-wide
          underline              
          decoration-4           
          decoration-[#fd9739]   
          underline-offset-8
          mb-20
        `}
      >
        Our Sponsors
      </h2>

      <div className={styles['sponsor-tier']}>
        <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-4">
          <span className={styles.medal}>🥇</span> Platinum
        </h3>
        <div className={styles['sponsor-logos']}>
          <Image src="/placeholder.png" alt="Bloomberg" width={150} height={80} />
        </div>
      </div>

      <div className={styles['sponsor-tier']}>
        <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-4">
          <span className={styles.medal}>🥈</span> Gold
        </h3>
        <div className={styles['sponsor-logos']}>
          <Image src="/placeholder.png" alt="Capital One" width={150} height={80} />
        </div>
      </div>

      <div className={styles['sponsor-tier']}>
        <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-4">
          <span className={styles.medal}>🥉</span> Silver
        </h3>
        <div className={styles['sponsor-logos']}>
          <Image src="/placeholder.png" alt="UKG" width={150} height={80} />
        </div>
      </div>
      */}

      <div className={`${styles['sponsor-cta']} text-center space-y-6`}>
        <h3 className="text-4xl md:text-5xl font-bold">
          Empower the Next Generation of CS Leaders
        </h3>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Your sponsorship helps create opportunities for Black and Latinx CS students to excel academically,
          socially, and professionally. Join an exclusive network of visionary companies driving meaningful change
          in tech.
        </p>
        <a
          href="#"
          className={`${styles['cta-button']} text-lg md:text-xl px-8 py-4`}
        >
          Learn About Sponsorship Tiers
        </a>
      </div>
    </motion.section>
  );
}

function FAQSection() {
  return (
    <motion.section
      className={styles['faq-section']}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles['faq-heading']}>Frequently Asked Questions</h2>
      <div className={styles['accordion-container']}>
        <ul id="accordion">
          <li className={styles['faq-item']}>
            <input type="radio" name="accordion" id="faq1" />
            <label htmlFor="faq1" className={styles['faq-label']}>
              <span className={styles.question}>What does ColorStack do?</span>
              <span className={styles.arrow}>&#x3e;</span>
            </label>
            <div className={styles.content}>
              <p>
                ColorStack increases the number of Black & Latinx computer science students who start rewarding
                technical careers.
              </p>
            </div>
          </li>

          <li className={styles['faq-item']}>
            <input type="radio" name="accordion" id="faq2" />
            <label htmlFor="faq2" className={styles['faq-label']}>
              <span className={styles.question}>Do I have to be Black or Latinx to join?</span>
              <span className={styles.arrow}>&#x3e;</span>
            </label>
            <div className={styles.content}>
              <p>
                While you must be Black or Latinx to become a member of the national organization, the chapter is
                open to everyone committed to our mission.
              </p>
            </div>
          </li>

          <li className={styles['faq-item']}>
            <input type="radio" name="accordion" id="faq3" />
            <label htmlFor="faq3" className={styles['faq-label']}>
              <span className={styles.question}>
                If I join ColorStack UTA, am I automatically in ColorStack National?
              </span>
              <span className={styles.arrow}>&#x3e;</span>
            </label>
            <div className={styles.content}>
              <p>
                No, you still need to apply to become a member of the ColorStack national chapter at{' '}
                <a href="https://www.colorstack.org" target="_blank" rel="noopener noreferrer">
                  www.colorstack.org
                </a>
                .
              </p>
            </div>
          </li>
        </ul>
      </div>
    </motion.section>
  );
}



export default function Home() {
  return (
    <div>
      <WhatWeDo />
      <FeaturesSection />
      <UpcomingEvents />
      <InstagramSection />
      <CTASection />
      <SponsorsSection />
      <FAQSection />
    </div>
  );
}
