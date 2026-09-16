"use client";

import { ArrowRight } from "lucide-react";
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
              className="inline-flex items-center gap-1.5 bg-cream text-navy font-bold text-xs uppercase tracking-wide px-4 py-2.5 rounded-sm whitespace-nowrap"
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
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cream/60 mb-4">Stay connected</p>
            <p className="text-sm text-cream/80 leading-relaxed mb-4">Find chapter announcements and community channels in one place.</p>
            <a href="https://linktr.ee/colorstack_uta" className="inline-flex items-center gap-2 text-sm text-cream underline underline-offset-4">Chapter links <ArrowRight size={14} /></a>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cream/60 mb-4">Build with us</p>
            <p className="text-sm text-cream/80 leading-relaxed mb-4">Connect your team with the next generation of technical talent.</p>
            <a href="/sponsors#sponsor-form" className="inline-flex items-center gap-2 text-sm text-cream underline underline-offset-4">Partner with the chapter <ArrowRight size={14} /></a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-8 border-t border-cream/10 pt-6 font-sans flex flex-col sm:flex-row justify-between gap-3 text-cream/50 text-xs">
          <span>© {new Date().getFullYear()} ColorStack UTA · Chapter founded {FOUNDED_YEAR}</span>
          <span>We build. We connect. We ColorStack.</span>
        </div>
      </section>
    </>
  );
}
