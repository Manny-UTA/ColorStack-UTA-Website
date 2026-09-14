export default function Pinstripe({ className = "" }) {
  return (
    <div
      className={`h-[3px] w-full ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, #16233F 0 40px, #B8935A 40px 42px, #16233F 42px 82px)",
      }}
      aria-hidden="true"
    />
  );
}
