import { ArrowRight, Users, Sparkles, Briefcase } from "lucide-react";
import Leadership from "@/components/Leadership";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Pinstripe from "@/components/Pinstripe";
import { EBOARD, OFFICERS, FOUNDED_YEAR } from "@/lib/content";

export const metadata = {
  title: "About | ColorStack UTA",
  description: "Meet the ColorStack UTA e-board and officers, and learn about our mission and our national community.",
};

export default function About() {
  return (
    <div className="min-h-screen font-sans">
      <Nav />
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-14 text-center">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-4">About Us</p>
        <h1 className="font-sans font-bold tracking-tight text-4xl sm:text-6xl leading-tight mb-6 text-navy">
          Built on community. Driven by possibility.
        </h1>
        <p className="text-[#4A4A44] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Since {FOUNDED_YEAR}, ColorStack UTA has brought Black and Latinx students together around a shared future in tech. We create space to build relationships, develop technical skills, and prepare for what comes next.
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
        <h2 className="font-sans font-bold tracking-tight text-3xl sm:text-4xl mb-8 text-navy">Meet the E-Board.</h2>
        <Leadership people={EBOARD} />
      </section>

      <section id="officers" className="scroll-mt-24 max-w-6xl mx-auto px-5 sm:px-8 py-16 border-t border-navy/10">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">Directors</p>
        <h2 className="font-sans font-bold tracking-tight text-3xl sm:text-4xl mb-8 text-navy">Meet the Officers.</h2>
        <Leadership people={OFFICERS} />
      </section>

      <Pinstripe />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">Our National Family</p>
        <h2 className="font-serif text-2xl sm:text-3xl mb-4 text-navy">About ColorStack National.</h2>
        <p className="text-[#4A4A44] leading-relaxed max-w-2xl mb-6">
          Our chapter is part of ColorStack’s national community of Black and Latinx Computer Science students. Explore national membership for connections and resources beyond campus.
        </p>
        <a
          href="https://www.colorstack.org/join"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-navy text-navy font-bold text-xs uppercase tracking-wide px-6 py-3 rounded-sm whitespace-nowrap"
        >
          Become a National Member <ArrowRight size={15} />
        </a>
      </section>

      <Footer />
    </div>
  );
}
