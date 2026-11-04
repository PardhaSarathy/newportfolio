import { ArrowUpRight, FileText, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { ProjectSummaryCard } from "@/components/ProjectSummaryCard";
import { FEATURED_PROJECTS, PUBLISHED_PROJECTS } from "@/lib/projects";
import { ContactInvitation } from "@/components/ContactInvitation";
import { RESUME_URL } from "@/lib/site";
import { PROFILE } from "@/lib/profile";

const CORE_EXPERTISE = [
  "Full-stack products",
  "Flutter & React",
  "Java & Python",
  "Applied AI & RAG",
  "Cloud & system design",
];

const SELECTED_PROJECTS = [
  ...FEATURED_PROJECTS.filter((project) => project.status === "live"),
  ...PUBLISHED_PROJECTS.filter((project) => project.status === "live" && !project.featured),
];

export default function Home() {
  return (
    <div className="home-page relative w-full max-w-5xl mx-auto px-4 pt-8 md:pt-16 pb-24">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-light/40 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-main/10 blur-[120px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="home-hero flex flex-col items-center text-center gap-8">
        {/* Availability Badge */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-card/70 dark:bg-white/5 rounded-full text-text-primary font-semibold text-xs border border-hairline">
            <span className="flex h-2 w-2 relative">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-main"></span>
            </span>
            Available for new projects
          </div>
        </div>

        {/* Introduction */}
        <div className="home-introduction flex flex-col gap-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-text-primary leading-[1.1] tracking-tighter">
            Hi. I&apos;m Pardhu. <br />
            <span className="text-brand-main">A {PROFILE.role}.</span>
          </h1>

          <p className="text-sm md:text-base font-semibold text-brand-main">
            {PROFILE.focus}
          </p>
          <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
            {PROFILE.summary}
          </p>

          <div className="home-actions flex flex-wrap items-center justify-center gap-4 pt-3 md:pt-6">
            <a
              href="#selected-work"
              className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-main text-white dark:text-[#052018] font-bold text-sm hover:bg-brand-main/90 transition-colors duration-150"
            >
              View my work <ArrowUpRight size={18} aria-hidden />
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-12 items-center gap-2 px-5 py-3 rounded-full border border-hairline bg-bg-card/60 text-text-primary font-bold text-sm hover:bg-surface-sunken transition-colors"
            >
              <FileText size={18} />
              <span>Resume</span>
            </a>

            <div className="flex w-full sm:w-auto items-center justify-center gap-2">
              <a
                href="https://github.com/PardhaSarathy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-text-secondary hover:text-brand-main transition-colors rounded-full hover:bg-brand-main/10"
                aria-label="GitHub Profile"
              >
                <Github size={24} />
              </a>

              <a
                href="https://www.linkedin.com/in/pardhasaradhireddy/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-text-secondary hover:text-brand-main transition-colors rounded-full hover:bg-brand-main/10"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-xs sm:text-[13px] text-text-muted" aria-label="Live production projects">
            <span className="font-semibold text-text-secondary">Live work</span>
            {SELECTED_PROJECTS.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="rounded-sm underline decoration-hairline underline-offset-4 hover:text-brand-main transition-colors">
                {project.slug === "drswift-diagnostics" ? "Dr. Swift" : project.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section
        id="selected-work"
        aria-labelledby="selected-work-heading"
        className="mt-12 space-y-8 scroll-mt-8"
      >
        <div className="flex items-end justify-between gap-4">
          <h2
            id="selected-work-heading"
            className="text-3xl md:text-4xl font-display font-bold text-text-primary"
          >
            Selected work
          </h2>
          <Link
            href="/projects"
            className="text-brand-main font-bold hover:underline flex items-center gap-1 shrink-0"
          >
            View all <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SELECTED_PROJECTS.map((project) => (
            <ProjectSummaryCard
              key={project.slug}
              project={project}
              showPreview
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="core-expertise-heading" className="mt-16 md:mt-20 border-t border-hairline pt-8 space-y-4">
        <h2 id="core-expertise-heading" className="text-lg font-display font-bold text-text-primary">Core expertise</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary">
          {CORE_EXPERTISE.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
      </section>
      <div className="mt-16 md:mt-20"><ContactInvitation /></div>
    </div>
  );
}
