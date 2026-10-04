import AboutFrame from "@/components/AboutFrame";
import { National } from "@/components/AboutSections";
import { aboutMetadata } from "@/lib/about";
import "../about.css";
export const metadata = aboutMetadata("ColorStack National | ColorStack UTA", "A campus community with connections beyond Arlington.", "/about/national");
export default function Page() { return <AboutFrame current="/about/national"><section className="cs-shell cs-section"><header className="about-subhero"><p className="cs-eyebrow">PART OF SOMETHING BIGGER</p><h1 className="cs-display">From UTA to a national community.</h1><p className="about-body">A campus community with connections beyond Arlington.</p></header><National detail/></section></AboutFrame>; }
