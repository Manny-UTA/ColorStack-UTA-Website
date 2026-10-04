import { SISTER_ORGS } from "@/lib/sister-orgs";
export default function SisterOrgs() {
  return <section className="cs-shell cs-section about-sister-orgs" aria-labelledby="sister-orgs-title">
    <figure><img src={SISTER_ORGS.image.src} alt={SISTER_ORGS.image.alt} width={SISTER_ORGS.image.width} height={SISTER_ORGS.image.height} loading="lazy" /></figure>
    <div><p className="cs-eyebrow">COMMUNITY / ACROSS CAMPUS</p><h2 id="sister-orgs-title">Stronger <em>together.</em></h2><p className="about-body">{SISTER_ORGS.description}</p><p className="sister-orgs-identity">COLORSTACK UTA × SHPE UTA × NSBE UTA</p><p className="sister-orgs-closing">Sister Orgs. Shared mission. Collective impact.</p><a className="cs-text-link" href={SISTER_ORGS.href}>Explore Sister Orgs →</a></div>
  </section>;
}
