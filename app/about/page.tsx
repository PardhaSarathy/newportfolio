"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="pb-20">

            {/* 1. Hero / Intro Section (Top of Page) */}
            <section className="flex flex-col items-center justify-center space-y-16 pt-24 pb-20 animate-in fade-in zoom-in-95 duration-700">

                {/* Main Header - Centered */}
                <h1 className="text-5xl sm:text-6xl md:text-9xl font-display font-bold text-text-primary tracking-tight text-center">
                    I'm Pardhu.
                </h1>

                {/* Content Grid: Arch Image (Left) + Text (Right) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center max-w-6xl mx-auto px-6">

                    {/* Left Col: Arch Image */}
                    <div className="md:col-span-5 flex justify-center md:justify-end">
                        {/* Glow wrapper */}
                        <div className="relative w-64 h-80 md:w-80 md:h-96 transform hover:scale-105 transition-transform duration-500 group">
                            {/* Ambient background glow */}
                            <div className="absolute inset-2 bg-brand-light/30 dark:bg-brand-main/20 blur-2xl rounded-t-[10rem] rounded-b-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Image Container with Inner Glow */}
                            <div className="relative w-full h-full rounded-t-[10rem] rounded-b-[2rem] shadow-2xl overflow-hidden bg-brand-main/5 ring-1 ring-white/10 dark:ring-white/5 backdrop-blur-sm">
                                <Image
                                    src="/assets/pardhu_new.png"
                                    alt="Pardhu"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Bio Text */}
                    <div className="md:col-span-7 space-y-8 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary leading-tight break-words">
                            I'm an <span className="text-brand-main">AI Systems Architect</span> working remotely from <br className="block md:hidden" />35°C Hyderabad.
                        </h2>

                        <div className="space-y-6 text-xl md:text-2xl text-text-secondary leading-relaxed">
                            <p>
                                Over the past few years, I've worked in various areas of AI, including LLM orchestration, RAG pipelines, and autonomous agents.
                            </p>
                            <p>
                                I'm proud to have worn many hats.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* 2. Experience Section - Pill Cards */}
            <section className="space-y-12 mt-10 max-w-4xl mx-auto px-4">
                <h2 className="text-sm font-bold text-text-secondary tracking-widest uppercase pl-4">Experience</h2>

                <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="group relative bg-brand-light/30 dark:bg-[#186E4A] text-brand-dark dark:text-[#D1EBE1] border border-brand-main/10 dark:border-white/10 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                            <h3 className="text-3xl md:text-4xl font-display font-bold">Freelance AI Engineer</h3>
                            <span className="text-brand-main/80 dark:text-[#A9F0D4] font-mono text-lg">2024 - Present</span>
                        </div>
                        <p className="text-brand-dark/80 dark:text-[#8EBAAA] text-lg md:text-xl leading-relaxed max-w-2xl">
                            Architecting custom voice agents and RAG pipelines for startups. Focusing on latency optimization and reliable tool-use patterns.
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="group relative bg-text-secondary/10 hover:bg-text-secondary/15 dark:bg-white/5 dark:hover:bg-white/10 text-text-primary dark:text-[#D1EBE1] border border-transparent dark:border-white/10 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                            <h3 className="text-3xl md:text-4xl font-display font-bold">Undergraduate Researcher</h3>
                            <span className="text-text-secondary dark:text-[#8EBAAA] font-mono text-lg">2020 - 2024</span>
                        </div>
                        <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl">
                            Specialized in Machine Learning and Data Science. Published papers on predictive healthcare models.
                        </p>
                    </div>
                </div>
            </section>


            {/* 3. Technical Arsenal (Bento Grid) */}
            <section className="space-y-12 mt-32 max-w-5xl mx-auto px-4">
                <h2 className="text-sm font-bold text-text-secondary tracking-widest uppercase pl-4">Technical Arsenal</h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                    {/* 1. AI & Agentic Systems (Spans full width) */}
                    <Card className="md:col-span-12 bg-white dark:bg-[#0A1C16] border border-brand-main/20 dark:border-[#A9F0D4]/20 p-8 md:p-10 rounded-[2rem] shadow-lg shadow-brand-main/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-main/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 relative z-10 flex items-center gap-3">
                            <span className="text-brand-main">01.</span> AI & Agentic Systems
                        </h3>
                        <div className="flex flex-wrap gap-2 md:gap-3 relative z-10">
                            {[
                                "Large Language Models (LLMs)",
                                "Retrieval-Augmented Generation (RAG)",
                                "Multi-Agent Workflows",
                                "Multimodal Agents (Voice, Vision, Text)",
                                "Computer Vision & OCR",
                                "Agentic AI & Prompt Engineering"
                            ].map(skill => (
                                <span key={skill} className="px-4 py-2 bg-brand-light/30 dark:bg-[#186E4A]/40 text-brand-dark dark:text-[#A9F0D4] font-semibold text-sm rounded-xl border border-brand-main/10 dark:border-brand-main/30">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>

                    {/* 2. Real-Time Communication & Infrastructure (Spans 7 cols) */}
                    <Card className="md:col-span-7 bg-[#Fdfcf8] dark:bg-[#0F2A21] border-none p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                            <span className="text-text-secondary">02.</span> Infrastructure & Deployment
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "WebRTC", "LiveKit", "Docker", "Kubernetes",
                                "System Architecture & Deployment", "Workflow Automation (n8n)",
                                "Complex API Integrations"
                            ].map(skill => (
                                <span key={skill} className="px-3 py-1.5 bg-white/60 dark:bg-black/20 text-text-secondary dark:text-[#D1EBE1] text-sm font-medium rounded-lg border border-gray-200 dark:border-white/5">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>

                    {/* 3. Backend & Data Engineering (Spans 5 cols) */}
                    <Card className="md:col-span-5 bg-[#Fdfcf8] dark:bg-[#0F2A21] border-none p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                            <span className="text-text-secondary">03.</span> Backend & Data
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Python (Advanced)", "Node.js & Express",
                                "SQL", "Vector Databases"
                            ].map(skill => (
                                <span key={skill} className="px-3 py-1.5 bg-white/60 dark:bg-black/20 text-text-secondary dark:text-[#D1EBE1] text-sm font-medium rounded-lg border border-gray-200 dark:border-white/5">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>

                    {/* 4. Frontend Development (Spans 6 cols) */}
                    <Card className="md:col-span-6 bg-[#Fdfcf8] dark:bg-[#0F2A21] border-none p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                            <span className="text-text-secondary">04.</span> Frontend
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "ReactJS", "JavaScript", "HTML5 & CSS3"
                            ].map(skill => (
                                <span key={skill} className="px-3 py-1.5 bg-white/60 dark:bg-black/20 text-text-secondary dark:text-[#D1EBE1] text-sm font-medium rounded-lg border border-gray-200 dark:border-white/5">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>

                    {/* 5. Core Programming & Tools (Spans 6 cols) */}
                    <Card className="md:col-span-6 bg-[#Fdfcf8] dark:bg-[#0F2A21] border-none p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                            <span className="text-text-secondary">05.</span> Core Foundations
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "C", "Git & Version Control",
                                "Linux OS", "Problem Solving & DSA"
                            ].map(skill => (
                                <span key={skill} className="px-3 py-1.5 bg-white/60 dark:bg-black/20 text-text-secondary dark:text-[#D1EBE1] text-sm font-medium rounded-lg border border-gray-200 dark:border-white/5">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>


            {/* 4. Philosophy Grid (Blocks) */}
            <section className="space-y-12 mt-32 max-w-5xl mx-auto px-4">
                <h2 className="text-sm font-bold text-text-secondary tracking-widest uppercase pl-4">Principles</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-[#Fdfcf8] dark:bg-[#0A1C16] hover:bg-white dark:hover:bg-[#0F2A21] p-10 rounded-[2.5rem] transition-all duration-300 border-none shadow-sm hover:shadow-lg">
                        <span className="text-brand-main font-display font-bold text-2xl mb-4 block">01</span>
                        <h3 className="text-2xl font-bold text-text-primary mb-3">System Persistence.</h3>
                        <p className="text-text-secondary text-lg leading-relaxed">Building agents that don't just react, but remember and evolve over long-term interactions.</p>
                    </Card>

                    <Card className="bg-[#Fdfcf8] dark:bg-[#0A1C16] hover:bg-white dark:hover:bg-[#0F2A21] p-10 rounded-[2.5rem] transition-all duration-300 border-none shadow-sm hover:shadow-lg">
                        <span className="text-brand-main font-display font-bold text-2xl mb-4 block">02</span>
                        <h3 className="text-2xl font-bold text-text-primary mb-3">Human Utility.</h3>
                        <p className="text-text-secondary text-lg leading-relaxed">AI shouldn't just be smart; it must be useful. Bridging the gap between raw capability and user need.</p>
                    </Card>

                    <Card className="bg-[#Fdfcf8] dark:bg-[#0A1C16] hover:bg-white dark:hover:bg-[#0F2A21] p-10 rounded-[2.5rem] transition-all duration-300 border-none shadow-sm hover:shadow-lg">
                        <span className="text-brand-main font-display font-bold text-2xl mb-4 block">03</span>
                        <h3 className="text-2xl font-bold text-text-primary mb-3">Latency Matters.</h3>
                        <p className="text-text-secondary text-lg leading-relaxed">Optimizing every millisecond in voice pipelines to create creating feeling of natural conversation.</p>
                    </Card>

                    <Card className="bg-[#Fdfcf8] dark:bg-[#0A1C16] hover:bg-white dark:hover:bg-[#0F2A21] p-10 rounded-[2.5rem] transition-all duration-300 border-none shadow-sm hover:shadow-lg">
                        <span className="text-brand-main font-display font-bold text-2xl mb-4 block">04</span>
                        <h3 className="text-2xl font-bold text-text-primary mb-3">Clean Code.</h3>
                        <p className="text-text-secondary text-lg leading-relaxed">Maintainable, typed, and well-documented architectures that scale without accumulation of debt.</p>
                    </Card>
                </div>
            </section>
        </div>
    );
}
