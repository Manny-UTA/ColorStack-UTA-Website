"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { storage } from "@/lib/storage";
import { PARTNERS, SPONSORED_EVENTS, PARTNER_WORKSHOPS, SPONSOR_BENEFITS } from "@/lib/content";

function SponsorForm() {
  const [form, setForm] = useState({ company: "", name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      let existing = [];
      try {
        const raw = await storage.get("sponsorLeads");
        existing = JSON.parse(raw.value);
      } catch {
        existing = [];
      }
      const updated = [...existing, { ...form, submittedAt: new Date().toISOString() }];
      await storage.set("sponsorLeads", JSON.stringify(updated));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-[#111C4E] border border-green-500/30 rounded-2xl p-8 text-center">
        <CheckCircle2 className="text-green-400 mx-auto mb-3" size={28} />
        <h3 className="font-bold text-lg mb-1">Thanks — we&apos;ll be in touch.</h3>
        <p className="text-slate-400 text-sm">We&apos;ll follow up with a proposal tailored to your goals.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#111C4E] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Company</label>
          <input
            required
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full bg-[#0A1240] border border-white/15 focus:border-orange-500 outline-none rounded-lg px-3.5 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Your name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-[#0A1240] border border-white/15 focus:border-orange-500 outline-none rounded-lg px-3.5 py-2.5 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-[#0A1240] border border-white/15 focus:border-orange-500 outline-none rounded-lg px-3.5 py-2.5 text-sm"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1.5 block">What are you looking to do?</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Workshop, hackathon sponsorship, recruiting event, etc."
          className="w-full bg-[#0A1240] border border-white/15 focus:border-orange-500 outline-none rounded-lg px-3.5 py-2.5 text-sm resize-none"
        />
      </div>
      {status === "error" && <p className="text-red-400 text-xs">Something went wrong — please try again.</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 transition-colors text-[#0A1240] font-bold px-6 py-3 rounded-full text-sm"
      >
        {status === "sending" ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
        {status === "sending" ? "Sending…" : "Get in Touch"}
      </button>
    </form>
  );
}

export default function Sponsors() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* ---------------- PITCH ---------------- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10 text-center">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">Partner With Us</p>
        <h1 className="text-3xl sm:text-5xl font-black uppercase leading-tight mb-6">Join our sponsor program.</h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Partner with us to make a lasting impact on the future of Black and Latinx Computer Science students.
        </p>
      </section>

      {/* ---------------- WHY PARTNER ---------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-xl sm:text-2xl font-black uppercase mb-6 text-center">Why partner with us?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {SPONSOR_BENEFITS.map((b) => (
            <div key={b} className="flex items-start gap-3 bg-[#111C4E] border border-white/10 rounded-xl p-4">
              <CheckCircle2 className="text-orange-500 shrink-0 mt-0.5" size={17} />
              <p className="text-sm text-slate-300 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SPONSORED EVENTS ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">What You&apos;d Be Part Of</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-8">Sponsored events.</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {SPONSORED_EVENTS.map((ev) => (
            <div key={ev.title} className="bg-[#111C4E] border border-white/10 rounded-xl p-5">
              <h3 className="font-bold text-base mb-2">{ev.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{ev.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- PARTNER-LED WORKSHOPS ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Recent Partnerships</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-8">Partner-led workshops.</h2>
        <div className="space-y-4">
          {PARTNER_WORKSHOPS.map((w) => (
            <div key={w.title} className="bg-[#111C4E] border border-white/10 rounded-xl p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wide bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full">{w.company}</span>
                <span className="text-xs text-slate-500">{w.date}</span>
              </div>
              <h3 className="font-bold text-base mb-2">{w.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{w.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CURRENT PARTNERS ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 border-t border-white/10">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">Our Partners</p>
        <div className="flex flex-wrap gap-x-8 sm:gap-x-10 gap-y-4 text-base sm:text-lg font-bold text-slate-300">
          {PARTNERS.map((p) => (
            <span key={p} className="opacity-70 hover:opacity-100 transition-opacity">{p}</span>
          ))}
        </div>
        <p className="text-slate-500 text-xs mt-6 max-w-xl">
          Company names shown reflect active partnerships. Trademarked logos require permission to reproduce — swap in official marks only once usage is confirmed with each partner.
        </p>
      </section>

      {/* ---------------- CONTACT FORM ---------------- */}
      <section id="sponsor-form" className="max-w-2xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10 scroll-mt-24">
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 text-center">Let&apos;s Work Together</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 text-center">Get in touch.</h2>
        <p className="text-slate-300 text-sm text-center leading-relaxed mb-8">
          Fill out the form below and we&apos;ll get back to you with a customized proposal that fits your needs.
        </p>
        <SponsorForm />
      </section>

      <Footer />
    </div>
  );
}
