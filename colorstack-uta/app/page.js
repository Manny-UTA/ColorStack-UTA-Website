"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Users, Building2, Briefcase, TrendingUp, BadgeCheck } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PhotoBlock from "@/components/PhotoBlock";
import PartnerMarquee from "@/components/PartnerMarquee";
import { storage } from "@/lib/storage";
import { SEED_MEMBERS, SEED_EVENTS, IMAGE_SLOTS, INTERNSHIP_HUB } from "@/lib/content";

async function ensureSeeded() {
  try {
    await storage.get("members");
  } catch {
    await storage.set("members", JSON.stringify(SEED_MEMBERS));
  }
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

export default function Home() {
  const [siteImages, setSiteImages] = useState({});

  useEffect(() => {
    (async () => {
      try {
        await ensureSeeded();
        const img = await storage.get("siteImages");
        setSiteImages(JSON.parse(img.value));
      } catch {
        setSiteImages({});
      }
    })();
  }, []);

  const highlightSlots = IMAGE_SLOTS.filter((s) => s.id !== "hero");

  return (
    <div className="min-h-screen">
      <Nav />

      {/* ---------------- HERO ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12 sm:pb-14 grid md:grid-cols-2 gap-8 sm:gap-10 items-center">
        <div>
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">University of Texas at Arlington</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] mb-6 uppercase">
            <span className="block">We build.</span>
            <span className="block">We connect.</span>
            <span className="block text-orange-500">We ColorStack.</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
            Empowering the next generation of Black and Latinx technical leaders at UT Arlington — through community, mentorship, and real pathways into tech.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://linktr.ee/colorstack_uta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold px-6 py-3 rounded-full"
            >
              Get Involved <ArrowRight size={16} />
            </a>
            <a href="/portal" className="inline-flex items-center gap-2 border border-white/25 hover:border-white/60 transition-colors font-semibold px-6 py-3 rounded-full">
              <BadgeCheck size={16} /> Check My Status
            </a>
          </div>
        </div>
        <PhotoBlock src={siteImages.hero} alt="ColorStack UTA members on campus" className="w-full rounded-2xl aspect-[4/3] border border-white/10" />
      </section>

      {/* ---------------- INTERNSHIP HUB POSITIONING ---------------- */}
      <section className="border-y border-white/10 bg-[#0C1650]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">{INTERNSHIP_HUB.eyebrow}</p>
          <h2 className="text-xl sm:text-3xl font-black uppercase mb-4 leading-snug">{INTERNSHIP_HUB.headline}</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">{INTERNSHIP_HUB.body}</p>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {[
            { icon: Users, value: "400+", label: "Members" },
            { icon: Building2, value: "20+", label: "Company Partners" },
            { icon: Briefcase, value: "9+", label: "Internships Secured '24–'25" },
            { icon: TrendingUp, value: "1", label: "Community. Endless Opportunities." },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon className="text-orange-500 shrink-0 mt-1" size={20} />
              <div>
                <div className="text-xl sm:text-2xl font-black leading-none">{value}</div>
                <div className="text-slate-400 text-xs sm:text-sm mt-1">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- HIGHLIGHTS ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-white/10">
        <div className="flex items-end justify-between mb-8 gap-3 flex-wrap">
          <div>
            <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">On Fire</p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase">What we&apos;ve been up to.</h2>
          </div>
          <a href="/events" className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-sm font-semibold">
            All events <ArrowRight size={14} />
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {highlightSlots.map((h) => (
            <div key={h.id} className="group">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3 border border-white/10">
                <PhotoBlock src={siteImages[h.id]} alt={h.title} className="absolute inset-0 w-full h-full" />
                <span className="absolute top-2.5 left-2.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide bg-orange-500 text-[#0A1240] px-2 py-1 rounded-full">
                  {h.tag}
                </span>
              </div>
              <h3 className="text-sm font-bold mb-1">{h.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{h.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- MISSION TEASER ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-white/10 grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Mission</p>
          <p className="text-xl sm:text-2xl font-black leading-snug uppercase">To increase the number of Black and Latinx students in tech.</p>
          <a href="/board" className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-sm font-semibold mt-4">
            Meet the board <ArrowRight size={14} />
          </a>
        </div>
        {[
          { title: "Community", body: "We build a supportive space where members grow and belong." },
          { title: "Development", body: "We provide resources, workshops, and mentorship to level up." },
          { title: "Opportunity", body: "We connect members to internships, jobs, and career-defining experiences." },
        ].map((item) => (
          <div key={item.title}>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
          </div>
        ))}
      </section>

      {/* ---------------- ROTATING PARTNER BANNER ---------------- */}
      <section className="py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase">Our Partners</p>
          <a href="/sponsors" className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-sm font-semibold">
            Become a sponsor <ArrowRight size={14} />
          </a>
        </div>
        <PartnerMarquee />
      </section>

      <Footer />
    </div>
  );
}
