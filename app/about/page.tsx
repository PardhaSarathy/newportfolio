import { Card } from "@/components/ui/Card";
import { RESUME_URL } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  Database,
  FileText,
  Layers3,
  Server,
  Terminal,
} from "lucide-react";

const expertise = [
  {
    title: "Infrastructure & Deployment",
    icon: Server,
    accent: "text-accent-infra bg-accent-infra/10",
    skills: [
      "WebRTC & LiveKit",
      "Docker & Kubernetes",
      "System architecture & deployment",
      "Workflow automation (n8n)",
      "Complex API integrations",
    ],
  },
  {
    title: "Backend & Data",
    icon: Database,
    accent: "text-accent-serving bg-accent-serving/10",
    skills: ["Python", "Node.js & Express", "SQL & vector databases"],
  },
  {
    title: "Frontend",
    icon: Layers3,
    accent: "text-accent-product bg-accent-product/10",
    skills: ["React", "JavaScript", "HTML & CSS"],
  },
  {
    title: "Core Foundations",
    icon: Terminal,
    accent: "text-brand-main bg-brand-main/10",
    skills: ["C", "Git & version control", "Linux", "Problem solving & DSA"],
  },
];
const principles = [
  {
    title: "System Persistence.",
    text: "Building agents that don’t just react, but remember and evolve over long-term interactions.",
  },
  {
    title: "Human Utility.",
    text: "Bridging the gap between raw AI capability and a product that helps someone do something useful.",
  },
  {
    title: "Latency Matters.",
    text: "Treating responsiveness as part of the experience, especially in real-time voice conversations.",
  },
  {
    title: "Clean Code.",
    text: "Maintainable, typed, and well-documented systems that stay understandable as they grow.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-24 space-y-20 md:space-y-24">
      <section className="space-y-10 md:space-y-14 pt-8 md:pt-12">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-text-primary tracking-tight text-center">
          I&apos;m Pardhu.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-80 md:w-80 md:h-96 group">
              <div className="absolute inset-2 bg-brand-light/30 dark:bg-brand-main/15 blur-2xl rounded-t-[10rem] rounded-b-[2rem] pointer-events-none" />
              <div className="relative w-full h-full rounded-t-[10rem] rounded-b-[2rem] shadow-2xl overflow-hidden bg-brand-main/5 ring-1 ring-hairline">
                <Image
                  src="/assets/pardhu_new.png"
                  alt="Pardhu Karnati"
                  fill
                  priority
                  sizes="(max-width: 767px) 256px, 320px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-7 space-y-5 md:space-y-6 text-center md:text-left">
            <p className="text-xs font-bold text-text-muted uppercase tracking-[0.18em]">
              Based in Hyderabad, India
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary leading-tight">
              A <span className="text-brand-main">Full Stack AI Engineer.</span>
              <br />
              From model to product.
            </h2>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              I build voice, vision, and retrieval systems end to end — from LLM
              orchestration and RAG pipelines to the backend, infrastructure,
              and the product people actually use.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              My focus is connecting those pieces into one useful experience,
              taking ownership of how the whole system fits together.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-main text-white dark:text-[#052018] text-sm font-bold shadow-md shadow-brand-main/20 hover:bg-brand-main/90 transition-colors"
              >
                Explore my work <ArrowUpRight size={16} aria-hidden />
              </Link>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-hairline bg-bg-card/60 text-sm font-bold text-text-primary hover:bg-brand-main/10 transition-colors"
              >
                <FileText size={16} aria-hidden />
                Résumé
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-7" aria-labelledby="expertise-heading">
        <div className="space-y-2">
          <h2
            id="expertise-heading"
            className="text-2xl md:text-3xl font-display font-bold text-text-primary"
          >
            Technical Arsenal
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            The tools and disciplines behind the work.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <Card
            hoverEffect={false}
            className="md:col-span-2 rounded-[2rem] border border-brand-main/25 p-6 md:p-8 shadow-lg shadow-brand-main/5"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-11 h-11 rounded-xl flex shrink-0 items-center justify-center bg-brand-main/10 text-brand-main">
                <BrainCircuit size={23} aria-hidden />
              </span>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-text-muted mb-1">
                  Core focus
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                  AI & Agentic Systems
                </h3>
              </div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                "Large language models",
                "Retrieval-augmented generation",
                "Multi-agent workflows",
                "Multimodal agents: voice, vision & text",
                "Computer vision & OCR",
                "Agentic AI & prompt engineering",
              ].map((skill) => (
                <li
                  key={skill}
                  className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-main shrink-0"
                    aria-hidden
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </Card>
          {expertise.map((area) => (
            <Card
              key={area.title}
              hoverEffect={false}
              className="rounded-[2rem] border border-hairline p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${area.accent}`}
                >
                  <area.icon size={21} aria-hidden />
                </span>
                <h3 className="text-lg md:text-xl font-bold text-text-primary">
                  {area.title}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {area.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-text-secondary leading-relaxed"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-7" aria-labelledby="principles-heading">
        <div className="space-y-2">
          <h2
            id="principles-heading"
            className="text-2xl md:text-3xl font-display font-bold text-text-primary"
          >
            Principles
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            What guides the decisions behind the code.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {principles.map((principle, index) => (
            <Card
              key={principle.title}
              hoverEffect={false}
              className="p-6 md:p-8 rounded-[2rem] border border-hairline"
            >
              <span className="text-brand-main font-mono text-sm font-bold mb-4 block">
                0{index + 1}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3">
                {principle.title}
              </h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                {principle.text}
              </p>
            </Card>
          ))}
        </div>
        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-main py-3 hover:underline"
        >
          Education & credentials <ArrowUpRight size={16} aria-hidden />
        </Link>
      </section>
    </div>
  );
}
