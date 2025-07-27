// src/app/students/page.js
'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './students.module.css';

export default function StudentsPage() {
  return (
    <main className={styles.main}>

      {/* 1. Hero + Signup CTA */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          Welcome to ColorStack UTA
        </h1>
        <p className={styles.heroDesc}>
          We’re a community of Black & Latinx CS students empowering each other through
          networking, academic support, and career‑building partnerships.
        </p>
        <Link href="/join" className={styles.ctaButton}>
          Become a Member
        </Link>
      </section>

      {/* 2. Member Benefits Grid */}
      <section className={styles.benefitsSection}>
        <h2>Why Become an Officer?</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <h3>Close Networking</h3>
            <p>Work directly with fellow officers…</p>
          </div>
          <div className={styles.benefitCard}>
            <h3>Behind‑the‑Scenes Access</h3>
            <p>Collaborate with top‑company recruiters…</p>
          </div>
          <div className={styles.benefitCard}>
            <h3>Career Advancement</h3>
            <p>Many officers go on to land roles at Adobe…</p>
          </div>
        </div>

       <h3 className={styles.notableHeading}>
        Notable Companies Our Members Have Interned at:
       </h3>
        <div className={styles.logoGrid}>
          {[
            { src: "/adobelogo.webp", alt: "Adobe" },
            { src: "/microsoftlogo.webp", alt: "Microsoft" },
            { src: "/amazonlogo.webp", alt: "Amazon" },
            { src: "/jpmorganchaselogo.webp", alt: "Chase" },
            { src: "/applelogo.webp", alt: "Apple" },
          ].map((c,i) => (
            <div key={i} className={styles.logoItem}>
              <Image src={c.src} alt={c.alt} width={160} height={60} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Officer Application Section */}
      <section className={styles.applicationSection}>
        <h2>Apply to be an Officer</h2>
        <form
          action="https://formspree.io/f/xjkrdowa"
          method="POST"
          className={styles.applicationForm}
        >
          <input type="hidden" name="_next" value={`${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`} />
          <input name="fullName" type="text" placeholder="Full Name" required />
          <input name="email" type="email" placeholder="Email Address" required />
          <textarea name="why" placeholder="Why do you want to be an officer?" rows={4} required />
          <button type="submit" className={styles.applicationSubmit}>
            Submit Application
          </button>
        </form>
      </section>

      {/* 4. Calendar Embed & RSVP */}
      <section className={styles.calendarSection}>
        <h2>Stay Updated</h2>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=your_calendar_id"
          className={styles.calendarEmbed}
          allowFullScreen
        />
        <a
          href="https://calendar.google.com/calendar/u/0/r?cid=your_calendar_id"
          className={styles.subscribeCalendarBtn}
        >
          Subscribe to Our Calendar
        </a>
      </section>

    </main>
  );
}
