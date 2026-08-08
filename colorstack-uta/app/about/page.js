import { ArrowRight, Users, Sparkles, Briefcase } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About | ColorStack UTA",
  description: "Learn about ColorStack UTA's mission and our national community of Black and Latinx CS students.",
};

export default function About() {
  return (
    <div className="min-h-screen">
      <Nav />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-14 text-center">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">About Us</p>
        <h1 className="text-3xl sm:text-5xl font-black uppercase leading-tight mb-6">
          We&apos;re a team committed to investing in the futures of those left behind.
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          A tech student organization cultivating the strongest campus community of its kind — delivering community building, academic support, and career development for Black and Latinx CS students at UT Arlington.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid sm:grid-cols-3 gap-5">
        {[
          { icon: Users, title: "Community", body: "We build a supportive space where members grow and belong." },
          { icon: Sparkles, title: "Development", body: "We provide resources, workshops, and mentorship to level up." },
          { icon: Briefcase, title: "Opportunity", body: "We connect members to internships, jobs, and career-defining experiences." },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-[#111C4E] border border-white/10 rounded-2xl p-6">
            <Icon className="text-orange-500 mb-4" size={24} />
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10 text-center">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Leadership</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-6">Want to know who&apos;s running this?</h2>
        <a href="/board" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold px-6 py-3 rounded-full">
          Meet the Board <ArrowRight size={16} />
        </a>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Our National Family</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4">About ColorStack National.</h2>
        <p className="text-slate-300 leading-relaxed max-w-2xl mb-6">
          The ColorStack Family is our community of 10,000+ Black and Latinx Computer Science students from 900+ schools nationwide. We&apos;re committed to providing community building, academic support, and career development year-round through an active Slack channel, monthly Fam Fridays, and partnerships with 70+ top tech companies.
        </p>
        <a
          href="https://www.colorstack.org/join"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-white/25 hover:border-white/60 transition-colors font-semibold px-6 py-3 rounded-full"
        >
          Become a National Member <ArrowRight size={16} />
        </a>
      </section>

      <Footer />
    </div>
  );
}
