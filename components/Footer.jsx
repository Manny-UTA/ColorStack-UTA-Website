"use client";

import { Instagram, Linkedin, Mail, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/#portal", label: "Member Portal" },
];

export default function Footer() {
  return (
    <>
      <section className="bg-[#0C1650] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">Join Our Community</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Be part of a thriving network of Black and Latinx Computer Science students. Together, we grow, learn, and succeed.
            </p>
            <a
              href="https://linktr.ee/colorstack_uta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold text-xs px-4 py-2.5 rounded-full"
            >
              Become a Member <ArrowRight size={13} />
            </a>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Quick Links</p>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-slate-300 hover:text-white transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Follow Us</p>
            <p className="text-sm text-slate-300 mb-4">Stay connected for updates, events, and more.</p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="text-slate-300 hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="#" aria-label="LinkedIn" className="text-slate-300 hover:text-white transition-colors"><Linkedin size={18} /></a>
              <a href="#" aria-label="Email" className="text-slate-300 hover:text-white transition-colors"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Newsletter</p>
            <p className="text-sm text-slate-300 mb-4">Get the latest news, events, and opportunities in your inbox.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 bg-[#111C4E] border border-white/15 focus:border-orange-500 outline-none rounded-full px-3.5 py-2.5 text-xs placeholder:text-slate-500"
              />
              <button className="bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold text-xs px-4 py-2.5 rounded-full shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-8 pt-2 border-t border-white/10">
          <p className="text-slate-400 text-xs leading-relaxed max-w-3xl">
            ColorStack UTA is part of{" "}
            <a href="https://www.colorstack.org" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">
              ColorStack National
            </a>
            {" "}— a community of 10,000+ Black and Latinx Computer Science students from 900+ schools nationwide, providing community building, academic support, and career development year-round.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2026 ColorStack UTA. All rights reserved.</span>
          <span>We Code. We Connect. We Cultivate.</span>
        </div>
      </footer>
    </>
  );
}
