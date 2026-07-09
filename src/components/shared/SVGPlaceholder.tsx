const GRADIENTS = [
  { from: "#2f5d3a", to: "#6fae68", iconColor: "#ffffff" },
  { from: "#6b4423", to: "#8a5c34", iconColor: "#fbf6ec" },
  { from: "#7bb8cc", to: "#a9d6e5", iconColor: "#1f4029" },
  { from: "#c9a24b", to: "#e0bd72", iconColor: "#2b2210" },
  { from: "#1f4029", to: "#3d7a4d", iconColor: "#ffffff" },
] as const;

const ICONS = ["cow", "milk", "leaf", "wheat", "sun", "basket"] as const;
type IconName = (typeof ICONS)[number];

function hashSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  cow: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 30c0-7 5-12 12-12s12 5 12 12v6c0 6-4 10-8 10h-8c-4 0-8-4-8-10z" />
      <path d="M16 24c-2-2-2-6 1-8M48 24c2-2 2-6-1-8" />
      <circle cx="26" cy="30" r="1.6" fill="currentColor" />
      <circle cx="38" cy="30" r="1.6" fill="currentColor" />
      <path d="M28 38c1.5 1.5 6.5 1.5 8 0" />
      <path d="M24 46v4M40 46v4" />
    </g>
  ),
  milk: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M27 14h10l2 8-3 4v22a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V26l-3-4z" />
      <path d="M27 14v-3h10v3" />
      <path d="M24 34h16" />
    </g>
  ),
  leaf: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 46c-2-14 4-26 22-28 2 18-6 26-22 28z" />
      <path d="M20 44c6-8 10-14 18-24" />
    </g>
  ),
  wheat: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 12v40" />
      <path d="M32 16l-6 4M32 16l6 4M32 24l-6 4M32 24l6 4M32 32l-6 4M32 32l6 4M32 40l-6 4M32 40l6 4" />
    </g>
  ),
  sun: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="32" r="10" />
      <path d="M32 14v-4M32 54v-4M14 32h-4M54 32h-4M19 19l-3-3M48 48l-3-3M19 45l-3 3M48 16l-3 3" />
    </g>
  ),
  basket: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 28h32l-4 20a3 3 0 0 1-3 2.5H23a3 3 0 0 1-3-2.5z" />
      <path d="M22 28c0-8 4-14 10-14s10 6 10 14" />
      <path d="M22 35v9M32 35v9M42 35v9" />
    </g>
  ),
};

interface SVGPlaceholderProps {
  seed: string;
  icon?: IconName;
  label?: string;
  className?: string;
}

export function SVGPlaceholder({ seed, icon, label, className }: SVGPlaceholderProps) {
  const hash = hashSeed(seed);
  const { from, to, iconColor } = GRADIENTS[hash % GRADIENTS.length];
  const resolvedIcon = icon ?? ICONS[hash % ICONS.length];
  const gradientId = `ff-grad-${hash}`;

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label={label ?? "Firoz Farms"}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${gradientId})`} />
      <g transform="translate(168,168) scale(2)" style={{ color: iconColor, opacity: 0.9 }}>
        {ICON_PATHS[resolvedIcon]}
      </g>
      {label && (
        <text
          x="200"
          y="340"
          textAnchor="middle"
          fontSize="20"
          fill={iconColor}
          opacity="0.9"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {label}
        </text>
      )}
    </svg>
  );
}
