import { PARTNERS } from "@/lib/content";

export default function PartnerMarquee() {
  // Duplicate the list so the loop is seamless.
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <div className="group relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max gap-12 sm:gap-16 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((p, i) => (
          <span key={`${p}-${i}`} className="text-base sm:text-xl font-bold text-slate-400 whitespace-nowrap shrink-0">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
