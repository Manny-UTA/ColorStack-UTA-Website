import AboutFrame from "@/components/AboutFrame";
import { aboutMetadata } from "@/lib/about";
import { NATIONAL } from "@/lib/national";
import "../about.css";
export const metadata = aboutMetadata("ColorStack National | ColorStack UTA", "Your community starts at UTA. Expand your connections through ColorStack National’s students, programs, and industry network.", "/about/national");
export default function Page() {
  return <AboutFrame current="/about/national" finalCta={<section className="cs-shell cs-section cs-final-cta"><p className="cs-eyebrow">GO BEYOND ARLINGTON</p><h2>Your network<br/><em>just got bigger.</em></h2><p className="about-body national-join-copy">Keep your community at UTA. Apply to ColorStack National to connect beyond campus. National membership has its own application and eligibility requirements.</p><div className="cs-actions"><a href={NATIONAL.joinUrl} target="_blank" rel="noreferrer" className="cs-button">Join ColorStack National ↗</a><a href="/portal" className="cs-text-link">Join ColorStack UTA →</a></div></section>}>
    <section className="cs-shell cs-section national-intro">
      <div className="national-hero">
        <header><p className="cs-eyebrow">YOUR CAMPUS IS THE START</p><h1 className="cs-display">One chapter.<br/><em>A national network.</em></h1><p className="about-body">ColorStack UTA is your community in Arlington—the people you learn with, build with, and grow alongside. ColorStack National expands that circle to students, programs, and companies far beyond campus.</p><p className="national-mission">A shared mission: helping Black and Latinx computer science students build rewarding careers in tech.</p></header>
        <aside className="national-partners" aria-label="ColorStack National partner network"><p className="cs-eyebrow">ACROSS THE NATIONAL NETWORK</p>{[NATIONAL.partners.slice(0,3),NATIONAL.partners.slice(3)].map((band,index)=><div className="national-logo-band" key={index}>{band.map(partner=><div className="national-logo" key={partner.name}><svg viewBox={partner.viewBox} role="img" aria-label={partner.name} style={{width:`${partner.opticalWidth}%`}}><image href={partner.logo} width={partner.imageWidth} height={partner.imageHeight}/></svg></div>)}</div>)}<p className="national-note">Selected ColorStack National partners. National partnerships do not imply sponsorship of ColorStack UTA. <a href="/sponsors">Meet our local sponsors →</a></p></aside>
      </div>
      <dl className="national-stats">{NATIONAL.stats.map(stat=><div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl><p className="national-source">National figures and partner listing: <a href={NATIONAL.source} target="_blank" rel="noreferrer">ColorStack</a> · Checked October 2026.</p>
    </section>
    <section className="cs-shell cs-section national-benefits" aria-label="What National opens up">{NATIONAL.benefits.map((benefit,index)=><article key={benefit.label}><p className="cs-eyebrow">0{index+1} / {benefit.label}</p><h2>{benefit.title}</h2><p>{benefit.body}</p></article>)}</section>
  </AboutFrame>;
}
