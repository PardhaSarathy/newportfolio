"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { ProjectSummaryCard } from "@/components/ProjectSummaryCard";
import { FEATURED_PROJECTS } from "@/lib/projects";
import { RESUME_URL } from "@/lib/site";

const CORE_EXPERTISE = [
  "Large Language Models",
  "RAG Systems",
  "Multi-Agent Workflows",
  "Computer Vision & OCR",
  "WebRTC & Infra",
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 space-y-20 md:space-y-28 pt-8 md:pt-16 pb-24">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-light/40 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-main/10 blur-[120px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center space-y-8">
        {/* Availability Badge */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-card/70 dark:bg-white/5 backdrop-blur-md rounded-full text-text-primary font-bold text-xs uppercase tracking-widest border border-hairline shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-main opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-main"></span>
            </span>
            Available for new projects
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.1,
          }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-text-primary leading-[1.1] tracking-tighter">
            Hi. I&apos;m Pardhu. <br />
            <span className="text-brand-main">A Full Stack AI Engineer.</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
            I ship voice, vision and retrieval systems end to end — model to
            backend to product, without a handoff.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 md:pt-6">
            <a
              href="#selected-work"
              className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-main text-white dark:text-[#052018] font-bold text-sm hover:bg-brand-main/90 transition-colors shadow-md shadow-brand-main/20"
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
                className="p-3 text-text-secondary hover:text-brand-main transition-all rounded-full hover:bg-brand-main/10 active:scale-95"
                aria-label="GitHub Profile"
              >
                <Github size={24} />
              </a>

              <a
                href="https://www.linkedin.com/in/pardhasaradhireddy/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-text-secondary hover:text-brand-main transition-all rounded-full hover:bg-brand-main/10 active:scale-95"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Static Core Expertise Tags - Mobile Safe */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduceMotion ? 0 : 0.25,
              duration: reduceMotion ? 0 : 0.6,
            }}
            className="pt-6 md:pt-12 flex flex-col items-center gap-5"
          >
            <p className="text-xs font-bold text-text-muted tracking-[0.2em] uppercase">
              Core Expertise
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-2xl px-2">
              {CORE_EXPERTISE.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-xl bg-surface-sunken border border-hairline text-text-primary text-xs md:text-sm font-semibold transition-colors hover:bg-brand-main/10 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Selected Works Section */}
      <section
        id="selected-work"
        aria-labelledby="selected-work-heading"
        className="space-y-10 scroll-mt-8"
      >
        <div className="flex items-end justify-between gap-4">
          <h2
            id="selected-work-heading"
            className="text-3xl md:text-4xl font-display font-bold text-text-primary"
          >
            Selected Work
          </h2>
          <Link
            href="/projects"
            className="text-brand-main font-bold hover:underline flex items-center gap-1 shrink-0"
          >
            View all <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectSummaryCard
              key={project.slug}
              project={project}
              delay={index * 0.06}
              wide={
                FEATURED_PROJECTS.length % 2 === 1 &&
                index === FEATURED_PROJECTS.length - 1
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
