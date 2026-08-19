"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Linkedin, ArrowRight, Lock, Menu, X } from "lucide-react";
import { NAV_PAGES, STRIPE_BG } from "@/lib/content";

function Logomark({ size = 30 }) {
  return <div className="rounded-md shrink-0" style={{ width: size, height: size, ...STRIPE_BG }} aria-hidden="true" />;
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0A1240] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logomark size={30} />
          <span className="font-extrabold text-sm tracking-tight uppercase leading-none">
            ColorStack<span className="text-orange-500"> UTA</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
          {NAV_PAGES.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/admin" className="hidden sm:inline-flex text-slate-400 hover:text-white transition-colors" aria-label="Officer admin login" title="Officer admin login">
            <Lock size={17} />
          </Link>
          <a href="#" aria-label="Instagram" className="hidden sm:inline-flex text-slate-300 hover:text-white transition-colors"><Instagram size={18} /></a>
          <a href="#" aria-label="LinkedIn" className="hidden sm:inline-flex text-slate-300 hover:text-white transition-colors"><Linkedin size={18} /></a>
          <a href="/#portal" className="hidden sm:inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold text-sm px-4 py-2 rounded-full">
            Get Involved <ArrowRight size={15} />
          </a>
          <button
            type="button"
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0A1240] px-6 py-4 flex flex-col gap-1">
          {NAV_PAGES.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-semibold text-slate-200 border-b border-white/5 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-5 pt-4">
            <Link href="/admin" onClick={() => setOpen(false)} className="text-slate-400" aria-label="Officer admin login"><Lock size={18} /></Link>
            <a href="#" aria-label="Instagram" className="text-slate-300"><Instagram size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="text-slate-300"><Linkedin size={18} /></a>
          </div>
          <a
            href="/#portal"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-1.5 bg-orange-500 text-[#0A1240] font-bold text-sm px-4 py-3 rounded-full"
          >
            Get Involved <ArrowRight size={15} />
          </a>
        </div>
      )}
    </header>
  );
}
