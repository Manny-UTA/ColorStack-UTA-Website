import { ArrowRight, Linkedin } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { EBOARD, OFFICERS, YEARBOOK } from "@/lib/content";

export const metadata = {
  title: "Meet the Board | ColorStack UTA",
  description: "Meet the current ColorStack UTA e-board and officers, plus a look back at past chapter leadership.",
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

export default function BoardPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10 text-center">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">Leadership</p>
        <h1 className="text-3xl sm:text-5xl font-black uppercase leading-tight mb-6">Meet the board.</h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          The students running events, building partnerships, and keeping this chapter moving.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Executive Board</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-8">This year&apos;s E-Board.</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {EBOARD.map((p) => <PersonCard key={p.name} {...p} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Directors</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-8">Officers.</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {OFFICERS.map((p) => <PersonCard key={p.name} {...p} />)}
        </div>
      </section>

      {/* ---------------- YEARBOOK ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Chapter History</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4">Yearbook — past board members.</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-2xl">
          A running record of who's led this chapter over the years. These are placeholders — swap in your actual alumni through the officer admin content, or edit <code className="text-orange-300">lib/content.js</code> directly.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {YEARBOOK.map((p, i) => (
            <div key={i} className="bg-[#111C4E] border border-dashed border-white/15 rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-white/5 mb-3" />
              <div className="font-bold text-sm text-slate-300">{p.name}</div>
              <div className="text-orange-400/70 text-xs font-semibold mb-1">{p.role}</div>
              <div className="text-slate-500 text-xs mb-3">{p.term}</div>
              {p.linkedin ? (
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white">
                  <Linkedin size={13} /> LinkedIn
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                  <Linkedin size={13} /> Add link
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Get Involved</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-6">Want to join the board?</h2>
        <a
          href="https://linktr.ee/colorstack_uta"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold px-6 py-3 rounded-full"
        >
          Apply to be an Officer <ArrowRight size={16} />
        </a>
      </section>

      <Footer />
    </div>
  );
}
