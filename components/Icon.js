// მსუბუქი, დამოკიდებულებების გარეშე SVG აიქონები — ემოჯების ჩამნაცვლებელი.
// ერთი ხაზის სისქე, ერთნაირი სტილი მთელს საიტზე.
const PATHS = {
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.5H4a3 3 0 0 0 3 4M17 5.5h3a3 3 0 0 1-3 4" />
      <path d="M12 14v3M9 20.5h6M9.5 17.5h5l.5 3h-6l.5-3Z" />
    </>
  ),
  judo: (
    <>
      <circle cx="12" cy="4.5" r="1.8" />
      <path d="M9 21l1.5-6-3-2.5 1-5.5 3.5 1 2-1.5 3 2 -1 3.5-3 1 1.5 3.5" />
    </>
  ),
  document: (
    <>
      <path d="M6 2.5h8l4 4V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" />
      <path d="M14 2.5V7h4" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M7 10.5l5 5 5-5" />
      <path d="M4 18v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 9.5v5M12 17.2h.01" />
    </>
  ),
  check: <path d="M4 12.5l5.5 5.5L20 6.5" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.7" />
      <path d="M21 16l-5.5-5.5a1.5 1.5 0 0 0-2.1 0L4 19" />
    </>
  ),
  play: <path d="M7 4.5v15l13-7.5-13-7.5Z" />,
  pin: (
    <>
      <path d="M12 21.5s7-6.4 7-12A7 7 0 0 0 5 9.5c0 5.6 7 12 7 12Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </>
  ),
  federation: (
    <>
      <path d="M4 21h16M5 21V9.5L12 5l7 4.5V21M9 21v-6h6v6" />
      <path d="M3 9.5 12 4l9 5.5" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-4h4v4" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2.5c3 1.5 5 4.8 5 9 0 2-1 4-2 5l-3 3-3-3c-1-1-2-3-2-5 0-4.2 2-7.5 5-9Z" />
      <circle cx="12" cy="11" r="1.7" />
      <path d="M9 17l-2 4M15 17l2 4" />
    </>
  ),
  scroll: (
    <>
      <path d="M6 4h13v14a2.5 2.5 0 0 1-2.5 2.5H8.5A2.5 2.5 0 0 1 6 18V4Z" />
      <path d="M6 7H4.5A1.5 1.5 0 0 0 3 8.5V17a2.5 2.5 0 0 0 2.5 2.5M9 8h6M9 12h6" />
    </>
  ),
  handshake: (
    <>
      <path d="M3 12l4-4 4 3 3-3 3 3 4-3 0 6-3 3-3-2-3 3-3-2-2 2" />
    </>
  ),
  gallery: (
    <>
      <rect x="3" y="5" width="14" height="14" rx="1.5" />
      <circle cx="8" cy="10" r="1.4" />
      <path d="M17 9l4-1v12l-4-1M6.5 19l4.5-5 3 2.5 3-3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9Z" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </>
  ),
  facebook: (
    <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H6v3.5h2V21h3.5v-7.5h2.7l.5-3.5h-3.2V7.8c0-1 .3-1.8 1.8-1.8H15V3Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <path d="M22 12s0-3.5-.45-5.2a2.9 2.9 0 0 0-2.05-2C17.7 4.3 12 4.3 12 4.3s-5.7 0-7.5.5a2.9 2.9 0 0 0-2.05 2C2 8.5 2 12 2 12s0 3.5.45 5.2a2.9 2.9 0 0 0 2.05 2c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a2.9 2.9 0 0 0 2.05-2C22 15.5 22 12 22 12Z" />
      <path d="M9.8 15.3V8.7l5.8 3.3-5.8 3.3Z" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function Icon({ name, size = 18, className = "", strokeWidth = 1.7 }) {
  const content = PATHS[name];
  if (!content) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}
