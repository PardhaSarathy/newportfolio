"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="relative space-y-32 pt-20 pb-32 md:pb-40">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-light/40 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-200/20 blur-[120px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center space-y-8">

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full text-brand-dark font-bold text-xs uppercase tracking-widest border border-white/20 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-main opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-main"></span>
            </span>
            Available for new projects
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-text-primary leading-[1.1] tracking-tighter">
            Hi. I'm Pardhu. <br />
            <span className="text-brand-main/80">A Systems Architect.</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
            I dismantle complex data problems and rebuild them as intelligent, human-centric systems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <a
              href="/assets/Karnati_Reddy_Updated_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-brand-main text-white font-bold text-sm hover:bg-brand-main/90 transition-all shadow-md shadow-brand-main/20 hover:shadow-lg hover:shadow-brand-main/40 active:scale-[0.98]"
            >
              <FileText size={18} />
              <span>Resume</span>
            </a>

            <a
              href="https://github.com/PardhaSarathy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-text-secondary hover:text-brand-main dark:hover:text-[#A9F0D4] transition-colors rounded-full hover:bg-brand-main/10"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>

            <a
              href="https://www.linkedin.com/in/pardhasaradhireddy/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-text-secondary hover:text-brand-main dark:hover:text-[#A9F0D4] transition-colors rounded-full hover:bg-brand-main/10"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
          </div>

          {/* AI Skills Auto-scrolling Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-16 w-full max-w-5xl mx-auto overflow-hidden relative fade-edges"
          >
            <div className="flex w-max animate-marquee gap-4 md:gap-8 hover:[animation-play-state:paused] cursor-default">
              {[
                "Large Language Models (LLMs)",
                "Retrieval-Augmented Generation (RAG)",
                "Multi-Agent Workflows",
                "Multimodal Agents (Voice)",
                "Vision & OCR",
                "Prompt Engineering",
                "Large Language Models (LLMs)",
                "Retrieval-Augmented Generation (RAG)",
                "Multi-Agent Workflows",
                "Multimodal Agents (Voice)",
                "Vision & OCR",
                "Prompt Engineering"
              ].map((skill, index) => (
                <span
                  key={index}
                  className="px-5 py-2.5 rounded-full border border-gray-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-sm text-text-primary dark:text-[#A9F0D4] whitespace-nowrap text-sm font-bold shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </section>

      {/* Selected Works Section */}
      <section className="space-y-10">
        <div className="flex items-end justify-between px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">Selected Work</h2>
          <Link href="/projects" className="text-brand-main font-bold hover:underline flex items-center gap-1">
            View all <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <Card className="group cursor-pointer hover:scale-[1.02] transition-transform duration-500 !p-0 overflow-hidden bg-[#E6F0FF] dark:bg-[#0A1A24] min-h-[400px] flex flex-col">
            <div className="p-10 flex-1 flex flex-col justify-center space-y-4 relative z-10">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/20"></div>
              <h3 className="text-3xl font-bold text-blue-900 dark:text-blue-100">Insurance AI Agent</h3>
              <p className="text-blue-800/70 dark:text-blue-100/70 text-lg leading-relaxed max-w-sm">
                Real-time voice agent for automated claims processing using WebRTC.
              </p>
            </div>
            <div className="h-48 bg-gradient-to-t from-white/40 dark:from-[#0A1A24] to-transparent"></div>
          </Card>

          {/* Project 2 */}
          <Card className="group cursor-pointer hover:scale-[1.02] transition-transform duration-500 !p-0 overflow-hidden bg-[#F0FFE6] dark:bg-[#042011] min-h-[400px] flex flex-col">
            <div className="p-10 flex-1 flex flex-col justify-center space-y-4 relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-2xl mb-4 shadow-lg shadow-green-500/20"></div>
              <h3 className="text-3xl font-bold text-green-900 dark:text-green-100">AI Travel Planner</h3>
              <p className="text-green-800/70 dark:text-green-100/70 text-lg leading-relaxed max-w-sm">
                Generative AI itinerary builder for seamless travel experiences.
              </p>
            </div>
            <div className="h-48 bg-gradient-to-t from-white/40 dark:from-[#042011] to-transparent"></div>
          </Card>
        </div>
      </section>
    </div>
  );
}
