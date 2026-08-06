"use client";

import { useMemo, useState, type ReactNode } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { EmptyState } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface ExplorerItem {
  id: string;
  node: ReactNode;
  /** Lower-cased haystack used by the search box. */
  searchText: string;
  facets: Record<string, string[]>;
  sortValues?: Record<string, number>;
}

export interface FacetDefinition {
  key: string;
  label: string;
  options: { value: string; label: string; count?: number }[];
}

export interface SortDefinition {
  key: string;
  label: string;
  direction: "asc" | "desc";
}

export function CollectionExplorer({
  items,
  facets,
  sorts,
  searchLabel = "Search",
  searchPlaceholder = "Search…",
  searchHint,
  emptyTitle = "No matching records",
  emptyBody = "Try removing a filter or searching for a broader term.",
  unit = "records",
}: {
  items: ExplorerItem[];
  facets: FacetDefinition[];
  sorts?: SortDefinition[];
  searchLabel?: string;
  searchPlaceholder?: string;
  searchHint?: string;
  emptyTitle?: string;
  emptyBody?: string;
  unit?: string;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [sortKey, setSortKey] = useState(sorts?.[0]?.key ?? "");

  const toggle = (facetKey: string, value: string) => {
    setSelected((current) => {
      const existing = current[facetKey] ?? [];
      const next = existing.includes(value)
        ? existing.filter((entry) => entry !== value)
        : [...existing, value];
      return { ...current, [facetKey]: next };
    });
  };

  const activeCount =
    Object.values(selected).reduce((total, values) => total + values.length, 0) +
    (query.trim() ? 1 : 0);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const terms = needle.length > 0 ? needle.split(/\s+/) : [];

    const result = items.filter((item) => {
      const matchesQuery = terms.every((term) => item.searchText.includes(term));
      if (!matchesQuery) return false;

      return Object.entries(selected).every(([facetKey, values]) => {
        if (values.length === 0) return true;
        const itemValues = item.facets[facetKey] ?? [];
        return values.some((value) => itemValues.includes(value));
      });
    });

    const activeSort = sorts?.find((entry) => entry.key === sortKey);
    if (activeSort) {
      result.sort((a, b) => {
        const left = a.sortValues?.[activeSort.key] ?? 0;
        const right = b.sortValues?.[activeSort.key] ?? 0;
        return activeSort.direction === "desc" ? right - left : left - right;
      });
    }

    return result;
  }, [items, query, selected, sortKey, sorts]);

  const reset = () => {
    setQuery("");
    setSelected({});
  };

  return (
    <div>
      <div className="surface-card rounded-2xl p-5 md:p-6">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <label
              htmlFor="collection-search"
              className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--text-muted)" }}
            >
              {searchLabel}
            </label>
            <div className="relative mt-2.5">
              <SearchIcon
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                id="collection-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="focus:border-emerald-nrl w-full rounded-full border bg-[var(--surface-muted)] py-3 pl-11 pr-4 text-sm outline-none transition-colors"
                style={{ color: "var(--text-strong)" }}
              />
            </div>
            {searchHint && (
              <p className="mt-2 text-[0.72rem]" style={{ color: "var(--text-muted)" }}>
                {searchHint}
              </p>
            )}
          </div>

          {sorts && sorts.length > 1 && (
            <div className="lg:col-span-3">
              <label
                htmlFor="collection-sort"
                className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)" }}
              >
                Sort by
              </label>
              <select
                id="collection-sort"
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value)}
                className="focus:border-emerald-nrl mt-2.5 w-full rounded-full border bg-[var(--surface-muted)] px-4 py-3 text-sm outline-none transition-colors"
                style={{ color: "var(--text-strong)" }}
              >
                {sorts.map((entry) => (
                  <option key={entry.key} value={entry.key}>
                    {entry.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="lg:col-span-2 lg:text-right">
            <p
              className="font-[family-name:var(--font-display)] text-2xl font-semibold"
              aria-live="polite"
            >
              {filtered.length}
            </p>
            <p className="text-[0.74rem]" style={{ color: "var(--text-muted)" }}>
              {unit} shown
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4 border-t pt-5">
          {facets.map((facet) => (
            <fieldset key={facet.key}>
              <legend
                className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)" }}
              >
                {facet.label}
              </legend>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {facet.options.map((option) => {
                  const active = (selected[facet.key] ?? []).includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggle(facet.key, option.value)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-[0.75rem] font-medium transition-all duration-300",
                        active
                          ? "border-emerald-nrl bg-emerald-nrl text-white"
                          : "hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft",
                      )}
                      style={active ? undefined : { color: "var(--text-muted)" }}
                    >
                      {option.label}
                      {typeof option.count === "number" && (
                        <span className={cn("ml-1.5", active ? "opacity-80" : "opacity-55")}>
                          {option.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}

          {activeCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="hover:text-emerald-deep dark:hover:text-emerald-soft inline-flex items-center gap-1.5 text-[0.76rem] font-medium transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <CloseIcon className="h-3.5 w-3.5" />
              Clear {activeCount} {activeCount === 1 ? "filter" : "filters"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-6">
        {filtered.length === 0 ? (
          <EmptyState title={emptyTitle} body={emptyBody} />
        ) : (
          filtered.map((item) => <div key={item.id}>{item.node}</div>)
        )}
      </div>
    </div>
  );
}
