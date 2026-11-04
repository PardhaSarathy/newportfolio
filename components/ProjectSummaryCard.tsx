import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { STATUS_LABEL, LAYER_LABEL, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "@/components/ProjectPreview";

const summaries: Record<string, string> = {
  "production-voice-agent":
    "A multilingual AI receptionist handling real customer calls, from speech model to telephony.",
  "drswift-diagnostics":
    "A connected diagnostics platform: patient app, catalog CMS, website, and AI-powered lab reports.",
  "mr-sales":
    "Offline field work, office approvals, and platform operations: connected across mobile, web, and a shared backend.",
  "mr-rider":
    "On-duty GPS, field visits, and travel-expense review: connecting riders, managers, and company operations.",
};

const selectedTech: Record<string, string[]> = {
  "mr-sales": ["Flutter", "React", "Supabase RPC"],
  "mr-rider": ["Flutter", "pgRouting", "MapLibre"],
};

const statusStyle = {
  live: "bg-accent-model/10 text-accent-model ring-accent-model/25",
  shipped: "bg-accent-model/10 text-accent-model ring-accent-model/25",
  "in-progress": "bg-accent-infra/10 text-accent-infra ring-accent-infra/25",
  "case-study-only": "bg-surface-sunken text-text-secondary ring-hairline",
};

export function ProjectSummaryCard({
  project,
  wide = false,
  showPreview = false,
}: {
  project: Project;
  wide?: boolean;
  showPreview?: boolean;
}) {
  const stack = project.stack;
  const tags =
    selectedTech[project.slug] ??
    [
      ...new Set(
        [
          stack?.model?.[0],
          stack?.serving?.[0],
          stack?.product?.[0],
          stack?.infra?.[0],
        ].filter((tag): tag is string => !!tag),
      ),
    ].slice(0, 3);
  const displayTags = tags.length ? tags : project.layers.map((layer) => LAYER_LABEL[layer]);
  const metric = project.metrics?.[0];

  return (
    <Card
      className={cn(
        "relative group h-full p-4 md:p-6 rounded-3xl md:rounded-[2rem] flex flex-col",
        wide && "md:col-span-2",
      )}
    >
      {showPreview && <div className="mb-6"><ProjectPreview slug={project.slug} compact /></div>}
      <div
        className={cn(
          "flex flex-col flex-1",
          wide && "md:grid md:grid-cols-[1.2fr_1fr] md:gap-10",
        )}
      >
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-3">
            <span
              className={cn(
                "w-8 h-8 flex shrink-0 items-center justify-center text-text-muted",
              )}
            >
              <project.icon size={22} strokeWidth={1.5} aria-hidden />
            </span>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold ring-1",
                statusStyle[project.status],
              )}
            >
              {STATUS_LABEL[project.status]}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-3">
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              {summaries[project.slug] ??
                project.hook ??
                "A detailed technical write-up is on the way."}
            </p>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col mt-auto pt-6",
            wide &&
              "md:mt-0 md:pt-0 md:pl-8 md:border-l md:border-hairline md:justify-center",
          )}
        >
          {metric ? (
            <p className="text-sm text-text-secondary mb-4">
              <span className="font-bold text-text-primary">
                {metric.value}
              </span>
              <span className="mx-2 text-text-muted" aria-hidden>
                ·
              </span>
              {metric.label}
            </p>
          ) : project.components ? (
            <p className="text-sm text-text-secondary mb-4">
              <span className="font-bold text-text-primary">
                {project.components.length} connected surfaces
              </span>
              <span className="block text-[13px] leading-relaxed text-text-muted mt-1">
                {project.components
                  .map((component) => component.name)
                  .join(" · ")}
              </span>
            </p>
          ) : null}
          {displayTags.length > 0 && (
            <ul
              aria-label={tags.length ? "Selected technologies" : "Engineering layers"}
              className="flex flex-wrap gap-x-4 gap-y-2 mb-5"
            >
              {displayTags.map((tag) => (
                <li
                  key={tag}
                  className="text-text-muted text-[13px] leading-relaxed"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <span className="border-t border-hairline pt-4 flex items-center justify-between gap-3 text-sm font-bold text-brand-main">
            Explore project
            <span className="w-8 h-8 flex items-center justify-center">
              <ArrowUpRight size={17} aria-hidden />
            </span>
          </span>
        </div>
      </div>
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} project details`}
        className="absolute inset-0 z-20 rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-main"
      />
    </Card>
  );
}
