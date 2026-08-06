"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon, QuoteIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type CopyKind = "bibtex" | "citation" | null;

export function CitationActions({
  bibtex,
  citation,
  compact = false,
}: {
  bibtex: string;
  citation: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState<CopyKind>(null);
  const [expanded, setExpanded] = useState(false);

  const copy = async (kind: Exclude<CopyKind, null>, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2200);
    } catch {
      setExpanded(true);
    }
  };

  const buttonClass =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.72rem] font-medium transition-colors duration-300 hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => copy("citation", citation)}
        className={buttonClass}
        style={{ color: "var(--text-strong)" }}
      >
        {copied === "citation" ? (
          <CheckIcon className="text-emerald-nrl h-3.5 w-3.5" />
        ) : (
          <QuoteIcon className="h-3.5 w-3.5" />
        )}
        {copied === "citation" ? "Citation copied" : "Cite"}
      </button>
      <button
        type="button"
        onClick={() => copy("bibtex", bibtex)}
        className={buttonClass}
        style={{ color: "var(--text-strong)" }}
      >
        {copied === "bibtex" ? (
          <CheckIcon className="text-emerald-nrl h-3.5 w-3.5" />
        ) : (
          <CopyIcon className="h-3.5 w-3.5" />
        )}
        {copied === "bibtex" ? "BibTeX copied" : "BibTeX"}
      </button>
      {!compact && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="text-[0.72rem] font-medium underline decoration-dotted underline-offset-4 transition-colors hover:text-emerald-deep dark:hover:text-emerald-soft"
          style={{ color: "var(--text-muted)" }}
        >
          {expanded ? "Hide entry" : "Show entry"}
        </button>
      )}
      {expanded && (
        <div className="mt-3 w-full">
          <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
            Reference
          </p>
          <p className="mb-3 text-[0.8rem] leading-relaxed" style={{ color: "var(--text-body)" }}>
            {citation}
          </p>
          <pre
            className={cn(
              "overflow-x-auto rounded-xl border p-4 text-[0.72rem] leading-relaxed",
              "font-mono",
            )}
            style={{ backgroundColor: "var(--surface-muted)", color: "var(--text-body)" }}
          >
            {bibtex}
          </pre>
        </div>
      )}
    </div>
  );
}
