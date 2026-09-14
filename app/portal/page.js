"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Calendar, CheckCircle2, XCircle } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Pinstripe from "@/components/Pinstripe";
import { storage } from "@/lib/storage";
import { SEED_MEMBERS, SEED_EVENTS } from "@/lib/content";

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
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function PortalPage() {
  const [members, setMembers] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [lookedUp, setLookedUp] = useState(null);
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await ensureSeeded();
        const [m, e] = await Promise.all([storage.get("members"), storage.get("events")]);
        setMembers(typeof m.value === "string" ? JSON.parse(m.value) : m.value);
        setEvents(typeof e.value === "string" ? JSON.parse(e.value) : e.value);
      } catch {
        setMembers(SEED_MEMBERS);
        setEvents(SEED_EVENTS);
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

  return (
    <div className="min-h-screen font-sans">
      <Nav />

      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-10 text-center">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-4">Member Portal</p>
        <h1 className="font-serif text-3xl sm:text-5xl leading-tight text-navy">Check your dues status.</h1>
      </section>

      <Pinstripe />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12">
          <div>
            <p className="text-[#4A4A44] leading-relaxed mb-7">
              Look up your membership with the email you used to sign up. We'll also check at the door for events.
            </p>
            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  placeholder="you@mavs.uta.edu"
                  className="w-full bg-white border border-navy/20 focus:border-brass outline-none rounded-sm pl-10 pr-4 py-3 text-sm placeholder:text-navy/35"
                />
              </div>
              <button type="submit" className="bg-navy text-cream font-bold uppercase tracking-wide text-xs px-6 py-3 rounded-sm shrink-0 whitespace-nowrap">
                Check Status
              </button>
            </form>
            <p className="text-navy/45 text-xs mt-3">
              Try <span className="text-navy/70">manny@uta.edu</span> (paid) or <span className="text-navy/70">alex.rios@uta.edu</span> (unpaid).
            </p>

            {lookedUp === "notfound" && (
              <div className="mt-6 flex items-start gap-3 bg-white border border-navy/15 rounded-sm p-4">
                <XCircle className="text-navy/40 shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-[#4A4A44]">We couldn't find that email. Double-check it, or if you're new, joining takes two minutes.</p>
              </div>
            )}

            <div className="mt-10">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy/50 mb-4">Upcoming events</h3>
              {loading ? (
                <p className="text-navy/40 text-sm">Loading…</p>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 4).map((ev) => (
                    <div key={ev.id} className="flex items-center justify-between gap-3 bg-white border border-navy/10 rounded-sm px-4 py-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-navy truncate">{ev.title}</div>
                        <div className="text-xs text-navy/50 flex items-center gap-1.5 mt-0.5">
                          <Calendar size={12} /> {formatDate(ev.date)} · {ev.time}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-brass bg-brass/10 px-2 py-1 rounded-sm shrink-0">{ev.type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start justify-center pt-2">
            {lookedUp === "found" && activeMember ? (
              <div className="w-full max-w-sm rounded-sm p-6 relative overflow-hidden border border-navy/15 bg-white">
                <Pinstripe className="absolute top-0 left-0 right-0" />
                <div className="flex items-center justify-between mb-8 mt-2">
                  <span className="font-serif font-bold text-sm text-navy">ColorStack UTA</span>
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase px-3 py-1 rounded-sm ${activeMember.duesPaid ? "bg-green-700/10 text-green-800" : "bg-navy/10 text-navy/60"}`}>
                    {activeMember.duesPaid ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {activeMember.duesPaid ? "Dues Paid" : "Dues Unpaid"}
                  </span>
                </div>
                <div className="mb-1 text-xl font-serif font-bold text-navy">{activeMember.name}</div>
                <div className="text-brass font-semibold text-sm mb-6">{activeMember.role}</div>
                <div className="flex justify-between items-end text-xs text-navy/45 border-t border-navy/10 pt-4">
                  <span>Member since {activeMember.since}</span>
                  <span className="tracking-widest">#{activeMember.email.split("@")[0].slice(0, 6).toUpperCase()}</span>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-sm rounded-sm p-6 border border-dashed border-navy/20 bg-white/50 text-center">
                <p className="text-navy/40 text-sm">Your dues card will appear here once you check your status.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
