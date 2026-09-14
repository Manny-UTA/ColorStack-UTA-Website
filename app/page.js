"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowRight, ArrowUpRight, Calendar, Handshake, Users, HeartHandshake, Palette } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PhotoBlock from "@/components/PhotoBlock";
import Pinstripe from "@/components/Pinstripe";
import { storage } from "@/lib/storage";
import { SEED_EVENTS, IMAGE_SLOTS, FLYER_SLOTS, PARTNERS, FOUNDED_YEAR, TRACKS } from "@/lib/content";

const TRACK_ICONS = [Handshake, Users, HeartHandshake, Palette];

async function ensureSeeded() {
  try {
    await storage.get("events");
  } catch {
    await storage.set("events", JSON.stringify(SEED_EVENTS));
  }
  try {
    await storage.get("siteImages");
  } catch {
    await storage.set("siteImages", JSON.stringify({}));
  }
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function Home() {
  const [events, setEvents] = useState(null);
  const [siteImages, setSiteImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await ensureSeeded();
        const [e, img] = await Promise.all([
          storage.get("events"),
          storage.get("siteImages"),
        ]);
        setEvents(typeof e.value === "string" ? JSON.parse(e.value) : e.value);
        setSiteImages(typeof img.value === "string" ? JSON.parse(img.value) : img.value);
      } catch {
        setEvents(SEED_EVENTS);
        setSiteImages({});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const upcomingEvents = useMemo(() => {
    if (!events) return [];
    return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events]);

  const highlightSlots = IMAGE_SLOTS.filter((s) => s.id !== "hero");

  return (
    <div className="min-h-screen">
      <Nav />

      {/* ---------------- HERO ---------------- */}
      <section className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16 grid md:grid-cols-2 gap-10 items-center overflow-hidden">
        <svg
          viewBox="0 0 40 46"
          className="hidden md:block absolute -left-10 top-1/2 -translate-y-1/2 w-[520px] h-[600px] opacity-[0.035] pointer-events-none"
          fill="none"
          aria-hidden="true"
        >
          <path d="M20 2 L37 8 V22 C37 33 30 41 20 44 C10 41 3 33 3 22 V8 Z" stroke="#16233F" strokeWidth="0.5" />
        </svg>
        <div className="relative">
          <p className="font-sans text-brass text-[11px] font-bold tracking-[0.28em] uppercase mb-7">
            A Chapter of ColorStack National · Est. {FOUNDED_YEAR}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-[58px] leading-[1.1] mb-7 text-navy">
            We build. We connect. <span className="italic">We ColorStack.</span>
          </h1>
          <p className="font-sans text-[16.5px] text-[#4A4A44] leading-relaxed max-w-lg mb-9">
            Building the next generation of Black and Latinx technical leaders at UT Arlington — through community, mentorship, and real pathways into tech.
          </p>
          <div className="flex flex-wrap gap-4 font-sans">
            <a href="/portal" className="inline-flex items-center gap-2 bg-navy text-cream font-bold text-[12.5px] uppercase tracking-wide px-7 py-3.5 rounded-sm whitespace-nowrap">
              Get Involved <ArrowRight size={15} />
            </a>
            <a href="#events" className="inline-flex items-center gap-2 border border-navy text-navy font-bold text-[12.5px] uppercase tracking-wide px-7 py-3.5 rounded-sm">
              Explore Events
            </a>
          </div>
        </div>
        <PhotoBlock src={siteImages.hero} alt="ColorStack UTA members on campus" className="w-full rounded-sm aspect-[4/3]" />
      </section>

      <Pinstripe />

      {/* ---------------- STATS — navy contrast band ---------------- */}
      <section className="bg-navy">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap md:flex-nowrap">
            {[
              { value: "400+", label: "Members" },
              { value: "20+", label: "Company Partners" },
              { value: "9+", label: "Internships '24–'25" },
            ].map((s, i) => (
              <div key={s.label} className={`flex-1 min-w-[160px] py-10 px-6 sm:px-10 ${i !== 0 ? "border-l border-cream/15" : ""}`}>
                <div className="font-serif text-4xl sm:text-[42px] font-bold text-cream">{s.value}</div>
                <div className="font-sans text-[10.5px] tracking-[0.16em] uppercase text-brass font-bold mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pinstripe />

      {/* ---------------- MEMBER PORTAL ---------------- */}
      <section id="events" className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20 scroll-mt-24">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="font-sans text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">What's Next</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-navy">Upcoming events.</h2>
          </div>
          <a href="/portal" className="font-sans inline-flex items-center gap-1.5 text-navy hover:text-brass text-sm font-semibold transition-colors">
            Check your dues status <ArrowRight size={14} />
          </a>
        </div>
        {loading ? (
          <p className="font-sans text-navy/40 text-sm">Loading…</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
            {upcomingEvents.slice(0, 4).map((ev) => (
              <div key={ev.id} className="bg-white border border-navy/10 rounded-sm px-4 py-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-brass bg-brass/10 px-2 py-1 rounded-sm mb-3">{ev.type}</span>
                <div className="text-sm font-semibold text-navy mb-1">{ev.title}</div>
                <div className="text-xs text-navy/50 flex items-center gap-1.5">
                  <Calendar size={12} /> {formatDate(ev.date)} · {ev.time}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Pinstripe />

      {/* ---------------- HIGHLIGHTS ---------------- */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <p className="font-sans text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">On Fire</p>
        <h2 className="font-serif text-2xl sm:text-3xl mb-8 text-navy">What we've been up to.</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 font-sans">
          {highlightSlots.map((h) => (
            <div key={h.id}>
              <div className="relative rounded-sm overflow-hidden aspect-[4/3] mb-3 border border-navy/10">
                <PhotoBlock src={siteImages[h.id]} alt={h.title} className="absolute inset-0 w-full h-full" />
                <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wide bg-brass text-navy px-2 py-1 rounded-sm">{h.tag}</span>
              </div>
              <h3 className="text-sm font-bold text-navy mb-1">{h.title}</h3>
              <p className="text-[#6B6A64] text-xs leading-relaxed">{h.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <Pinstripe />

      {/* ---------------- FLYERS SHOWCASE ---------------- */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-3">
          <div>
            <p className="font-sans text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">Corporate Outreach</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-navy">See you there.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {FLYER_SLOTS.map((f) => (
            <div key={f.id} className="group">
              <div className="relative rounded-sm overflow-hidden aspect-[4/5] mb-3 border border-navy/10 bg-navy/[0.04]">
                <PhotoBlock src={siteImages[f.id]} alt={f.title} className="absolute inset-0 w-full h-full" />
              </div>
              <h3 className="text-sm font-bold text-navy mb-1">{f.title}</h3>
              <p className="text-[#6B6A64] text-xs leading-relaxed">{f.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <Pinstripe />

      {/* ---------------- WHERE YOU FIT ---------------- */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-3">
          <div>
            <p className="font-sans text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">Get Involved</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-navy">Where you fit.</h2>
          </div>
          <a href="/about" className="font-sans hidden sm:inline-flex items-center gap-1.5 text-navy hover:text-brass text-sm font-semibold transition-colors">
            Meet the full board <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="border-t border-navy/15">
          {TRACKS.map((t, i) => {
            const Icon = TRACK_ICONS[i % TRACK_ICONS.length];
            return (
              <div key={t.title} className={`group flex items-center gap-5 sm:gap-8 py-6 px-4 -mx-4 border-b border-navy/15 ${i % 2 === 1 ? "bg-navy/[0.025]" : ""}`}>
                <span className="font-sans text-xs font-bold text-navy/30 w-6 shrink-0">{t.num}</span>
                <div className="w-10 h-10 rounded-sm border border-navy/20 flex items-center justify-center shrink-0 group-hover:border-brass group-hover:bg-brass/10 transition-colors">
                  <Icon size={18} className="text-navy" />
                </div>
                <div className="flex-1 min-w-0 grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 items-baseline">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-navy">{t.title}</h3>
                  <p className="font-sans text-sm text-[#6B6A64]">{t.blurb}</p>
                </div>
                <div className="hidden md:flex flex-col items-end shrink-0 font-sans">
                  <span className="text-[10px] uppercase tracking-wide text-navy/40">Led by</span>
                  <span className="text-xs font-semibold text-navy">{t.lead}</span>
                </div>
                <ArrowUpRight size={16} className="text-navy/30 group-hover:text-brass transition-colors shrink-0" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- PULL QUOTE — bold contrast moment ---------------- */}
      <section className="relative bg-navy overflow-hidden">
        <svg
          viewBox="0 0 40 46"
          className="absolute -right-16 -top-10 w-[420px] h-[480px] opacity-[0.06] pointer-events-none"
          fill="none"
          aria-hidden="true"
        >
          <path d="M20 2 L37 8 V22 C37 33 30 41 20 44 C10 41 3 33 3 22 V8 Z" stroke="#FAF7F0" strokeWidth="0.6" />
        </svg>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center relative">
          <p className="font-serif text-[28px] sm:text-[40px] leading-[1.3] text-cream">
            A team committed to investing in the futures of{" "}
            <span className="italic text-brass">those left behind.</span>
          </p>
        </div>
      </section>

      <Pinstripe />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid md:grid-cols-3 gap-8">
        <div>
          <p className="font-sans text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">Our Mission</p>
          <p className="font-serif text-xl leading-snug text-navy">To increase the number of Black and Latinx students in tech.</p>
          <a href="/about" className="font-sans inline-flex items-center gap-1.5 text-navy hover:text-brass text-sm font-semibold mt-4 transition-colors">
            Meet the team <ArrowRight size={14} />
          </a>
        </div>
        {[
          { title: "Community", body: "We build a supportive space where members grow and belong." },
          { title: "Development", body: "We provide resources, workshops, and mentorship to level up." },
          { title: "Opportunity", body: "We connect members to internships, jobs, and career-defining experiences." },
        ].map((item) => (
          <div key={item.title} className="font-sans">
            <h3 className="font-serif text-lg font-bold mb-2 text-navy">{item.title}</h3>
            <p className="text-[#6B6A64] text-sm leading-relaxed">{item.body}</p>
          </div>
        ))}
      </section>

      <Pinstripe />

      {/* ---------------- PARTNERS ---------------- */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 font-sans">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase">Our Partners</p>
          <a href="/sponsors" className="inline-flex items-center gap-1.5 text-navy hover:text-brass text-sm font-semibold transition-colors">
            Become a sponsor <ArrowRight size={14} />
          </a>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4 text-base sm:text-lg font-serif font-bold text-navy/70">
          {PARTNERS.map((p) => (
            <span key={p} className="hover:text-navy transition-colors">{p}</span>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
