'use client';
import Link from 'next/link';
import NextImage from 'next/image'

export default function StudentsPage() {
  return (
    <main className="bg-[#0b0f24] text-white">
      
      
      {/* 1. Hero + Signup CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to ColorStack UTA
        </h1>
        <p className="text-lg md:text-xl mb-6">
          We’re a community of Black & Latinx CS students empowering each other through
          networking, academic support, and career-building partnerships.
        </p>
        <Link
          href="/join"
          className="inline-block bg-[#fd9739] hover:bg-[#e67c20] px-6 py-3 font-semibold rounded-full transition"
        >
          Become a Member
        </Link>
      </section>

      {/* 2. Member Benefits Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Why Become an Officer?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div
        className="
          bg-white text-black 
          p-8               /* more breathing room */
          rounded-2xl       /* extra-round corners */
          shadow-xl         /* heavier default shadow */
          border-l-4 border-indigo-500  /* accent border */
          transform hover:scale-105 hover:shadow-2xl  /* subtle lift */
          transition duration-300 ease-out
        "
      >
        <h3 className="font-bold mb-2 text-lg">Close Networking</h3>
        <p>
          Work directly with fellow officers with experience to review resumes, portfolios, and
          practice interviews.
        </p>
      </div>

      <div
        className="
          bg-white text-black 
          p-8 rounded-2xl shadow-xl
          border-l-4 border-green-500
          transform hover:scale-105 hover:shadow-2xl
          transition duration-300 ease-out
        "
      >
        <h3 className="font-bold mb-2 text-lg">Behind-the-Scenes Access</h3>
        <p>
          Collaborate with top-company recruiters to organize events and workshops.
        </p>
      </div>

      <div
        className="
          bg-white text-black 
          p-8 rounded-2xl shadow-xl
          border-l-4 border-pink-500
          transform hover:scale-105 hover:shadow-2xl
          transition duration-300 ease-out
        "
      >
        <h3 className="font-bold mb-2 text-lg">Career Advancement</h3>
        <p>
          Many officers go on to land roles at Adobe, Microsoft, Amazon, Chase,
          J.P. Morgan and more.
        </p>
      </div>
    </div>

    {/* 3. Notable Companies Logo Grid */}
    <h3 className="text-2xl font-semibold text-center mt-12 mb-6">
      Notable Companies Our Members Have Interned at:
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center items-center">
      {[
        { src: "/adobelogo.webp",      alt: "Adobe"     },
        { src: "/microsoftlogo.webp", alt: "Microsoft" },
        { src: "/amazonlogo.webp",     alt: "Amazon"    },
        { src: "/jpmorganchaselogo.webp", alt: "Chase"   },
        { src: "/applelogo.webp",      alt: "Apple"     },
      ].map((c, i) => (
        <div
          key={i}
          className="
            bg-white rounded-full 
            p-6            
            w-40 h-40      
            flex items-center justify-center
            hover:scale-105 transition-transform duration-200
          "
        >
          <NextImage
            src={c.src}
            alt={c.alt}
            width={160}    
            height={60}
            className="object-contain w-full h-auto"
          />
        </div>
      ))}
    </div>
    </section>

      {/* 3. Officer Application Section */}
    <section className="max-w-7xl mx-auto px-6 py-12 bg-[#1a1d3d] rounded-xl mb-16">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Apply to be an Officer
      </h2>
      <form
        action="https://formspree.io/f/xjkrdowa"   
        method="POST"
        className="max-w-xl mx-auto grid grid-cols-1 gap-4"
      >
        {/* redirect on submit */}
        <input
          type="hidden"
          name="_next"
          value={`${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`}
        />
        {/* set the email subject */}
        <input
          type="hidden"
          name="_subject"
          value="Officer Application"
        />

        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          required
          className="p-3 rounded bg-white text-black"
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          className="p-3 rounded bg-white text-black"
        />
        <textarea
          name="why"
          placeholder="Why do you want to be an officer?"
          rows={4}
          required
          className="p-3 rounded bg-white text-black"
        />
        <button
          type="submit"
          className="bg-[#fd9739] hover:bg-[#e67c20] text-white font-semibold py-3 rounded-full transition"
        >
          Submit Application
        </button>
      </form>
    </section>

      {/* 4. Calendar Embed & RSVP */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-semibold mb-6">Stay Updated</h2>
        {/* Replace SRC with your Google Calendar embed link */}
        <iframe
          src="https://calendar.google.com/calendar/embed?src=your_calendar_id"
          className="w-full h-96 border-0 rounded-lg shadow"
          allowFullScreen
        ></iframe>
        <div className="mt-4">
          <a
            href="https://calendar.google.com/calendar/u/0/r?cid=your_calendar_id"
            className="inline-block bg-[#fd9739] hover:bg-[#e67c20] px-6 py-3 rounded-full text-white transition"
          >
            Subscribe to Our Calendar
          </a>
        </div>
      </section>

    </main>
  )
}