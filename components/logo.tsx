import { cn } from "@/lib/utils";

/**
 * NRL identity mark: a minimal hexagon enclosing a shield outline, a small
 * node-link cluster and an open book, with circuit traces entering from the
 * sides. Flat vector, three colours, no effects.
 *
 * Structural strokes use `currentColor` so the mark inverts cleanly on navy
 * and in dark mode.
 */
export function LogoMark({ className, decorative = true }: { className?: string; decorative?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn("h-9 w-9", className)}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Nexus Research Lab"}
    >
      {/* Outer hexagon */}
      <path
        d="M32 4.2 56.2 18v28L32 59.8 7.8 46V18z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />

      {/* Circuit traces */}
      <g stroke="#8F9BAC" strokeWidth="1.3" strokeLinecap="round">
        <path d="M11.4 27.6h6.9" />
        <path d="M13.2 37.4h6" />
        <path d="M52.6 27.6h-6.9" />
        <path d="M50.8 37.4h-6" />
      </g>
      <g fill="#8F9BAC">
        <circle cx="10.4" cy="27.6" r="1.5" />
        <circle cx="53.6" cy="27.6" r="1.5" />
        <rect x="10.9" y="35.9" width="2.8" height="2.8" rx="0.6" />
        <rect x="50.3" y="35.9" width="2.8" height="2.8" rx="0.6" />
      </g>

      {/* Shield */}
      <path
        d="M32 14.6l13.1 4.6v13.2c0 7.9-6.1 13.2-13.1 15.9-7-2.7-13.1-8-13.1-15.9V19.2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.72"
      />

      {/* Node-link cluster */}
      <g stroke="#8F9BAC" strokeWidth="1.15" opacity="0.9">
        <path d="M32 22.2l-7.4 5.5M32 22.2l7.4 5.5M24.6 27.7 27 34.6M39.4 27.7 37 34.6M27 34.6h10" />
      </g>
      <g fill="#00A86B">
        <circle cx="32" cy="22.2" r="2.5" />
        <circle cx="24.6" cy="27.7" r="1.9" />
        <circle cx="39.4" cy="27.7" r="1.9" />
        <circle cx="27" cy="34.6" r="1.7" />
        <circle cx="37" cy="34.6" r="1.7" />
      </g>

      {/* Open book */}
      <g stroke="#00A86B" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M22.6 40.4c3.1-1.9 6.4-1.6 9 .5v4.4c-2.6-2-5.9-2.3-9-.4z" />
        <path d="M41.4 40.4c-3.1-1.9-6.4-1.6-9 .5v4.4c2.6-2 5.9-2.3 9-.4z" />
      </g>
    </svg>
  );
}

export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className="font-[family-name:var(--font-display)] text-[0.98rem] font-semibold tracking-tight"
          style={{ color: "var(--text-strong)" }}
        >
          Nexus Research Lab
        </span>
        {!compact && (
          <span
            className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.22em]"
            style={{ color: "var(--text-muted)" }}
          >
            AI · Cybersecurity · Intelligent Systems
          </span>
        )}
      </span>
    </span>
  );
}
