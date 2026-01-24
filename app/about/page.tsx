"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { ArrowDown } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="pb-20">

            {/* 1. Hero / Intro Section (Top of Page) */}
            <section className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">

                {/* Avatar Placeholder */}
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full bg-gray-200 border-8 border-white shadow-2xl overflow-hidden mb-6">
                    <div className="absolute inset-0 bg-brand-main/10 flex items-center justify-center text-4xl">👨‍💻</div>
                    {/* Add real image here later */}
                </div>

                <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary">
                    I'm Pardhu.
                </h1>

                <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl">
                    An AI Systems Architect passionate about building <br className="hidden md:block" />
                    <span className="text-brand-main font-bold">autonomous agents</span> and scalable systems.
                </p>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="pt-12 opacity-50"
                >
                    <ArrowDown size={32} />
                </motion.div>
            </section>


            {/* 2. Scrollable Content - Timeline & Grid */}
            <section className="space-y-20 mt-20">

                {/* Experience Timeline Blocks */}
                <div className="space-y-12">
                    <h2 className="text-sm font-bold text-text-secondary tracking-widest uppercase mb-8 border-b border-gray-200 pb-4">Experience</h2>

                    <div className="relative border-l-2 border-brand-light pl-8 space-y-12 ml-4">
                        {/* Item 1 */}
                        <div className="relative">
                            <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-brand-main border-4 border-white shadow-sm"></span>
                            <h3 className="text-2xl font-bold text-text-primary">Freelance AI Engineer</h3>
                            <p className="text-brand-main font-mono text-sm mb-2">2024 - Present</p>
                            <p className="text-text-secondary leading-relaxed max-w-2xl">
                                Architecting custom voice agents and RAG pipelines for startups. Focusing on latency optimization and reliable tool-use patterns.
                            </p>
                        </div>

                        {/* Item 2 */}
                        <div className="relative">
                            <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-gray-300 border-4 border-white shadow-sm"></span>
                            <h3 className="text-2xl font-bold text-text-primary">Undergraduate Researcher</h3>
                            <p className="text-brand-main font-mono text-sm mb-2">2020 - 2024</p>
                            <p className="text-text-secondary leading-relaxed max-w-2xl">
                                Specialized in Machine Learning and Data Science. Published papers on predictive healthcare models.
                            </p>
                        </div>
                    </div>
                </div>


                {/* Philosophy Grid (Blocks) */}
                <div className="space-y-8">
                    <h2 className="text-sm font-bold text-text-secondary tracking-widest uppercase mb-8 border-b border-gray-200 pb-4">Principles</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-[#Fdfcf8] hover:bg-white transition-colors border-none shadow-sm hover:shadow-md">
                            <span className="text-brand-main font-display font-bold text-xl mb-2 block">01</span>
                            <h3 className="text-xl font-bold text-text-primary mb-3">System Persistence.</h3>
                            <p className="text-text-secondary">Building agents that don't just react, but remember and evolve over long-term interactions.</p>
                        </Card>

                        <Card className="bg-[#Fdfcf8] hover:bg-white transition-colors border-none shadow-sm hover:shadow-md">
                            <span className="text-brand-main font-display font-bold text-xl mb-2 block">02</span>
                            <h3 className="text-xl font-bold text-text-primary mb-3">Human Utility.</h3>
                            <p className="text-text-secondary">AI shouldn't just be smart; it must be useful. Bridging the gap between raw capability and user need.</p>
                        </Card>

                        <Card className="bg-[#Fdfcf8] hover:bg-white transition-colors border-none shadow-sm hover:shadow-md">
                            <span className="text-brand-main font-display font-bold text-xl mb-2 block">03</span>
                            <h3 className="text-xl font-bold text-text-primary mb-3">Latency Matters.</h3>
                            <p className="text-text-secondary">Optimizing every millisecond in voice pipelines to create creating feeling of natural conversation.</p>
                        </Card>

                        <Card className="bg-[#Fdfcf8] hover:bg-white transition-colors border-none shadow-sm hover:shadow-md">
                            <span className="text-brand-main font-display font-bold text-xl mb-2 block">04</span>
                            <h3 className="text-xl font-bold text-text-primary mb-3">Clean Code.</h3>
                            <p className="text-text-secondary">Maintainable, typed, and well-documented architectures that scale without accumulation of debt.</p>
                        </Card>
                    </div>
                </div>

            </section>
        </div>
    );
}
