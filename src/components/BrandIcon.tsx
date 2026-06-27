export function BrandIcon({ className = 'h-8 w-8 shrink-0 rounded-lg' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#7c3aed" />
      <path
        d="M16 22V10M16 10l-4.5 4.5M16 10l4.5 4.5"
        stroke="#ffffff"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
