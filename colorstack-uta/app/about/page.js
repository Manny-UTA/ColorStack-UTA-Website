import { ArrowRight, Users, Sparkles, Briefcase } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { EBOARD, OFFICERS } from "@/lib/content";

export const metadata = {
  title: "About | ColorStack UTA",
  description: "Meet the ColorStack UTA e-board and officers, and learn about our mission and our national community.",
};

function PersonCard({ name, role }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <div className="bg-[#111C4E] border border-white/10 rounded-xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center font-black text-sm shrink-0">
        {initials}
      </div>
      <div className="min-w-0">
        <div className="font-bold text-sm truncate">{name}</div>
        <div className="text-orange-400 text-xs font-semibold">{role}</div>
      </div>
    </div>
  );
}

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

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Leadership</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-8">Meet the E-Board.</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {EBOARD.map((p) => <PersonCard key={p.name} {...p} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Directors</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-8">Meet the Officers.</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {OFFICERS.map((p) => <PersonCard key={p.name} {...p} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Get Involved</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-8">Why become an officer?</h2>
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {[
            { title: "Close Networking", body: "Work directly with fellow officers and build relationships that last well past graduation." },
            { title: "Behind-the-Scenes Access", body: "Collaborate directly with recruiters and engineers from our top-company partners." },
            { title: "Career Advancement", body: "Many of our officers go on to land roles at companies like Adobe, JPMorgan, and Capital One." },
          ].map((item) => (
            <div key={item.title} className="bg-[#111C4E] border border-white/10 rounded-xl p-5">
              <h3 className="font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        <a
          href="https://linktr.ee/colorstack_uta"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold px-6 py-3 rounded-full"
        >
          Apply to be an Officer <ArrowRight size={16} />
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
