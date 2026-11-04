import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Layers3,
  Lightbulb,
  Wrench,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import {
  PUBLISHED_PROJECTS,
  LAYERS,
  LAYER_LABEL,
  STATUS_LABEL,
  accentOf,
  accentOfLayer,
} from "@/lib/projects";
import { cn } from "@/lib/utils";
import { createPageMetadata } from "@/lib/site";
import { ProjectSectionNav } from "@/components/ProjectSectionNav";
import { ProjectSystemMap, hasSystemMap } from "@/components/ProjectSystemMap";
import { ProjectPreview, hasProjectPreview } from "@/components/ProjectPreview";

export function generateStaticParams() {
  return PUBLISHED_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PUBLISHED_PROJECTS.find((project) => project.slug === slug);
  if (!project)
    return {
      title: "Project not found | Pardhu",
      robots: { index: false, follow: false },
    };
  return createPageMetadata({
    title: `${project.title} | Pardhu`,
    description:
      project.hook ??
      `Explore ${project.title}, an engineering project by Pardhu Karnati. A detailed technical write-up is in progress.`,
    path: `/projects/${project.slug}`,
    imageKey: `project-${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PUBLISHED_PROJECTS.find((project) => project.slug === slug);
  if (!project) notFound();
  const accent = accentOf(project);
  const next =
    PUBLISHED_PROJECTS[
      (PUBLISHED_PROJECTS.indexOf(project) + 1) % PUBLISHED_PROJECTS.length
    ];
  const hasDetails =
    project.components || project.architecture || project.challenge;

  const sections = [
    { id: "overview", label: "Project brief" },
    ...(project.components ? [{ id: "product", label: "What I built" }] : []),
    ...(project.architecture || hasSystemMap(slug)
      ? [{ id: "architecture", label: "Architecture" }]
      : []),
    ...(project.challenge ? [{ id: "decisions", label: "Decisions" }] : []),
    ...(project.stack ? [{ id: "stack", label: "Stack" }] : []),
  ];

  return (
    <article className="case-study relative flex flex-col gap-12 md:gap-16 w-full max-w-5xl mx-auto px-4 pb-24">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-brand-main transition-colors rounded-lg focus-visible:outline-2 focus-visible:outline-brand-main focus-visible:outline-offset-4"
      >
        <ArrowLeft size={16} aria-hidden /> Back to projects
      </Link>

      <header className="case-hero flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <div
          className={cn(
            "case-hero-icon w-20 h-20 rounded-3xl flex items-center justify-center",
            accent.tile,
          )}
        >
          <project.icon size={38} strokeWidth={1.5} aria-hidden />
        </div>
        <span className="px-4 py-1.5 rounded-full bg-bg-card/70 backdrop-blur-md border border-hairline text-xs font-bold text-text-secondary">
          {STATUS_LABEL[project.status]}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-text-primary tracking-tight leading-[1.1] [overflow-wrap:anywhere]">
          {project.title}
          <span className="text-brand-main">.</span>
        </h1>
        {project.hook ? (
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
            {project.hook}
          </p>
        ) : (
          <p className="text-text-secondary">
            This project is in development. A detailed write-up is on the way.
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-2">
          {project.layers.map((layer) => (
            <span
              key={layer}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide",
                accentOfLayer(layer).tile,
              )}
            >
              {LAYER_LABEL[layer]}
            </span>
          ))}
        </div>
        {project.proof?.length ? (
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {project.proof.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-main text-white dark:text-[#052018] px-6 py-3 text-sm font-bold shadow-md shadow-brand-main/20 hover:bg-brand-main/90 transition-colors"
              >
                {link.label}
                <ArrowUpRight size={16} aria-hidden />
              </a>
            ))}
          </div>
        ) : null}
      </header>

      {sections.length > 2 && <ProjectSectionNav sections={sections} />}

      <div
        id="overview"
        className="scroll-mt-28 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="rounded-2xl border border-hairline bg-bg-card/70 backdrop-blur-sm p-6">
          <p className="text-xs tracking-wide font-bold text-text-muted mb-2">
            My role
          </p>
          <p className="font-semibold text-text-primary leading-relaxed">
            {project.role ?? "Engineering"}
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-bg-card/70 backdrop-blur-sm p-6">
          <p className="text-xs tracking-wide font-bold text-text-muted mb-2">
            {project.components ? "Project scope" : "Focus"}
          </p>
          <p className="font-semibold text-text-primary leading-relaxed">
            {project.components
              ? `${project.components.length} connected surfaces: ${project.components.map((component) => component.name).join(", ")}`
              : project.layers.map((layer) => LAYER_LABEL[layer]).join(" · ")}
          </p>
        </div>
      </div>

      {hasProjectPreview(slug) && <ProjectPreview slug={slug} />}

      {project.metrics && (
        <section
          aria-label="Project highlights"
          className="flex flex-wrap justify-center gap-8 md:gap-16 rounded-3xl border border-brand-main/20 bg-brand-main/5 px-6 py-8"
        >
          {project.metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-brand-main">
                {metric.value}
              </p>
              <p className="mt-2 text-xs font-bold tracking-wide text-text-secondary">
                {metric.label}
              </p>
            </div>
          ))}
        </section>
      )}

      {project.components && (
        <section id="product" className="space-y-6 scroll-mt-28">
          <SectionHeading
            icon={<Layers3 size={22} aria-hidden />}
            title="What I built"
            subtitle="The connected surfaces that make up the product."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {project.components.map((component) => (
              <Card
                hoverEffect={false}
                key={component.name}
                className="border border-hairline flex flex-col items-start gap-4"
              >
                <span
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center",
                    accent.tile,
                  )}
                >
                  <component.icon size={22} aria-hidden />
                </span>
                <h3 className="text-xl font-bold text-text-primary">
                  {component.name}
                </h3>
                {component.detail && (
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {component.detail}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}

      {(project.architecture || hasSystemMap(slug)) && (
        <section id="architecture" className="space-y-6 scroll-mt-28">
          <SectionHeading
            icon={<Layers3 size={22} aria-hidden />}
            title="How it fits together"
            subtitle="The architecture behind the experience."
          />
          <ProjectSystemMap slug={slug} />
          {project.architecture && (
            <Card hoverEffect={false} className="border border-hairline">
              <p className="text-text-secondary text-base md:text-lg leading-[1.9]">
                {project.architecture}
              </p>
            </Card>
          )}
        </section>
      )}

      {project.challenge && (
        <section id="decisions" className="space-y-6 scroll-mt-28">
          <SectionHeading
            icon={<Lightbulb size={22} aria-hidden />}
            title="Engineering decisions"
            subtitle="The details that shaped the implementation."
          />
          <Card
            hoverEffect={false}
            className="border border-brand-main/20 bg-brand-main/5"
          >
            <p className="text-text-secondary text-base md:text-lg leading-[1.9]">
              {project.challenge}
            </p>
          </Card>
        </section>
      )}

      {project.stack && (
        <section id="stack" className="space-y-6 scroll-mt-28">
          <SectionHeading
            icon={<Wrench size={22} aria-hidden />}
            title="The stack"
            subtitle="Tools and technologies, grouped by the work they do."
          />
          <Card
            hoverEffect={false}
            className="border border-hairline divide-y divide-hairline"
          >
            {LAYERS.filter((layer) => project.stack?.[layer]?.length).map(
              (layer) => (
                <div
                  key={layer}
                  className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4"
                >
                  <h3 className="text-sm font-bold text-text-primary pt-1">
                    {LAYER_LABEL[layer]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack?.[layer]?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-surface-sunken border border-hairline text-sm text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ),
            )}
          </Card>
        </section>
      )}

      {!hasDetails && (
        <Card
          hoverEffect={false}
          className="text-center border border-hairline space-y-4"
        >
          <h2 className="text-2xl font-display font-bold text-text-primary">
            More of the story, soon.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-xl mx-auto">
            A fuller technical walkthrough is being prepared. If you’re curious
            about this project, I’d be happy to talk through it.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-brand-main font-bold text-sm"
          >
            Ask about this project <ArrowUpRight size={16} aria-hidden />
          </Link>
        </Card>
      )}

      <div className="text-center space-y-3 px-2">
        <p className="text-sm text-text-muted leading-relaxed">
          {project.proof?.length
            ? "Explore the live project using the link above."
            : project.status === "case-study-only"
              ? "Client work: a public demo is not available on this page."
              : "A public demo link is not available yet."}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-main"
        >
          Let’s talk about the work <ArrowUpRight size={16} aria-hidden />
        </Link>
      </div>

      <nav
        aria-label="Project navigation"
        className="border-t border-hairline pt-8 flex flex-col sm:flex-row sm:justify-between gap-6"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-brand-main"
        >
          <ArrowLeft size={16} aria-hidden /> All projects
        </Link>
        <Link href={`/projects/${next.slug}`} className="group sm:text-right">
          <span className="block text-xs text-text-muted tracking-wide mb-2">
            Next project
          </span>
          <span className="inline-flex items-center gap-2 text-lg font-bold text-text-primary group-hover:text-brand-main">
            {next.title}
            <ArrowRight size={18} aria-hidden />
          </span>
        </Link>
      </nav>
    </article>
  );
}

function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-2">
      <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-display font-bold text-text-primary">
        <span className="text-brand-main">{icon}</span>
        {title}
      </h2>
      <p className="text-sm text-text-secondary leading-relaxed">{subtitle}</p>
    </div>
  );
}
