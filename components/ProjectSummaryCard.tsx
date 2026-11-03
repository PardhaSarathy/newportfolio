import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { accentOf, STATUS_LABEL, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const summaries: Record<string, string> = {
  "production-voice-agent":
    "A multilingual AI receptionist handling real customer calls, from speech model to telephony.",
  "drswift-diagnostics":
    "A connected diagnostics platform: patient app, catalog CMS, website, and AI-powered lab reports.",
  "mr-sales":
    "Offline field work, office approvals, and platform operations — connected across mobile, web, and a shared backend.",
  "mr-rider":
    "On-duty GPS, field visits, and travel-expense review — connecting riders, managers, and company operations.",
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
  delay = 0,
  wide = false,
}: {
  project: Project;
  delay?: number;
  wide?: boolean;
}) {
  const accent = accentOf(project);
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
  const metric = project.metrics?.[0];

  return (
    <Card
      delay={delay}
      className={cn(
        "relative group h-full p-6 md:p-8 border border-hairline hover:border-brand-main/30 rounded-[2rem]",
        wide && "md:col-span-2",
      )}
    >
      <div
        className={cn(
          "flex flex-col h-full",
          wide && "md:grid md:grid-cols-[1.2fr_1fr] md:gap-10",
        )}
      >
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-3">
            <span
              className={cn(
                "w-12 h-12 rounded-2xl flex shrink-0 items-center justify-center",
                accent.tile,
              )}
            >
              <project.icon size={25} aria-hidden />
            </span>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-bold ring-1",
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
              <span className="block text-xs text-text-muted mt-1">
                {project.components
                  .map((component) => component.name)
                  .join(" · ")}
              </span>
            </p>
          ) : null}
          {tags.length > 0 && (
            <ul
              aria-label="Selected technologies"
              className="flex flex-wrap gap-2 mb-5"
            >
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-surface-sunken text-text-secondary text-xs font-semibold border border-hairline"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <span className="border-t border-hairline pt-4 flex items-center justify-between gap-3 text-sm font-bold text-brand-main">
            Explore project
            <span className="w-8 h-8 rounded-full bg-brand-main/10 flex items-center justify-center group-hover:bg-brand-main/20 transition-colors">
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
