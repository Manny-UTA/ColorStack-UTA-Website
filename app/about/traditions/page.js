import AboutFrame from "@/components/AboutFrame";
import { Traditions } from "@/components/AboutSections";
import { aboutMetadata } from "@/lib/about";
import "../about.css";
export const metadata = aboutMetadata("Culture & Traditions | ColorStack UTA", "The moments, rituals, and ideas that become part of what it means to be ColorStack UTA.", "/about/traditions");
export default function Page() { return <AboutFrame current="/about/traditions"><section className="cs-shell cs-section"><header className="about-subhero"><p className="cs-eyebrow">MORE THAN MEETINGS</p><h1 className="cs-display">Some things become tradition.</h1><p className="about-body">The moments, rituals, and ideas that become part of what it means to be ColorStack UTA.</p></header><Traditions/></section></AboutFrame>; }
