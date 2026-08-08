import { GraduationCap } from "lucide-react";

export default function PhotoBlock({ src, alt = "", className = "" }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`object-cover ${className}`} />;
  }
  return (
    <div className={`relative flex items-end justify-start bg-gradient-to-br from-[#1B2A6B] via-[#111C4E] to-[#0A1240] ${className}`}>
      <GraduationCap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10" size={64} />
      {alt && <span className="relative z-10 text-[11px] text-slate-400 font-medium px-3 pb-3">{alt} — no photo uploaded yet</span>}
    </div>
  );
}
