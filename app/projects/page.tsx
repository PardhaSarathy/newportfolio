"use client";

import { Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectSummaryCard } from "@/components/ProjectSummaryCard";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  PUBLISHED_PROJECTS,
  LAYERS,
  LAYER_LABEL,
  type Layer,
} from "@/lib/projects";

type Filter = "All" | Layer;

const FILTERS: Filter[] = ["All", ...LAYERS];
const BROWSE_PROJECTS = [...PUBLISHED_PROJECTS].sort(
  (a, b) => Number(!!b.featured) - Number(!!a.featured),
);

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsContent activeFilter="All" />}>
      <FilteredProjects />
    </Suspense>
  );
}

function FilteredProjects() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestedLayer = searchParams.get("layer");
  const activeFilter: Filter = LAYERS.includes(requestedLayer as Layer)
    ? (requestedLayer as Layer)
    : "All";

  function selectFilter(filter: Filter) {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "All") params.delete("layer");
    else params.set("layer", filter);
    const query = params.toString();
    router.replace(query ? `/projects?${query}` : "/projects", {
      scroll: false,
    });
  }

  return (
    <ProjectsContent
      activeFilter={activeFilter}
      onFilterChange={selectFilter}
    />
  );
}

function ProjectsContent({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: Filter;
  onFilterChange?: (filter: Filter) => void;
}) {
  const reduceMotion = useReducedMotion();
  const allFilterRef = useRef<HTMLButtonElement>(null);
  const filtered = BROWSE_PROJECTS.filter(
    (p) => activeFilter === "All" || p.layers.includes(activeFilter),
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-24 space-y-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary">
          Selected Works.
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
          Voice, vision and retrieval systems taken from model to backend to
          shipped product. Filter by the layer each one proves.
        </p>
      </div>

      {/*
              Sticky filter bar. Direct child of the page container rather than
              nested in the centered header — inside the header it scrolled away
              with its parent and never actually stuck.
            */}
      <div className="sticky top-4 z-40 flex justify-center">
        <div
          role="group"
          aria-label="Filter projects by engineering layer"
          className="flex flex-wrap sm:flex-nowrap justify-center gap-1 md:gap-2 p-1.5 md:p-2 bg-bg-card/90 backdrop-blur-xl rounded-3xl sm:rounded-full border border-hairline w-max max-w-full shadow-lg shadow-black/5 dark:shadow-black/30"
        >
          {FILTERS.map((f) => {
            const count =
              f === "All"
                ? PUBLISHED_PROJECTS.length
                : PUBLISHED_PROJECTS.filter((p) => p.layers.includes(f)).length;
            const isActive = activeFilter === f;

            return (
              <button
                key={f}
                ref={f === "All" ? allFilterRef : undefined}
                onClick={() => onFilterChange?.(f)}
                aria-controls="project-results"
                aria-pressed={isActive}
                className={cn(
                  "flex min-h-11 items-center gap-2 px-2 sm:px-3 md:px-6 py-2.5 rounded-full text-sm md:text-base font-semibold transition-colors duration-200 relative whitespace-nowrap",
                  isActive
                    ? "text-white dark:text-[#052018]"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-sunken",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-main rounded-full shadow-md"
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  />
                )}
                <span className="relative z-10">
                  {f === "All" ? "All" : LAYER_LABEL[f]}
                </span>
                <span
                  className={cn(
                    "relative z-10 text-xs font-bold px-2 py-0.5 rounded-full transition-colors",
                    isActive
                      ? "bg-black/15 dark:bg-black/10"
                      : "bg-surface-sunken text-text-muted",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Keep the result count visible without moving keyboard focus. */}
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4 min-h-11">
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-text-secondary"
          >
            <span className="font-semibold text-text-primary">
              {filtered.length} projects
            </span>
            <span aria-hidden className="mx-2 text-text-muted">
              ·
            </span>
            {activeFilter === "All"
              ? "Featured first"
              : LAYER_LABEL[activeFilter]}
          </p>
          {activeFilter !== "All" && (
            <button
              onClick={() => {
                onFilterChange?.("All");
                allFilterRef.current?.focus();
              }}
              className="min-h-11 rounded-lg px-2 text-sm font-semibold text-brand-main hover:underline"
            >
              Show all
            </button>
          )}
        </div>
        {/* Projects Grid */}
        <motion.div
          id="project-results"
          layout={!reduceMotion}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                className="h-full"
              >
                <ProjectSummaryCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
