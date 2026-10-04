import AboutFrame from "@/components/AboutFrame";
import { Board } from "@/components/AboutSections";
import { aboutMetadata } from "@/lib/about";
import "../about.css";
export const metadata = aboutMetadata("Current Leadership | ColorStack UTA", "Every semester, students step forward to help build what’s next. Meet the Fall 2026 ColorStack UTA leadership.", "/about/leadership");
export default function Page() { return <AboutFrame current="/about/leadership"><section className="cs-shell cs-section"><header className="about-subhero"><p className="cs-eyebrow">THE PEOPLE BEHIND THE CHAPTER</p><h1 className="cs-display">Built by students.</h1><p className="about-body">Every semester, students step forward to help build what’s next. Meet the Fall 2026 ColorStack UTA leadership.</p></header><Board/></section></AboutFrame>; }
