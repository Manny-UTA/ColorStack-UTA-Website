"use client";

import { Instagram, Linkedin, Mail, ArrowRight } from "lucide-react";
import Pinstripe from "./Pinstripe";
import { FOUNDED_YEAR } from "@/lib/content";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/portal", label: "Member Portal" },
];

export default function Footer() {
  return (
    <>
      <Pinstripe />
      <section className="bg-navy text-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10 font-sans">
          <div>
            <p className="text-brass text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Join the Chapter</p>
            <p className="text-cream/75 text-sm leading-relaxed mb-5">
              Be part of a thriving network of Black and Latinx Computer Science students. Together, we grow, learn, and succeed.
            </p>
            <a
              href="https://linktr.ee/colorstack_uta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-brass text-navy font-bold text-xs uppercase tracking-wide px-4 py-2.5 rounded-sm"
            >
              Become a Member <ArrowRight size={13} />
            </a>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cream/50 mb-4">Quick Links</p>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-cream/80 hover:text-cream transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cream/50 mb-4">Follow</p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="text-cream/80 hover:text-cream transition-colors"><Instagram size={18} /></a>
              <a href="#" aria-label="LinkedIn" className="text-cream/80 hover:text-cream transition-colors"><Linkedin size={18} /></a>
              <a href="#" aria-label="Email" className="text-cream/80 hover:text-cream transition-colors"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cream/50 mb-4">Newsletter</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 bg-cream/10 border border-cream/20 focus:border-brass outline-none rounded-sm px-3.5 py-2.5 text-xs placeholder:text-cream/40 text-cream"
              />
              <button className="bg-brass text-navy font-bold text-xs uppercase px-4 py-2.5 rounded-sm shrink-0">Join</button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-8 border-t border-cream/10 pt-6 font-sans flex flex-col sm:flex-row justify-between gap-3 text-cream/50 text-xs">
          <span>© {new Date().getFullYear()} ColorStack UTA · A chapter of ColorStack National, est. {FOUNDED_YEAR}</span>
          <span>We Code. We Connect. We Cultivate.</span>
        </div>
      </section>
    </>
  );
}
