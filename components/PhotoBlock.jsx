export default function PhotoBlock({ src, alt = "", className = "" }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`object-cover ${className}`} />;
  }
  return (
    <div className={`relative flex items-end justify-start bg-[#EFE9DC] border border-navy/15 ${className}`}>
      {alt && <span className="relative z-10 text-[11px] text-navy/50 font-medium px-3 pb-3">{alt} — no photo uploaded yet</span>}
    </div>
  );
}
