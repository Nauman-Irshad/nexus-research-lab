import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/* ------------------------------------ layout ------------------------------------ */

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "inverse";
}) {
  const toneStyle =
    tone === "muted"
      ? { backgroundColor: "var(--surface-muted)" }
      : tone === "inverse"
        ? { backgroundColor: "var(--color-navy-700)" }
        : undefined;

  return (
    <section
      id={id}
      style={toneStyle}
      className={cn(
        "scroll-mt-28 border-t py-20 md:py-28",
        tone === "inverse" && "border-navy-600 text-navy-100",
        className,
      )}
    >
      <div className="container-nrl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  action,
  inverse = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  inverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "text-center")}>
        {eyebrow && (
          <p className={cn("eyebrow", inverse && "text-emerald-soft!")}>{eyebrow}</p>
        )}
        <h2
          className={cn(
            "mt-3 text-3xl leading-[1.15] font-semibold md:text-[2.6rem]",
            inverse && "text-white",
          )}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={cn("mt-5 text-[1.05rem] leading-relaxed", inverse && "text-navy-100")}
            style={inverse ? undefined : { color: "var(--text-muted)" }}
          >
            {lead}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b" style={{ backgroundColor: "var(--surface-muted)" }}>
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="container-nrl relative py-16 md:py-24">
        <p className="eyebrow animate-fade-in">{eyebrow}</p>
        <h1 className="animate-fade-up mt-4 max-w-4xl text-4xl leading-[1.1] font-semibold md:text-[3.35rem]">
          {title}
        </h1>
        {lead && (
          <p
            className="animate-fade-up mt-6 max-w-3xl text-lg leading-relaxed"
            style={{ color: "var(--text-muted)", animationDelay: "80ms" }}
          >
            {lead}
          </p>
        )}
        {meta && <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">{meta}</div>}
        {children}
      </div>
    </header>
  );
}

/* ------------------------------------ actions ------------------------------------ */

type ButtonVariant = "primary" | "accent" | "outline" | "quiet";

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 disabled:opacity-60";

const buttonSizes = {
  sm: "px-4 py-2 text-[0.8rem]",
  md: "px-6 py-3",
} as const;

function variantClasses(variant: ButtonVariant) {
  switch (variant) {
    case "accent":
      return "bg-emerald-nrl text-white hover:bg-emerald-deep shadow-[0_10px_24px_-14px_rgba(0,168,107,0.9)]";
    case "outline":
      return "border hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft";
    case "quiet":
      return "hover:text-emerald-deep dark:hover:text-emerald-soft";
    default:
      return "shadow-[0_10px_24px_-16px_rgba(11,31,58,0.8)] hover:opacity-90";
  }
}

function variantStyle(variant: ButtonVariant) {
  if (variant === "primary") {
    return { backgroundColor: "var(--surface-inverse)", color: "var(--surface)" };
  }
  if (variant === "outline" || variant === "quiet") {
    return { color: "var(--text-strong)" };
  }
  return undefined;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  arrow = "none",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: keyof typeof buttonSizes;
  className?: string;
  external?: boolean;
  arrow?: "none" | "right" | "up-right";
  ariaLabel?: string;
}) {
  const isExternal = external ?? /^https?:|^mailto:|^tel:/.test(href);
  const content = (
    <>
      {children}
      {arrow === "right" && (
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
      {arrow === "up-right" && (
        <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </>
  );

  const classes = cn(buttonBase, buttonSizes[size], variantClasses(variant), className);

  if (isExternal) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={classes}
        style={variantStyle(variant)}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes} style={variantStyle(variant)}>
      {content}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const isExternal = external ?? /^https?:|^mailto:|^tel:/.test(href);
  const classes = cn(
    "link-underline inline-flex items-center gap-1 text-sm font-medium",
    className,
  );
  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        style={{ color: "var(--text-strong)" }}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} style={{ color: "var(--text-strong)" }}>
      {children}
    </Link>
  );
}

/* ------------------------------------- atoms ------------------------------------- */

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "outline";
  className?: string;
}) {
  const toneClass =
    tone === "accent"
      ? "bg-emerald-nrl/12 text-emerald-deep dark:text-emerald-soft border-emerald-nrl/30"
      : tone === "outline"
        ? "border"
        : "border";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-medium tracking-wide",
        toneClass,
        className,
      )}
      style={
        tone === "neutral"
          ? { backgroundColor: "var(--surface-muted)", color: "var(--text-muted)" }
          : tone === "outline"
            ? { color: "var(--text-muted)" }
            : undefined
      }
    >
      {children}
    </span>
  );
}

export function MetaItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
        {label}
      </dt>
      <dd className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
        {value}
      </dd>
    </div>
  );
}

export function Rule({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t", className)} />;
}

export function AccentBar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("bg-emerald-nrl block h-[3px] w-10 rounded-full", className)}
    />
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="surface-card rounded-2xl px-8 py-16 text-center"
      role="status"
      aria-live="polite"
    >
      <p className="font-[family-name:var(--font-display)] text-lg font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "var(--text-muted)" }}>
        {body}
      </p>
    </div>
  );
}
