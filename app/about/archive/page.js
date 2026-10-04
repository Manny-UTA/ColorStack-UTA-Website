import AboutFrame from "@/components/AboutFrame";
import { Archives } from "@/components/AboutSections";
import { aboutMetadata } from "@/lib/about";
import "../about.css";
export const metadata = aboutMetadata("Chapter Archive | ColorStack UTA", "Our institutional memory: the people, photographs, and moments that shaped ColorStack UTA. Historical records are being gathered.", "/about/archive");
export default function Page() { return <AboutFrame current="/about/archive"><section className="cs-shell cs-section"><header className="about-subhero"><p className="cs-eyebrow">THE PEOPLE WHO BUILT IT</p><h1 className="cs-display">Every semester leaves something behind.</h1><p className="about-body">Our institutional memory: the people, photographs, and moments that shaped ColorStack UTA. Historical records are being gathered.</p></header><Archives/></section></AboutFrame>; }
