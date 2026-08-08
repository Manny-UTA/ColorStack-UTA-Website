"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  Instagram,
  Linkedin,
  Mail,
  ArrowRight,
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  GraduationCap,
  Lock,
  Unlock,
  Upload,
  Trash2,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { storage } from "@/lib/storage";

// ---------------------------------------------------------------------------
// Seed data — replace with real records once a database is wired up.
// ---------------------------------------------------------------------------
const SEED_MEMBERS = [
  { email: "manny@uta.edu", name: "Manuel Arellano Jr.", role: "President", duesPaid: true, since: "Fall 2023" },
  { email: "jane.doe@uta.edu", name: "Jane Doe", role: "Member", duesPaid: true, since: "Spring 2025" },
  { email: "alex.rios@uta.edu", name: "Alex Rios", role: "Member", duesPaid: false, since: "Fall 2024" },
];

const SEED_EVENTS = [
  { id: "e1", title: "Fall GBM #1", type: "Chapter Event", date: "2026-09-03", time: "6:00 PM", location: "ERB 125" },
  { id: "e2", title: "Resume Workshop w/ Capital One", type: "Workshop", date: "2026-09-17", time: "5:30 PM", location: "SEIR Auditorium" },
  { id: "e3", title: "JPMorgan Chase Office Tour", type: "Company Visit", date: "2026-10-02", time: "10:00 AM", location: "Dallas, TX" },
  { id: "e4", title: "Mock Technical Interviews", type: "Career Prep", date: "2026-10-15", time: "6:00 PM", location: "ERB 125" },
  { id: "e5", title: "Stacked Up Summit Recap Night", type: "Social", date: "2026-10-28", time: "7:00 PM", location: "Central Library" },
];

const NAV_LINKS = ["About", "Events", "Portal", "Sponsors"];

const PARTNERS = ["Google", "Microsoft", "JPMorgan Chase & Co.", "Bloomberg", "Adobe", "Capital One", "Samsung", "Fidelity"];

const IMAGE_SLOTS = [
  { id: "hero", label: "Hero photo (homepage top)" },
  { id: "highlight1", label: "Highlight — JPMorgan Day in the Life", tag: "Company Visit", title: "JPMorgan Day in the Life", blurb: "Members got an inside look at JPMorgan's Dallas office." },
  { id: "highlight2", label: "Highlight — Bloomberg x ColorStack", tag: "Workshop", title: "Bloomberg x ColorStack", blurb: "Technical skills, real-world insights, real impact." },
  { id: "highlight3", label: "Highlight — Spring GBM", tag: "Chapter Event", title: "Spring GBM", blurb: "Great conversations, new faces, stronger community." },
  { id: "highlight4", label: "Highlight — Stacked Up Summit '26", tag: "Conference", title: "Stacked Up Summit '26", blurb: "Six members. One chapter. San Francisco." },
];

const STRIPE_BG = {
  backgroundImage: "repeating-linear-gradient(135deg, #F97316 0px, #F97316 6px, #FB923C 6px, #FB923C 12px)",
};

// Demo-only passcode — replace with real per-officer auth (Clerk) before
// this handles real member data.
const OFFICER_PASSCODE = "COLORSTACK2026";
const MAX_IMAGE_BYTES = 1.4 * 1024 * 1024;

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

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

function Logomark({ size = 32 }) {
  return <div className="rounded-md shrink-0" style={{ width: size, height: size, ...STRIPE_BG }} aria-hidden="true" />;
}

