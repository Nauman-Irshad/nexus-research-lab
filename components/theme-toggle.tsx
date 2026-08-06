"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const STORAGE_KEY = "nrl-theme";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The inline script in the document head has already resolved the theme
    // (stored preference, else system preference), so we read it back from the
    // document instead of duplicating that logic here.
    const handle = requestAnimationFrame(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "dark"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300",
        inverse
          ? "border-white/25 text-white hover:border-white/60"
          : "hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft",
        className,
      )}
      style={inverse ? undefined : { color: "var(--text-strong)" }}
    >
      {mounted && theme === "dark" ? (
        <SunIcon className="h-[1.15rem] w-[1.15rem]" />
      ) : (
        <MoonIcon className="h-[1.15rem] w-[1.15rem]" />
      )}
    </button>
  );
}

/** Runs before paint to avoid a flash of the wrong theme. */
export const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    }
  } catch (e) {}
})();
`;
