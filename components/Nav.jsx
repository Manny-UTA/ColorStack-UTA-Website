"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Lock, Menu, X } from "lucide-react";
import { NAV_PAGES } from "@/lib/content";
import Logomark from "./Logomark";
import Pinstripe from "./Pinstripe";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-cream">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between border-b border-navy/10">
        <Link href="/" className="flex items-center gap-2 sm:gap-3.5" onClick={() => setOpen(false)}>
          <Logomark size={36} />
          <div className="leading-tight">
            <div className="font-sans text-[15px] font-bold tracking-tight text-navy">ColorStack UTA</div>
            <div className="font-sans text-[8px] sm:text-[9px] tracking-[0.1em] text-brass font-bold uppercase mt-0.5">
              The University of Texas at Arlington
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-[12.5px] font-sans font-semibold tracking-wide uppercase text-navy">
          {NAV_PAGES.map((l) => (
            <a key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} className="pb-1 border-b border-transparent hover:border-brass transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/admin" className="hidden sm:inline-flex text-navy/50 hover:text-navy transition-colors" aria-label="Officer admin login" title="Officer admin login">
            <Lock size={16} />
          </Link>
          <a
            href="https://linktr.ee/colorstack_uta"
            className="hidden sm:inline-flex items-center gap-1.5 bg-navy text-cream font-sans font-bold text-[11.5px] tracking-wide uppercase px-5 py-2.5 rounded-sm whitespace-nowrap hover:bg-navy/90 transition-colors whitespace-nowrap"
          >
            Join the Chapter <ArrowRight size={13} />
          </a>
          <button
            type="button"
            className="md:hidden text-navy"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-b border-navy/10 bg-cream px-5 py-4 flex flex-col gap-1 font-sans">
          {NAV_PAGES.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-semibold uppercase tracking-wide text-navy border-b border-navy/5 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://linktr.ee/colorstack_uta"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-1.5 bg-navy text-cream font-bold text-xs uppercase tracking-wide px-4 py-3 rounded-sm whitespace-nowrap"
          >
            Join the Chapter <ArrowRight size={14} />
          </a>
        </div>
      )}
    </header>
  );
}
