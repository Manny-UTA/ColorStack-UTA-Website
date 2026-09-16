"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Pinstripe from "@/components/Pinstripe";
import { storage } from "@/lib/storage";
import { PARTNERS, SPONSORED_EVENTS, PARTNER_WORKSHOPS, SPONSOR_BENEFITS } from "@/lib/content";

function SponsorForm() {
  const [form, setForm] = useState({ company: "", name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      let existing = [];
      try {
        const raw = await storage.get("sponsorLeads");
        existing = typeof raw.value === "string" ? JSON.parse(raw.value) : raw.value;
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
      <div className="bg-white border border-navy/15 rounded-sm p-8 text-center">
        <CheckCircle2 className="text-navy mx-auto mb-3" size={26} />
        <h3 className="font-serif font-bold text-lg mb-1 text-navy">Thanks — we'll be in touch.</h3>
        <p className="text-[#6B6A64] text-sm">We'll follow up with a proposal tailored to your goals.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-navy/10 rounded-sm p-6 sm:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sponsor-company" className="text-xs font-semibold text-navy/60 mb-1.5 block">Company</label>
          <input required id="sponsor-company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full bg-cream border border-navy/15 focus:border-brass outline-none rounded-sm whitespace-nowrap px-3.5 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="sponsor-name" className="text-xs font-semibold text-navy/60 mb-1.5 block">Your name</label>
          <input required id="sponsor-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-cream border border-navy/15 focus:border-brass outline-none rounded-sm whitespace-nowrap px-3.5 py-2.5 text-sm" />
        </div>
      </div>
      <div>
        <label htmlFor="sponsor-email" className="text-xs font-semibold text-navy/60 mb-1.5 block">Email</label>
        <input type="email" required id="sponsor-email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-cream border border-navy/15 focus:border-brass outline-none rounded-sm whitespace-nowrap px-3.5 py-2.5 text-sm" />
      </div>
      <div>
        <label htmlFor="sponsor-message" className="text-xs font-semibold text-navy/60 mb-1.5 block">What are you looking to do?</label>
        <textarea rows={4} id="sponsor-message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Workshop, hackathon sponsorship, recruiting event, etc." className="w-full bg-cream border border-navy/15 focus:border-brass outline-none rounded-sm whitespace-nowrap px-3.5 py-2.5 text-sm resize-none" />
      </div>
      {status === "error" && <p className="text-red-700 text-xs">Something went wrong — please try again.</p>}
      <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 bg-navy text-cream font-bold uppercase tracking-wide text-xs px-6 py-3 rounded-sm whitespace-nowrap disabled:opacity-60">
        {status === "sending" ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
        {status === "sending" ? "Sending…" : "Get in Touch"}
      </button>
    </form>
  );
}

export default function Sponsors() {
  return (
    <div className="min-h-screen font-sans">
      <Nav />
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-10 text-center">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-4">Partner With Us</p>
        <h1 className="font-serif text-3xl sm:text-5xl leading-tight mb-6 text-navy">Help talent take its next step.</h1>
        <p className="text-[#4A4A44] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Connect with Black and Latinx technical talent at UT Arlington through hands-on learning, candid career conversations, and chapter support.
        </p>
      </section>

      <Pinstripe />

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
        <h2 className="font-serif text-xl sm:text-2xl mb-6 text-center text-navy">Why partner with us?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {SPONSOR_BENEFITS.map((b) => (
            <div key={b} className="flex items-start gap-3 bg-white border border-navy/10 rounded-sm p-4">
              <CheckCircle2 className="text-brass shrink-0 mt-0.5" size={17} />
              <p className="text-sm text-[#4A4A44] leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <Pinstripe />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">What You'd Be Part Of</p>
        <h2 className="font-serif text-2xl sm:text-3xl mb-8 text-navy">Ways to work together.</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {SPONSORED_EVENTS.map((ev) => (
            <div key={ev.title} className="bg-white border border-navy/10 rounded-sm p-5">
              <h3 className="font-bold text-base mb-2 text-navy">{ev.title}</h3>
              <p className="text-[#6B6A64] text-sm leading-relaxed">{ev.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">Inside a chapter workshop</p>
        <h2 className="font-serif text-3xl mb-4">Southwest Airlines × ColorStack UTA</h2>
        <p className="text-navy/70 text-sm max-w-xl leading-relaxed mb-7">A look at our corporate workshop on early-career technology opportunities.</p>
        <div className="grid md:grid-cols-2 gap-5">
          <figure><img src="/images/southwest-group.png" alt="Chapter members gathered at the Southwest Airlines corporate workshop" className="w-full aspect-[4/3] object-contain bg-navy/[0.03] rounded-sm" /><figcaption className="text-xs text-navy/70 mt-3">Together after the workshop.</figcaption></figure>
          <figure><img src="/images/southwest-workshop.png" alt="Attendees listening to a presentation on early-career technology opportunities at Southwest Airlines" className="w-full aspect-[4/3] object-cover rounded-sm" /><figcaption className="text-xs text-navy/70 mt-3">Exploring early-career technology opportunities.</figcaption></figure>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 border-t border-navy/10">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3">From Our Community</p>
        <h2 className="font-serif text-2xl sm:text-3xl mb-8 text-navy">Partner-led workshops.</h2>
        <div className="space-y-4">
          {PARTNER_WORKSHOPS.map((w) => (
            <div key={w.title} className="bg-white border border-navy/10 rounded-sm p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wide bg-brass/15 text-brass px-2.5 py-1 rounded-sm whitespace-nowrap">{w.company}</span>
                <span className="text-xs text-navy/40">{w.date}</span>
              </div>
              <h3 className="font-bold text-base mb-2 text-navy">{w.title}</h3>
              <p className="text-[#6B6A64] text-sm leading-relaxed">{w.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <Pinstripe />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-6">Our Partners</p>
        <div className="flex flex-wrap gap-x-10 gap-y-4 text-base sm:text-lg font-serif font-bold text-navy/70">
          {PARTNERS.map((p) => <span key={p}>{p}</span>)}
        </div>
        <p className="text-navy/40 text-xs mt-6 max-w-xl">
          Interested in working together? Tell us what your team would like to contribute.
        </p>
      </section>

      <section id="sponsor-form" className="max-w-2xl mx-auto px-5 sm:px-8 py-16 border-t border-navy/10 scroll-mt-24">
        <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase mb-3 text-center">Let's Work Together</p>
        <h2 className="font-serif text-2xl sm:text-3xl mb-4 text-center text-navy">Get in touch.</h2>
        <p className="text-[#4A4A44] text-sm text-center leading-relaxed mb-8">
          Fill out the form below and we'll get back to you with a customized proposal.
        </p>
        <SponsorForm />
      </section>

      <Footer />
    </div>
  );
}
