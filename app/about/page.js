import { ArrowRight, Users, Sparkles, Briefcase } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Pinstripe from "@/components/Pinstripe";
import { EBOARD, OFFICERS, FOUNDED_YEAR } from "@/lib/content";

export const metadata = {
  title: "About | ColorStack UTA",
  description: "Meet the ColorStack UTA e-board and officers, and learn about our mission and our national community.",
};

function PersonCard({ name, role }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <div className="bg-white border border-navy/10 rounded-sm p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-sm bg-navy text-cream flex items-center justify-center font-serif font-bold text-sm shrink-0">
        {initials}
      </div>
      <div className="min-w-0">
        <div className="font-bold text-sm text-navy truncate">{name}</div>
        <div className="text-brass text-xs font-semibold">{role}</div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen font-sans">
      <Nav />
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-14 text-center">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-4">About Us</p>
        <h1 className="font-serif text-3xl sm:text-5xl leading-tight mb-6 text-navy">
          A chapter committed to investing in the futures of those left behind.
        </h1>
        <p className="text-[#4A4A44] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          A tech student organization cultivating the strongest campus community of its kind — delivering community building, academic support, and career development for Black and Latinx CS students at UT Arlington, since {FOUNDED_YEAR}.
        </p>
      </section>

      <Pinstripe />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid sm:grid-cols-3 gap-5">
        {[
          { icon: Users, title: "Community", body: "We build a supportive space where members grow and belong." },
          { icon: Sparkles, title: "Development", body: "We provide resources, workshops, and mentorship to level up." },
          { icon: Briefcase, title: "Opportunity", body: "We connect members to internships, jobs, and career-defining experiences." },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-white border border-navy/10 rounded-sm p-6">
            <Icon className="text-brass mb-4" size={22} />
            <h3 className="font-serif text-lg font-bold mb-2 text-navy">{title}</h3>
            <p className="text-[#6B6A64] text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </section>

      <Pinstripe />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">Leadership</p>
        <h2 className="font-serif text-2xl sm:text-3xl mb-8 text-navy">Meet the E-Board.</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {EBOARD.map((p) => <PersonCard key={p.name} {...p} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 border-t border-navy/10">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">Directors</p>
        <h2 className="font-serif text-2xl sm:text-3xl mb-8 text-navy">Meet the Officers.</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {OFFICERS.map((p) => <PersonCard key={p.name} {...p} />)}
        </div>
      </section>

      <Pinstripe />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">Our National Family</p>
        <h2 className="font-serif text-2xl sm:text-3xl mb-4 text-navy">About ColorStack National.</h2>
        <p className="text-[#4A4A44] leading-relaxed max-w-2xl mb-6">
          The ColorStack Family is our community of 10,000+ Black and Latinx Computer Science students from 900+ schools nationwide, providing community building, academic support, and career development year-round.
        </p>
        <a
          href="https://www.colorstack.org/join"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-navy text-navy font-bold text-xs uppercase tracking-wide px-6 py-3 rounded-sm"
        >
          Become a National Member <ArrowRight size={15} />
        </a>
      </section>

      <Footer />
    </div>
  );
}
