"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  Calendar,
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PhotoBlock from "@/components/PhotoBlock";
import { storage } from "@/lib/storage";
import { SEED_MEMBERS, SEED_EVENTS, IMAGE_SLOTS, PARTNERS, STRIPE_BG } from "@/lib/content";

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

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function Home() {
  const [members, setMembers] = useState(null);
  const [events, setEvents] = useState(null);
  const [siteImages, setSiteImages] = useState({});
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [lookedUp, setLookedUp] = useState(null);
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await ensureSeeded();
        const [m, e, img] = await Promise.all([
          storage.get("members"),
          storage.get("events"),
          storage.get("siteImages"),
        ]);
        setMembers(m.value);
        setEvents(e.value);
        setSiteImages(img.value);
      } catch {
        setMembers(SEED_MEMBERS);
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

  function handleLookup(e) {
    e.preventDefault();
    if (!members) return;
    const found = members.find((m) => m.email.toLowerCase() === email.trim().toLowerCase());
    if (found) {
      setActiveMember(found);
      setLookedUp("found");
    } else {
      setActiveMember(null);
      setLookedUp("notfound");
    }
  }

  const highlightSlots = IMAGE_SLOTS.filter((s) => s.id !== "hero");

  return (
    <div className="min-h-screen">
      <Nav />

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
            <a href="#portal" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold px-6 py-3 rounded-full">
              Get Involved <ArrowRight size={16} />
            </a>
            <a href="#events" className="inline-flex items-center gap-2 border border-white/25 hover:border-white/60 transition-colors font-semibold px-6 py-3 rounded-full">
              Explore Events
            </a>
          </div>
        </div>
        <PhotoBlock src={siteImages.hero} alt="ColorStack UTA members on campus" className="w-full rounded-2xl aspect-[4/3] border border-white/10" />
      </section>

      <section className="border-y border-white/10 bg-[#0C1650]">
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

      <section id="portal" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 sm:gap-12">
          <div>
            <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Member Portal</p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 leading-tight">Check your dues status.</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Look up your membership with the email you used to sign up. You&apos;ll see whether your dues are paid for this semester — we&apos;ll also check at the door for events.
            </p>
            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  placeholder="you@mavs.uta.edu"
                  className="w-full bg-[#111C4E] border border-white/15 focus:border-orange-500 outline-none rounded-full pl-10 pr-4 py-3 text-sm placeholder:text-slate-500 transition-colors"
                />
              </div>
              <button type="submit" className="bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold px-6 py-3 rounded-full text-sm shrink-0">
                Check Status
              </button>
            </form>
            <p className="text-slate-500 text-xs mt-3">
              Try <span className="text-slate-300">manny@uta.edu</span> (paid) or <span className="text-slate-300">alex.rios@uta.edu</span> (unpaid) to see it in action.
            </p>

            {lookedUp === "notfound" && (
              <div className="mt-6 flex items-start gap-3 bg-[#111C4E] border border-white/10 rounded-xl p-4">
                <XCircle className="text-slate-400 shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-slate-300">We couldn&apos;t find that email on file. Double-check it, or if you&apos;re new here, joining takes two minutes.</p>
              </div>
            )}

            <div id="events" className="mt-10 scroll-mt-24">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-4">Upcoming events</h3>
              {loading ? (
                <p className="text-slate-500 text-sm">Loading…</p>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 4).map((ev) => (
                    <div key={ev.id} className="flex items-center justify-between gap-3 bg-[#111C4E] border border-white/10 rounded-lg px-4 py-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">{ev.title}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Calendar size={12} /> {formatDate(ev.date)} · {ev.time}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full shrink-0">{ev.type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start justify-center pt-2">
            {lookedUp === "found" && activeMember ? (
              <div className={`w-full max-w-sm rounded-2xl p-6 relative overflow-hidden border ${activeMember.duesPaid ? "border-green-500/40" : "border-slate-500/40"} bg-[#111C4E]`}>
                <div className="absolute top-0 left-0 right-0 h-1.5" style={STRIPE_BG} />
                <div className="flex items-center justify-between mb-8 mt-2">
                  <span className="font-black text-xs tracking-tight uppercase">
                    ColorStack<span className="text-orange-500"> UTA</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${activeMember.duesPaid ? "bg-green-500/15 text-green-400" : "bg-slate-500/15 text-slate-400"}`}>
                    {activeMember.duesPaid ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                    {activeMember.duesPaid ? "Dues Paid — Fall 2026" : "Dues Unpaid"}
                  </span>
                </div>
                <div className="mb-1 text-2xl font-black leading-tight">{activeMember.name}</div>
                <div className="text-orange-400 font-semibold text-sm mb-6">{activeMember.role}</div>
                <div className="flex justify-between items-end text-xs text-slate-400 border-t border-white/10 pt-4">
                  <span>Member since {activeMember.since}</span>
                  <span className="tracking-widest">#{activeMember.email.split("@")[0].slice(0, 6).toUpperCase()}</span>
                </div>
                {!activeMember.duesPaid && (
                  <p className="mt-4 text-xs text-slate-400 bg-[#0A1240] rounded-lg p-3">
                    Dues aren&apos;t marked paid yet. Pay at the next GBM or event check-in — an officer will update your status.
                  </p>
                )}
              </div>
            ) : (
              <div className="w-full max-w-sm rounded-2xl p-6 border border-dashed border-white/15 bg-[#111C4E]/50 text-center">
                <div className="w-10 h-10 rounded-md mx-auto mb-4 opacity-60" style={STRIPE_BG} />
                <p className="text-slate-400 text-sm">Your dues card will appear here once you check your status.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-white/10">
        <div className="mb-8">
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">On Fire</p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase">What we&apos;ve been up to.</h2>
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-white/10 grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Mission</p>
          <p className="text-xl sm:text-2xl font-black leading-snug uppercase">To increase the number of Black and Latinx students in tech.</p>
          <a href="/about" className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-sm font-semibold mt-4">
            Meet the team <ArrowRight size={14} />
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 border-t border-white/10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase">Our Partners</p>
          <a href="/sponsors" className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-sm font-semibold">
            Become a sponsor <ArrowRight size={14} />
          </a>
        </div>
        <div className="flex flex-wrap gap-x-8 sm:gap-x-10 gap-y-4 text-base sm:text-lg font-bold text-slate-300">
          {PARTNERS.map((p) => (
            <span key={p} className="opacity-70 hover:opacity-100 transition-opacity">{p}</span>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
