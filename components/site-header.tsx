"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigation, site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const handle = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(handle);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500",
        overHero
          ? "border-b border-transparent bg-transparent"
          : "border-b shadow-[0_1px_0_rgba(11,31,58,0.04)] backdrop-blur-xl backdrop-saturate-150",
      )}
      style={overHero ? undefined : { backgroundColor: "var(--header-bg)" }}
    >
      <div className="container-nrl">
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <LogoMark
              className={cn(
                "h-9 w-9 shrink-0 transition-transform duration-500 group-hover:scale-[1.04]",
                overHero && "text-white",
              )}
            />
            <span
              className={cn(
                "font-[family-name:var(--font-display)] text-[0.95rem] font-semibold tracking-tight",
                overHero && "text-white",
              )}
              style={overHero ? undefined : { color: "var(--text-strong)" }}
            >
              {site.name}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.82rem] font-medium transition-colors duration-300",
                    overHero
                      ? "text-white/80 hover:text-white"
                      : "hover:text-emerald-deep dark:hover:text-emerald-soft",
                  )}
                  style={
                    overHero
                      ? undefined
                      : { color: active ? "var(--text-strong)" : "var(--text-muted)" }
                  }
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "bg-emerald-nrl absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle inverse={overHero} className="hidden sm:inline-flex" />
            <Link
              href={site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden whitespace-nowrap rounded-full px-5 py-2.5 text-[0.82rem] font-semibold transition-all duration-300 lg:inline-flex",
                overHero
                  ? "bg-emerald-nrl hover:bg-emerald-soft text-white"
                  : "bg-emerald-nrl hover:bg-emerald-deep text-white shadow-[0_10px_22px_-14px_rgba(0,168,107,0.95)]",
              )}
            >
              Join Us
            </Link>
            <Link
              href="/portfolio"
              className={cn(
                "hidden whitespace-nowrap rounded-full border px-5 py-2.5 text-[0.82rem] font-semibold transition-all duration-300 lg:inline-flex",
                overHero
                  ? "border-white/35 text-white hover:border-white hover:bg-white/10"
                  : "border-[var(--border)] hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft",
              )}
              style={overHero ? undefined : { color: "var(--text-strong)" }}
            >
              Nauman Portfolio
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors xl:hidden",
                overHero ? "border-white/25 text-white" : undefined,
              )}
              style={overHero ? undefined : { color: "var(--text-strong)" }}
            >
              {open ? <MenuIconSwap open /> : <MenuIconSwap />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="border-t xl:hidden"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <nav aria-label="Mobile" className="container-nrl max-h-[calc(100dvh-4.5rem)] overflow-y-auto py-6">
          <ul className="grid gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[0.95rem] font-medium transition-colors"
                  style={{
                    color: isActive(item.href) ? "var(--color-emerald-deep)" : "var(--text-strong)",
                    backgroundColor: isActive(item.href) ? "var(--surface-muted)" : undefined,
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="bg-emerald-nrl hover:bg-emerald-deep flex-1 rounded-full px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Join Us
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full border px-5 py-3 text-center text-sm font-semibold"
              style={{ color: "var(--text-strong)" }}
            >
              Nauman Portfolio
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

function MenuIconSwap({ open = false }: { open?: boolean }) {
  return open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />;
}
