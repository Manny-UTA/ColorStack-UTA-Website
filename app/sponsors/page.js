"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Pinstripe from "@/components/Pinstripe";
import { SPONSORS, SPONSOR_TIERS } from "@/lib/sponsors";

function SponsorForm() {
  const [form, setForm] = useState({ company: "", name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/sponsor-inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error("Submission failed");
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
        <textarea rows={4} id="sponsor-message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Workshop, hackathon sponsorship, recruiting event, etc." className="w-full bg-cream border border-navy/15 focus:border-brass outline-none rounded-sm px-3.5 py-2.5 text-sm resize-none" />
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
    <div className="min-h-screen font-sans text-navy">
      <Nav />
      <main>
        <section className="cs-shell cs-section cs-partner-hero">
          <p className="cs-eyebrow text-brass">Partnerships / ColorStack UTA</p>
          <h1 className="cs-display">Invest in talent.<br /><em>Build what’s next.</em></h1>
          <p className="cs-intro">Connect with Black and Latinx technical talent at UT Arlington. Support the workshops, career conversations, and community that help students take their next step.</p>
          <div className="cs-actions"><a href="#annual-partnerships" className="cs-button">Explore partnerships <ArrowRight size={15} /></a><a href="#sponsor-form" className="cs-text-link">Let’s talk <ArrowRight size={14} /></a></div>
        </section>
        <Pinstripe />
        <section className="cs-shell cs-section">
          <div className="cs-section-heading"><div><p className="cs-eyebrow text-brass">Our annual sponsors</p><h2>Partners in <em>possibility.</em></h2></div><p>Thank you to the teams investing in our chapter and the people building its future.</p></div>
          <div className="cs-featured-sponsors">{SPONSORS.map((sponsor, index) => <article key={sponsor.name} className={`cs-featured-sponsor ${index === 0 ? 'cs-featured-sponsor-dark' : ''}`}><p className="cs-eyebrow whitespace-nowrap">{sponsor.tier}</p><h3>{sponsor.name}</h3><div className="cs-sponsor-signoff"><span>ColorStack UTA</span><span>Annual partnership</span></div></article>)}</div>
        </section>
        <section id="annual-partnerships" className="cs-partnership-band">
          <div className="cs-shell cs-section">
            <div className="cs-section-heading"><div><p className="cs-eyebrow text-brass">Annual investment</p><h2>Four ways to <em>make an impact.</em></h2></div><p>Every sponsorship is annual. Each level builds on the benefits of the partnership below it.</p></div>
            <div className="cs-tier-grid">{SPONSOR_TIERS.map((tier, index) => <article className="cs-tier-card" key={tier.name}><p className="cs-eyebrow text-brass">0{index + 1} / Partnership</p><h3>{tier.name}</h3><p className="cs-tier-price">{tier.amount}<span> / year</span></p><p className="cs-tier-inherits">{tier.inherits ? `All ${tier.inherits} benefits, plus:` : 'A foundation for community connection.'}</p><ul>{tier.benefits.map(benefit => <li key={benefit}><CheckCircle2 size={16} aria-hidden="true" /><span>{benefit}</span></li>)}</ul><a href={`mailto:colorstackuta@gmail.com?subject=${encodeURIComponent(`${tier.name} inquiry`)}`} className="cs-text-link">Discuss this partnership <ArrowRight size={14} /></a></article>)}</div>
          </div>
        </section>
        <section className="cs-shell cs-section">
          <div className="cs-section-heading"><div><p className="cs-eyebrow text-brass">Inside a chapter workshop</p><h2>Real conversations.<br /><em>New possibilities.</em></h2></div><p>Our Southwest Airlines corporate workshop explored early-career technology opportunities.</p></div>
          <div className="grid md:grid-cols-2 gap-5"><figure><img src="/images/southwest-group.png" alt="ColorStack UTA members gathered after the Southwest Airlines workshop" className="w-full aspect-[4/3] object-contain bg-navy/[0.03]" loading="lazy" /><figcaption className="text-xs mt-3 text-navy/70">Together after the workshop.</figcaption></figure><figure><img src="/images/southwest-workshop.png" alt="Students attending the Southwest Airlines early-career technology presentation" className="w-full aspect-[4/3] object-cover" loading="lazy" /><figcaption className="text-xs mt-3 text-navy/70">Exploring what comes next.</figcaption></figure></div>
        </section>
        <Pinstripe />
        <section id="sponsor-form" className="cs-shell cs-section cs-partner-contact">
          <div><p className="cs-eyebrow text-brass">Let’s work together</p><h2>A partnership<br /><em>built around you.</em></h2><p className="cs-intro mt-6">Looking for something different? Tell us your company’s goals and we’ll explore a partnership that fits.</p><a className="cs-text-link mt-6" href="mailto:colorstackuta@gmail.com">colorstackuta@gmail.com <ArrowRight size={14} /></a></div>
          <SponsorForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
