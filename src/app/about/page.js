// src/app/about/page.js
import Image from 'next/image'
import { FaLinkedin } from 'react-icons/fa'

export default function AboutPage() {
  // Executive Board members
  const eBoard = [
    { id: 'manuel-arellano-jr', name: 'Manuel Arellano Jr', role: 'Co-President', img: '/manuelarellanojr.webp', linkedin: 'https://www.linkedin.com/in/manuel-arellano-jr/' },
    { id: 'diana-rios', name: 'Diana Rios', role: 'Co-President', img: '/dianarios.webp', linkedin: 'https://www.linkedin.com/in/diana-rios25/' },
    { id: 'farrukh-hayat', name: 'Farrukh Hayat', role: 'Co-Vice President', img: '/farrukhhayat.webp', linkedin: 'https://www.linkedin.com/in/farrukhhayat/' },
    { id: 'karla-reyes', name: 'Karla Reyes', role: 'Treasurer', img: '/karlareyes.webp', linkedin: 'https://www.linkedin.com/in/kreyescse/' },
    //{ id: 'tbd1-secretary', name: 'TBD', role: 'Secretary', img: '/images/placeholder.png', linkedin: '#' },
    //{ id: 'co-vice-tbd', name: 'TBD', role: 'Co-Vice President', img: '/images/placeholder.png', linkedin: '#' },
    //{ id: 'webmaster-tbd', name: 'TBD', role: 'WebMaster', img: '/images/placeholder.png', linkedin: '#' },//
  ]
  // Other Officers and Directors
  const officers = [
    { id: 'genesis-tapia', name: 'Genesis Tapia', role: 'Women of ColorStack Director', img: '/genesistapia.webp', linkedin: 'https://www.linkedin.com/in/genesistapiarodriguez/' },
    { id: 'jocelyn-vazquez', name: 'Jocelyn Vazquez', role: 'Socials & Graphics Director', img: '/jocelynvazquez.webp', linkedin: 'https://www.linkedin.com/in/jocelyn-vazquez/' },
    { id: 'tbd3-recruitment', name: 'TBD', role: 'Recruitment Director', img: '/PhotoPlaceholder.webp', linkedin: '#' },
    { id: 'tbd3-corporate', name: 'TBD', role: 'Corporate Outreach Director', img: '/PhotoPlaceholder.webp', linkedin: '#' },
    //{ id: 'tbd4-women', name: 'TBD', role: 'Women of ColorStack Officer', img: '/images/placeholder.png', linkedin: '#' },
    //{ id: 'tbd4-socials', name: 'TBD', role: 'Socials & Graphics Officer', img: '/images/placeholder.png', linkedin: '#' },
    //{ id: 'tbd4-recruitment', name: 'TBD', role: 'Recruitment Officer', img: '/images/placeholder.png', linkedin: '#' },
    //{ id: 'tbd4-corporate', name: 'TBD', role: 'Corporate Outreach Officer', img: '/images/placeholder.png', linkedin: '#' },

  ]

  return (
    <main className="bg-[#0b0f24] text-white">
      {/* Hero / Committed Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold">ColorStack UTA is a team committed to…</h1>
          <p className="text-lg">
            Investing in the futures of those left behind every day. We are a tech
            student organization cultivating the strongest campus community of its
            kind to deliver community building, academic support, and career
            development opportunities.
          </p>
          <a
            href="https://linktr.ee/colorstack_uta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#fd9739] hover:bg-[#e67c20] text-white font-semibold px-6 py-3 rounded-full transition"
          >
            View Link Tree
          </a>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/colorstackstudents.webp"
            alt="ColorStack collage"
            width={800}
            height={600}
            className="rounded-xl object-cover w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* National Info */}
      <section className="max-w-7xl mx-auto px-6 py-8 bg-[#1a1d3d] rounded-xl mb-16">
        <h2 className="text-3xl font-semibold text-center mb-4">About ColorStack National</h2>
        <p className="text-lg text-gray-300 mb-6">
          The ColorStack Family is our community of 10,000+ Black and Latinx Computer
          Science students from 900+ schools nationwide. We’re committed to providing
          community building, academic support, and career development year-round
          through our active Slack channel, monthly Fam Fridays, and partnerships
          with 70+ top tech companies.
        </p>
        <div className="text-center">
          <a
            href="https://www.colorstack.org/join"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#fd9739] hover:bg-[#e67c20] text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Become a National Member
          </a>
        </div>
      </section>

      {/* Meet the E-Board */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Meet the E-Board</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {eBoard.map((m) => (
            <div key={m.id} className="bg-[#1a1d3d] rounded-xl p-6 text-center space-y-4">
              <Image
                src={m.img}
                alt={m.name}
                width={120}
                height={120}
                className="mx-auto rounded-full object-cover"
              />
              <h3 className="text-xl font-bold">{m.name}</h3>
              <p className="text-gray-400">{m.role}</p>
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-[#fd9739] hover:text-[#e67c20]"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Officers */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Meet the Officers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {officers.map((m) => (
            <div key={m.id} className="bg-[#1a1d3d] rounded-xl p-6 text-center space-y-4">
              <Image
                src={m.img}
                alt={m.name}
                width={120}
                height={120}
                className="mx-auto rounded-full object-cover"
              />
              <h3 className="text-xl font-bold">{m.name}</h3>
              <p className="text-gray-400">{m.role}</p>
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-[#fd9739] hover:text-[#e67c20]"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form (Formspree) */}
      <section className="max-w-7xl mx-auto px-6 py-12 bg-[#1a1d3d] rounded-xl mb-16">
        <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
        <form
          action="https://formspree.io/f/xjkrdowa"
          method="POST"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input type="hidden" name="_next" value={`${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`} />
          <input name="firstName" type="text" placeholder="First Name" className="p-3 rounded bg-white text-black" required />
          <input name="lastName" type="text" placeholder="Last Name" className="p-3 rounded bg-white text-black" required />
          <input name="email" type="email" placeholder="Email Address" className="md:col-span-2 p-3 rounded bg-white text-black" required />
          <textarea name="message" placeholder="Message" rows={4} className="md:col-span-2 p-3 rounded bg-white text-black" required />
          <button type="submit" className="md:col-span-2 bg-[#fd9739] hover:bg-[#e67c20] text-white font-bold py-3 rounded-full transition">
            Submit
          </button>
        </form>
      </section>
    </main>
  )
}
