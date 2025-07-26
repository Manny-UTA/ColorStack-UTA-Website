// src/app/about/page.js
import Image from 'next/image'
import { FaLinkedin } from 'react-icons/fa'
import styles from './about.module.css'

export default function AboutPage() {
  const eBoard = [
    { id: 'manuel-arellano-jr', name: 'Manuel Arellano Jr', role: 'Co‑President', img: '/manuelarellanojr.webp', linkedin: 'https://www.linkedin.com/in/manuel-arellano-jr/' },
    { id: 'diana-rios',         name: 'Diana Rios',         role: 'Co‑President', img: '/dianarios.webp',        linkedin: 'https://www.linkedin.com/in/diana-rios25/'  },
    { id: 'farrukh-hayat',      name: 'Farrukh Hayat',      role: 'Co‑Vice President', img: '/farrukhhayat.webp',   linkedin: 'https://www.linkedin.com/in/farrukhhayat/' },
    { id: 'karla-reyes',        name: 'Karla Reyes',        role: 'Treasurer',        img: '/karlareyes.webp',     linkedin: 'https://www.linkedin.com/in/kreyescse/'   },
  ]

  const officers = [
    { id: 'genesis-tapia',    name: 'Genesis Tapia',     role: 'Women of ColorStack Director', img: '/genesistapia.webp',  linkedin: 'https://www.linkedin.com/in/genesistapiarodriguez/' },
    { id: 'jocelyn-vazquez',  name: 'Jocelyn Vazquez',    role: 'Socials & Graphics Director', img: '/jocelynvazquez.webp', linkedin: 'https://www.linkedin.com/in/jocelyn-vazquez/' },
    { id: 'tbd3-recruitment', name: 'TBD',               role: 'Recruitment Director',         img: '/PhotoPlaceholder.webp', linkedin: '#' },
    { id: 'tbd3-corporate',   name: 'TBD',               role: 'Corporate Outreach Director',  img: '/PhotoPlaceholder.webp', linkedin: '#' },
  ]

  return (
    <main className={styles.main}>

      {/* Hero / Committed Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            ColorStack UTA is a team committed to…
          </h1>
          <p className={styles.heroText}>
            Investing in the futures of those left behind every day. We are a tech
            student organization cultivating the strongest campus community of its
            kind to deliver community building, academic support, and career
            development opportunities.
          </p>
          <a
            href="https://linktr.ee/colorstack_uta"
            className={styles.heroCta}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Link Tree
          </a>
        </div>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/colorstackstudents.webp"
            alt="ColorStack collage"
            fill
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* National Info */}
      <section className={styles.national}>
        <h2 className={styles.nationalTitle}>About ColorStack National</h2>
        <p className={styles.nationalText}>
          The ColorStack Family is our community of 10,000+ Black and Latinx Computer
          Science students from 900+ schools nationwide. We’re committed to providing
          community building, academic support, and career development year-round
          through our active Slack channel, monthly Fam Fridays, and partnerships
          with 70+ top tech companies.
        </p>
        <div className={styles.nationalAction}>
          <a
            href="https://www.colorstack.org/join"
            className={styles.nationalCta}
            target="_blank"
            rel="noopener noreferrer"
          >
            Become a National Member
          </a>
        </div>
      </section>

      {/* Meet the E‑Board */}
      <section className={styles.board}>
        <h2 className={styles.boardHeading}>Meet the E‑Board</h2>
        <div className={styles.grid}>
          {eBoard.map(m => (
            <div key={m.id} className={styles.card}>
              <Image
                src={m.img}
                alt={m.name}
                width={120}
                height={120}
                className={styles.cardImg}
              />
              <h3 className={styles.cardName}>{m.name}</h3>
              <p className={styles.cardRole}>{m.role}</p>
              <a
                href={m.linkedin}
                className={styles.cardSocial}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Officers */}
      <section className={styles.board}>
        <h2 className={styles.boardHeading}>Meet the Officers</h2>
        <div className={styles.grid}>
          {officers.map(m => (
            <div key={m.id} className={styles.card}>
              <Image
                src={m.img}
                alt={m.name}
                width={120}
                height={120}
                className={styles.cardImg}
              />
              <h3 className={styles.cardName}>{m.name}</h3>
              <p className={styles.cardRole}>{m.role}</p>
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  className={styles.cardSocial}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className={styles.contact}>
        <h2 className={styles.contactHeading}>Contact Us</h2>
        <form
          action="https://formspree.io/f/xjkrdowa"
          method="POST"
          className={styles.contactForm}
        >
          <input type="hidden" name="_next" value={`${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`} />
          <input name="firstName"  placeholder="First Name"  required className={styles.contactInput} />
          <input name="lastName"   placeholder="Last Name"   required className={styles.contactInput} />
          <input name="email" type="email" placeholder="Email Address" required className={styles.contactInput} />
          <textarea name="message" placeholder="Message" rows={4} required className={styles.contactInput} />
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </section>

    </main>
  )
}
