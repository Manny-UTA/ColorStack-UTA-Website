"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, CheckCircle2, XCircle, Calendar, Trophy } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { storage } from "@/lib/storage";
import { SEED_MEMBERS, SEED_EVENTS, STRIPE_BG } from "@/lib/content";

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

// Shows first name + last initial only — keeps the leaderboard fun without
// publishing every member's full name and attendance count to anyone who visits.
function displayName(fullName) {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
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
        const [m, e] = await Promise.all([storage.get("members"), storage.get("events")]);
        setMembers(JSON.parse(m.value));
        setEvents(JSON.parse(e.value));
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

  const leaderboard = useMemo(() => {
    if (!members) return [];
    return [...members].sort((a, b) => (b.attendance || 0) - (a.attendance || 0)).slice(0, 5);
  }, [members]);

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
    <div className="min-h-screen">
      <Nav />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-6 text-center">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Member Portal</p>
        <h1 className="text-3xl sm:text-5xl font-black uppercase leading-tight mb-4">Check your status.</h1>
        <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
          Look up your dues status, see what&apos;s coming up, and check the leaderboard for who&apos;s shown up the most this semester.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-[1fr_1.1fr] gap-10">
        <div>
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

          <div className="mt-10">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-4 flex items-center gap-2">
              <Trophy size={15} className="text-orange-400" /> Most involved this semester
            </h3>
            {loading ? (
              <p className="text-slate-500 text-sm">Loading…</p>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((m, i) => (
                  <div key={m.email} className="flex items-center justify-between bg-[#111C4E] border border-white/10 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-orange-400 font-black text-sm w-4">{i + 1}</span>
                      <span className="text-sm font-semibold">{displayName(m.name)}</span>
                    </div>
                    <span className="text-xs text-slate-400">{m.attendance || 0} events</span>
                  </div>
                ))}
              </div>
            )}
            <p className="text-slate-600 text-[11px] mt-3">Names shown are first name + last initial only.</p>
          </div>
        </div>

        <div>
          <div className="flex items-start justify-center pt-2 mb-10">
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
                <div className="text-orange-400 font-semibold text-sm mb-4">{activeMember.role}</div>
                <div className="text-sm text-slate-300 mb-6">
                  <span className="font-bold text-white">{activeMember.attendance || 0}</span> events attended this semester
                </div>
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

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-4">Upcoming events</h3>
            {loading ? (
              <p className="text-slate-500 text-sm">Loading…</p>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((ev) => (
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
      </section>
      <Footer />
    </div>
  );
}
