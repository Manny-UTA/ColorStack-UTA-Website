"use client";

import { useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { SPONSORS } from "@/lib/sponsors";

export default function SponsorBanner() {
  const [paused, setPaused] = useState(false);
  if (!SPONSORS.length) return null;
  return (
    <><section className="cs-sponsors" aria-labelledby="sponsor-banner-title">
      <div className="cs-shell cs-sponsor-heading">
        <h2 id="sponsor-banner-title" className="cs-eyebrow">Our annual sponsors</h2>
        <div className="cs-sponsor-controls">
          <a className="cs-text-link" href="/sponsors">Partner with us <ArrowUpRight size={14} /></a>
          <button type="button" className="cs-sponsor-pause" onClick={() => setPaused(p => !p)} aria-label={paused ? "Resume sponsor banner" : "Pause sponsor banner"} aria-pressed={paused}>
            {paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? "Resume" : "Pause"}</span>
          </button>
        </div>
      </div>
      <div className="cs-sponsor-window" data-paused={paused}>
        <div className="cs-sponsor-track">
          <ul className="cs-sponsor-group" aria-label="Annual sponsors">{SPONSORS.map(sponsor => <li key={sponsor.name}>{sponsor.name}<span className="cs-sponsor-tier">{sponsor.tier}</span></li>)}</ul>
          <ul className="cs-sponsor-group cs-sponsor-copy" aria-hidden="true">{SPONSORS.map(sponsor => <li key={sponsor.name}>{sponsor.name}<span className="cs-sponsor-tier">{sponsor.tier}</span></li>)}</ul>
        </div>
      </div>
    </section><section className="cs-network cs-shell" aria-labelledby="network-title"><h2 id="network-title" className="cs-eyebrow">Companies we’ve worked with</h2><ul>{["Microsoft","Bloomberg","JPMorganChase","Fidelity Investments","AT&T","Wells Fargo","Toyota","Ericsson","Southwest Airlines","Verizon","Capital One"].map(name=><li key={name}>{name}</li>)}</ul><p>Industry connections through chapter experiences. Annual sponsors are recognized above.</p></section></>
  );
}
