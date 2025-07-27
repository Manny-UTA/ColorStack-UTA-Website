'use client';

import Image from 'next/image';
import styles from './sponsor.module.css';

export default function SponsorsPage() {
  return (
    <>
      {/* TIER LIST HIDDEN UNTIL WE GET SPONSORS !!!! 
      ————————————— Our Sponsors ————————————— */}
      <section className={styles.sponsorsSection}>
        {/*<h2 className={styles.sponsorsHeading}>Our Sponsors</h2>

        {/* Platinum Tier */}
        {/*<div className={styles.sponsorTier}>
          <h3>🥇 Platinum</h3>
          <div className={styles.sponsorLogos}>
            <Image src="/placeholder.png" alt="Bloomberg" width={150} height={80} />
          </div>
        </div>

        {/* Gold Tier */}
        {/*<div className={styles.sponsorTier}>
          <h3>🥈 Gold</h3>
          <div className={styles.sponsorLogos}>
            <Image src="/placeholder.png" alt="Capital One" width={150} height={80} />
            {/* …other logos */}
          {/*</div>
        </div>*/}

        {/* Silver Tier */}
        {/*<div className={styles.sponsorTier}>
          <h3>🥉 Silver</h3>
          <div className={styles.sponsorLogos}>
            <Image src="/placeholder.png" alt="UKG" width={150} height={80} />
          </div>
        </div> */}

        {/* CTA */}
        <div className={styles.sponsorCta}>
          <h2 className={styles.sponsorCtaTitle}>
            Join Our Sponsor Program
          </h2>
          <p className={styles.sponsorCtaSubtitle}>
            Partner with us to make a lasting impact on the future of Black and Latinx Computer Science students.
          </p>

          <div className={styles.ctaContent}>
            <div className={styles.ctaBenefits}>
              <h3 className={styles.ctaBenefitsTitle}>Why Partner With Us?</h3>
              <ul className={styles.ctaBenefitsList}>
                <li>Host engaging workshops and connect with talented students.</li>
                <li>Sponsor events that showcase your brand and values.</li>
                <li>Access exclusive networking opportunities with our community.</li>
                <li>Support diversity and inclusion in tech through meaningful partnerships.</li>
              </ul>
            </div>

            <div className={styles.ctaAction}>
              <p className={styles.ctaActionText}>
                Let’s work together to create opportunities and drive innovation. Fill out the form below,
                and we’ll get back to you with a customized proposal that fits your needs.
              </p>
              <a href="#sponsor-form" className={styles.ctaButton}>
                Get in Touch to Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* — Sponsored Events — */}
<section className={styles.eventsSection}>
  <div className={styles.container}>
    <h2 className={styles.sectionSubtitle}>Sponsored Events</h2>
    <div className={styles.eventsGrid}>
      {/* Hackathon */}
      <div className={styles.eventCard}>
        <Image
          src="/utahackathon.webp"
          alt="Hackathon"
          width={500}
          height={200}
          className={styles.eventLogo}
        />
        <h3 className={styles.eventTitle}>ColorStack UTA Hackathon</h3>
        <p className={styles.eventDescription}>
          A 24-hour coding marathon where student teams build projects from scratch—complete with industry-sponsored challenges, mentorship, and cash prizes.
        </p>
      </div>

      {/* Summit */}
      <div className={styles.eventCard}>
        <Image
          src="/colorstacksummit.webp"
          alt="Summit Logo"
          width={500}
          height={200}
          className={styles.eventLogo}
        />
        <h3 className={styles.eventTitle}>ColorStack UTA Summit</h3>
        <p className={styles.eventDescription}>
          Our annual flagship conference featuring keynote talks, breakout workshops, and networking sessions with top tech companies like Duolingo & Google.
        </p>
      </div>

      {/* Diversity Convention Panel */}
      <div className={styles.eventCard}>
        <Image
          src="/afrotechuta.webp"
          alt="Diversity Panel"
          width={500}
          height={200}
          className={styles.eventLogo}
        />
        <h3 className={styles.eventTitle}>Diversity in Tech Panel</h3>
        <p className={styles.eventDescription}>
          A special session at SHPE / AfroTech conventions spotlighting Black & Latinx engineers, with Q&A and recruiting tips from our corporate partners.
        </p>
      </div>
    </div>
 


          <h2 className={styles.sectionSubtitle}>Partner-Led Workshops</h2>
          <div className={styles.eventsGrid}>
            <div className={styles.eventCard}>
              <Image
              src="/jpmorganworkshop.webp"
              alt="JPMorgan&Chase"
              width={700}
              height={300}
              className={styles.eventLogo}
              />
              <h3 className={styles.eventTitle}>JPMorgan&Chase "Day in the Life of a JPMorgan Software Engineer - March 2025</h3>
              <p className={styles.eventDescription}>
                An insider’s look at life as a JPMorgan software engineer: alumni panelists shared daily workflows and development methodologies, while recruiters outlined internship application best practices and interview tips—capped off with a lively Q&A and free boba and mochi donuts.
              </p>
            </div>
            <div className={styles.eventCard}>
              <Image
              src="/fidelityworkshop.webp"
              alt="Bloomberg Logo"
              width={700}
              height={300}
              className={styles.eventLogo}
              />
              <h3 className={styles.eventTitle}>Fidelity Internship Insights Session - November 2024</h3>
              <p className={styles.eventDescription}>
                A Fidelity recruiter walked us through the company’s culture, explained their summer internship pipeline, and shared resume- and interview-tips—finishing up with an open Q&A.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
