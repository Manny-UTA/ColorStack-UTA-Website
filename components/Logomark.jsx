// Recreated from the ColorStack UTA logo visible on your real event fliers —
// three stacked rounded bars of decreasing width, in ColorStack orange.
// If you have the exact vector/PNG file, swap this out for pixel accuracy.
export default function Logomark({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="40" height="40" rx="8" fill="#16233F" />
      <rect x="9" y="12" width="22" height="4.5" rx="2.25" fill="#F1793A" />
      <rect x="9" y="18.5" width="16" height="4.5" rx="2.25" fill="#F1793A" />
      <rect x="9" y="25" width="10" height="4.5" rx="2.25" fill="#F1793A" />
    </svg>
  );
}
