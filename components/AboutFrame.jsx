import Nav from "./Nav";
import Footer from "./Footer";
import { ABOUT_LINKS } from "@/lib/about";
export default function AboutFrame({ current, children }) { return <><Nav/><main className="cs-about"><nav className="cs-shell about-nav" aria-label="About ColorStack UTA">{ABOUT_LINKS.map(([href,label]) => <a href={href} key={href} aria-current={current === href ? "page" : undefined}>{label}</a>)}</nav>{children}<section className="cs-shell cs-section cs-final-cta"><p className="cs-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Build a future.<br/><em>Bring your people.</em></h2><div className="cs-actions"><a href="/portal" className="cs-button">Join ColorStack UTA ↗</a><a href="/sponsors#sponsor-form" className="cs-text-link">Let’s work together →</a></div></section></main><Footer/></>; }
