export default function StackWatermark({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`pointer-events-none ${className}`} fill="currentColor">
      <rect x="10" y="20" width="80" height="14" rx="7" />
      <rect x="10" y="43" width="58" height="14" rx="7" />
      <rect x="10" y="66" width="36" height="14" rx="7" />
    </svg>
  );
}
