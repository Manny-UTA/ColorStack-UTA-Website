"use client";

import { useState, useEffect, useMemo } from "react";
import { Calendar, Clock, MapPin, CalendarPlus } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { storage } from "@/lib/storage";
import { SEED_EVENTS } from "@/lib/content";

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export default function EventsPage() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const e = await storage.get("events");
        setEvents(JSON.parse(e.value));
      } catch {
        setEvents(SEED_EVENTS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sorted = useMemo(() => {
    if (!events) return [];
    return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events]);

  return (
    <div className="min-h-screen">
      <Nav />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10 text-center">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">What's Next</p>
        <h1 className="text-3xl sm:text-5xl font-black uppercase leading-tight mb-6">All events.</h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
          Chapter events, company visits, workshops, and socials — everything on the calendar this semester.
        </p>
        <a
          href="https://calendar.google.com/calendar/u/0/r?cid=your_calendar_id"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-white/25 hover:border-white/60 transition-colors font-semibold px-6 py-3 rounded-full text-sm"
        >
          <CalendarPlus size={16} /> Subscribe to Our Calendar
        </a>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {loading ? (
          <p className="text-slate-400 text-sm text-center">Loading…</p>
        ) : (
          <div className="space-y-3">
            {sorted.map((ev) => (
              <div key={ev.id} className="bg-[#111C4E] border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full mb-2">
                    {ev.type}
                  </span>
                  <h3 className="font-bold text-base mb-1">{ev.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(ev.date)}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {ev.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={12} /> {ev.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