function PhotoBlock({ src, alt = "", className = "" }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`object-cover ${className}`} />;
  }
  return (
    <div className={`relative flex items-end justify-start bg-gradient-to-br from-[#1B2A6B] via-[#111C4E] to-[#0A1240] ${className}`}>
      <GraduationCap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10" size={64} />
      {alt && <span className="relative z-10 text-[11px] text-slate-400 font-medium px-3 pb-3">{alt} — no photo uploaded yet</span>}
    </div>
  );
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export default function ColorStackUTA() {
  const [members, setMembers] = useState(null);
  const [events, setEvents] = useState(null);
  const [siteImages, setSiteImages] = useState({});
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [lookedUp, setLookedUp] = useState(null);
  const [activeMember, setActiveMember] = useState(null);

  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const fileInputRefs = useRef({});

  useEffect(() => {
    (async () => {
      try {
        await ensureSeeded();
        const [m, e, img] = await Promise.all([
          storage.get("members"),
          storage.get("events"),
          storage.get("siteImages"),
        ]);
        setMembers(JSON.parse(m.value));
        setEvents(JSON.parse(e.value));
        setSiteImages(JSON.parse(img.value));
      } catch (err) {
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

  function handleAdminLogin(e) {
    e.preventDefault();
    if (passcodeInput.trim() === OFFICER_PASSCODE) {
      setAdminUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  }

  async function handleImageUpload(slotId, fileList) {
    const file = fileList?.[0];
    if (!file) return;
    setUploadError("");
    if (file.size > MAX_IMAGE_BYTES) {
      setUploadError(`That image is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Please use one under ~1.4MB.`);
      return;
    }
    setUploadingSlot(slotId);
    try {
      const dataUrl = await fileToDataUrl(file);
      const updated = { ...siteImages, [slotId]: dataUrl };
      const result = await storage.set("siteImages", JSON.stringify(updated));
      if (!result) throw new Error("Storage write failed");
      setSiteImages(updated);
    } catch (err) {
      setUploadError("Upload failed — please try again with a smaller image.");
    } finally {
      setUploadingSlot(null);
    }
  }

  async function handleImageRemove(slotId) {
    setUploadingSlot(slotId);
    try {
      const updated = { ...siteImages };
      delete updated[slotId];
      await storage.set("siteImages", JSON.stringify(updated));
      setSiteImages(updated);
    } catch (err) {
      setUploadError("Couldn't remove that image — please try again.");
    } finally {
      setUploadingSlot(null);
    }
  }

  const highlightSlots = IMAGE_SLOTS.filter((s) => s.id !== "hero");

  return (
    <div className="min-h-screen bg-[#0A1240] text-white antialiased">
      {/* ---------------- NAV ---------------- */}
      <header className="sticky top-0 z-50 bg-[#0A1240] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <Logomark size={30} />
            <span className="font-extrabold text-sm tracking-tight uppercase leading-none">
              ColorStack<span className="text-orange-500"> UTA</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#officer" className="text-slate-400 hover:text-white transition-colors" aria-label="Officer admin login" title="Officer admin login">
              {adminUnlocked ? <Unlock size={17} /> : <Lock size={17} />}
            </a>
            <a href="#" aria-label="Instagram" className="text-slate-300 hover:text-white transition-colors"><Instagram size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="text-slate-300 hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href="#portal" className="hidden sm:inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold text-sm px-4 py-2 rounded-full">
              Get Involved <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="top" className="max-w-7xl mx-auto px-6 pt-16 pb-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">University of Texas at Arlington</p>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.1] mb-6 uppercase">
            <span className="block">We build.</span>
            <span className="block">We connect.</span>
            <span className="block text-orange-500">We ColorStack.</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-md">
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
        <PhotoBlock
          src={siteImages.hero}
          alt="ColorStack UTA members on campus"
          className="w-full rounded-2xl aspect-[4/3] border border-white/10"
        />
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="border-y border-white/10 bg-[#0C1650]">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, value: "400+", label: "Members" },
            { icon: Building2, value: "20+", label: "Company Partners" },
            { icon: Briefcase, value: "9+", label: "Internships Secured '24–'25" },
            { icon: TrendingUp, value: "1", label: "Community. Endless Opportunities." },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon className="text-orange-500 shrink-0 mt-1" size={22} />
              <div>
                <div className="text-2xl font-black leading-none">{value}</div>
                <div className="text-slate-400 text-sm mt-1">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- MEMBER PORTAL ---------------- */}
      <section id="portal" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12">
          <div>
            <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Member Portal</p>
            <h2 className="text-3xl font-black uppercase mb-4 leading-tight">Check your dues status.</h2>
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

            <div className="mt-10">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-4">Upcoming events</h3>
              {loading ? (
                <p className="text-slate-500 text-sm">Loading…</p>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 4).map((ev) => (
                    <div key={ev.id} className="flex items-center justify-between bg-[#111C4E] border border-white/10 rounded-lg px-4 py-3">
                      <div>
                        <div className="text-sm font-semibold">{ev.title}</div>
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

      {/* ---------------- HIGHLIGHTS ---------------- */}
      <section id="events" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="mb-8">
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">On Fire</p>
          <h2 className="text-3xl font-black uppercase">What we&apos;ve been up to.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlightSlots.map((h) => (
            <div key={h.id} className="group">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3 border border-white/10">
                <PhotoBlock src={siteImages[h.id]} alt={h.title} className="absolute inset-0 w-full h-full" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide bg-orange-500 text-[#0A1240] px-2 py-1 rounded-full">
                  {h.tag}
                </span>
              </div>
              <h3 className="text-sm font-bold mb-1">{h.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{h.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- MISSION ---------------- */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10 grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Mission</p>
          <p className="text-2xl font-black leading-snug uppercase">To increase the number of Black and Latinx students in tech.</p>
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

      {/* ---------------- PARTNERS ---------------- */}
      <section id="sponsors" className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">Our Partners</p>
        <div className="flex flex-wrap gap-x-10 gap-y-4 text-lg font-bold text-slate-300">
          {PARTNERS.map((p) => (
            <span key={p} className="opacity-70 hover:opacity-100 transition-opacity">{p}</span>
          ))}
        </div>
        <p className="text-slate-500 text-xs mt-6 max-w-xl">
          Company names shown reflect active partnerships. Trademarked logos require permission to reproduce — swap in official marks only once usage is confirmed with each partner.
        </p>
      </section>

      {/* ---------------- OFFICER ADMIN PORTAL ---------------- */}
      <section id="officer" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="text-orange-400" size={16} />
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase">Officer Admin</p>
        </div>
        <h2 className="text-3xl font-black uppercase mb-4">Manage site photos.</h2>

        {!adminUnlocked ? (
          <form onSubmit={handleAdminLogin} className="max-w-sm">
            <p className="text-slate-400 text-sm mb-4">Officers can enter the admin passcode to upload or replace photos used across the site.</p>
            <div className="flex gap-3">
              <input
                type="password"
                value={passcodeInput}
                onChange={(e) => { setPasscodeInput(e.target.value); setPasscodeError(false); }}
                placeholder="Officer passcode"
                className={`flex-1 bg-[#111C4E] border rounded-full px-4 py-3 text-sm outline-none transition-colors ${passcodeError ? "border-red-500/60" : "border-white/15 focus:border-orange-500"}`}
              />
              <button type="submit" className="bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold px-5 py-3 rounded-full text-sm shrink-0">
                Unlock
              </button>
            </div>
            {passcodeError && <p className="text-red-400 text-xs mt-2">That passcode isn&apos;t right — check with your board for the current one.</p>}
            <p className="text-slate-600 text-[11px] mt-4">
              Demo note: this is a shared passcode for prototyping only, and photos only save to your own browser until this is wired to a real database. Swap this for real per-officer accounts (e.g. Clerk auth) before handling real member data.
            </p>
          </form>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-6">
              <Unlock size={15} /> Admin unlocked.
            </div>
            {uploadError && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg p-3 max-w-lg">{uploadError}</div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {IMAGE_SLOTS.map((slot) => (
                <div key={slot.id} className="bg-[#111C4E] border border-white/10 rounded-xl p-4">
                  <div className="relative rounded-lg overflow-hidden aspect-[4/3] mb-3 border border-white/10">
                    <PhotoBlock src={siteImages[slot.id]} alt={slot.label} className="absolute inset-0 w-full h-full" />
                    {uploadingSlot === slot.id && (
                      <div className="absolute inset-0 bg-[#0A1240]/70 flex items-center justify-center">
                        <Loader2 className="animate-spin text-orange-400" size={22} />
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-semibold mb-3 leading-snug">{slot.label}</p>
                  <input
                    ref={(el) => (fileInputRefs.current[slot.id] = el)}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(slot.id, e.target.files)}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[slot.id]?.click()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold text-xs px-3 py-2 rounded-full"
                    >
                      <Upload size={13} /> {siteImages[slot.id] ? "Replace" : "Upload"}
                    </button>
                    {siteImages[slot.id] && (
                      <button
                        type="button"
                        onClick={() => handleImageRemove(slot.id)}
                        className="inline-flex items-center justify-center gap-1 border border-white/15 hover:border-red-500/50 hover:text-red-400 transition-colors text-xs px-3 py-2 rounded-full"
                        aria-label={`Remove photo for ${slot.label}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-[11px] mt-6 max-w-lg">
              Keep photos under ~1.4MB each (compress at squoosh.app if needed).
            </p>
          </div>
        )}
      </section>

      {/* ---------------- NEWSLETTER / FOOTER ---------------- */}
      <section className="bg-[#0C1650] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-1">Stay Connected</p>
            <h3 className="text-xl font-black uppercase">Don&apos;t miss what&apos;s next.</h3>
          </div>
          <form className="flex w-full md:w-auto gap-3" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 md:w-72 bg-[#111C4E] border border-white/15 focus:border-orange-500 outline-none rounded-full px-4 py-3 text-sm placeholder:text-slate-500" />
            <button className="bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold px-5 py-3 rounded-full text-sm inline-flex items-center gap-1.5 shrink-0">
              Join List <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2026 ColorStack UTA. All rights reserved.</span>
          <span>We Code. We Connect. We Cultivate.</span>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-slate-300 transition-colors"><Instagram size={15} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-slate-300 transition-colors"><Linkedin size={15} /></a>
            <a href="#" aria-label="Email" className="hover:text-slate-300 transition-colors"><Mail size={15} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
