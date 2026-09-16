import StackWatermark from "./StackWatermark";

export default function PhotoBlock({ src, alt = "", className = "", fit = "cover" }) {
  if (src) {
    return <img src={src} alt={alt} className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`} />;
  }
  return (
    <div className={`relative isolate overflow-hidden flex flex-col justify-between bg-[#EFE9DC] border border-navy/15 p-5 sm:p-7 ${className}`}>
      <StackWatermark className="absolute w-4/5 -right-6 top-0 text-navy opacity-[0.05] -z-10" />
      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-navy/60">ColorStack UTA</span>
      <span className="font-serif text-lg sm:text-2xl text-navy leading-tight max-w-[18ch] whitespace-normal">{alt || "We build. We connect."}</span>
    </div>
  );
}
