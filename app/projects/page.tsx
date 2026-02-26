"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight, Github, Layout, Map, Stethoscope, MessageSquare, ListTodo, Utensils, Network } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Data ---
type Category = "All" | "AI Agents" | "Machine Learning" | "Web Apps";

interface Project {
    id: string;
    title: string;
    description: string;
    category: Category[];
    tech: string[];
    links: { label: string; url: string; icon?: React.ElementType }[];
    visualColor: string;
    icon: React.ElementType;
    bentoClass?: string;
}

const PROJECTS: Project[] = [
    {
        id: "insurance-agent",
        title: "Real-Time Insurance AI",
        description: "Voice-first AI system handling autonomous KYC verification and claims validation with low-latency WebRTC pipelines.",
        category: ["AI Agents", "Web Apps"],
        tech: ["Python", "LiveKit", "WebRTC"],
        links: [
            { label: "View Architecture", url: "#" } // Placeholder
        ],
        visualColor: "bg-blue-500",
        icon: Network,
        bentoClass: "md:col-span-2 lg:col-span-2"
    },
    {
        id: "travel-planner",
        title: "AI Travel Planner",
        description: "Intelligent travel companion that generates personalized itineraries using Generative AI.",
        category: ["AI Agents", "Web Apps"],
        tech: ["React", "LangChain", "GenAI"],
        links: [
            { label: "Live Demo", url: "https://pardhu-travelplanner.vercel.app/" },
            { label: "Code", url: "https://github.com/PardhaSarathy/FINAL_PROJECT.git", icon: Github }
        ],
        visualColor: "bg-emerald-500",
        icon: Map,
        bentoClass: "col-span-1 lg:col-span-1"
    },
    {
        id: "fitvisor",
        title: "FitVisor Stroke Risk",
        description: "Machine Learning model predicting stroke likelihood based on health parameters.",
        category: ["Machine Learning"],
        tech: ["ML", "Python", "Streamlit"],
        links: [
            { label: "View App", url: "https://fitvisor.streamlit.app/" },
            { label: "Code", url: "https://github.com/PardhaSarathy/fitvisor-app.git", icon: Github }
        ],
        visualColor: "bg-rose-500",
        icon: Stethoscope,
        bentoClass: "col-span-1 lg:col-span-1"
    },
    {
        id: "genai-chatbot",
        title: "GenAI Chatbot",
        description: "Interactive conversational agent powered by large language models.",
        category: ["AI Agents"],
        tech: ["LLM", "React"],
        links: [
            { label: "View App", url: "https://pardhugenai.ccbp.tech/" },
            { label: "Code", url: "https://github.com/PardhaSarathy/genAI_ChatBot.git", icon: Github }
        ],
        visualColor: "bg-violet-500",
        icon: MessageSquare,
        bentoClass: "md:col-span-2 lg:col-span-2"
    },
    {
        id: "avoi-site",
        title: "AVOI Company Site",
        description: "High-performance frontend architecture for an AI startup. Focusing on SEO and premium aesthetics.",
        category: ["Web Apps"],
        tech: ["Next.js", "Tailwind", "Framer"],
        links: [
            { label: "View Site", url: "https://avoi.in/" }
        ],
        visualColor: "bg-teal-600",
        icon: Layout,
        bentoClass: "md:col-span-2 lg:col-span-2"
    },
    {
        id: "food-munch",
        title: "Food Munch",
        description: "Responsive food ordering platform UI.",
        category: ["Web Apps"],
        tech: ["HTML", "CSS", "Bootstrap"],
        links: [
            { label: "View App", url: "https://parthasaradhi.ccbp.tech/" },
            { label: "Code", url: "https://github.com/PardhaSarathy/FoodMunch.git", icon: Github }
        ],
        visualColor: "bg-orange-500",
        icon: Utensils,
        bentoClass: "col-span-1 lg:col-span-1"
    },
    {
        id: "smart-todo",
        title: "Smart Todo List",
        description: "Dynamic task management application with persistent storage.",
        category: ["Web Apps"],
        tech: ["JavaScript", "DOM"],
        links: [
            { label: "View App", url: "https://pardhasaradhi7.ccbp.tech/" },
            { label: "Code", url: "https://github.com/PardhaSarathy/TODO.git", icon: Github }
        ],
        visualColor: "bg-yellow-500",
        icon: ListTodo,
        bentoClass: "col-span-1 lg:col-span-1"
    }
];

const CATEGORIES: Category[] = ["All", "AI Agents", "Machine Learning", "Web Apps"];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");

    const filteredProjects = PROJECTS.filter(project =>
        activeCategory === "All" || project.category.includes(activeCategory)
    );

    return (
        <div className="min-h-screen pb-32 md:pb-40 pt-10 px-4 md:px-8 max-w-7xl mx-auto space-y-12">

            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-6">
                <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary">
                    Selected Works.
                </h1>
                <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
                    Engineering intelligence into software. From autonomous agents to scalable web systems.
                </p>

                {/* Categories / Filter Tabs - Premium Segmented Control */}
                <div className="flex md:flex-wrap justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 md:gap-3 mt-10 p-1.5 md:p-2 bg-gray-100/80 dark:bg-[#0F261E]/60 backdrop-blur-xl rounded-[2.5rem] md:rounded-full border border-gray-200/50 dark:border-white/10 w-max max-w-[95vw] shadow-sm mx-auto">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-5 md:px-7 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 relative whitespace-nowrap",
                                activeCategory === cat
                                    ? "text-white dark:text-[#0A1C16]"
                                    : "text-text-secondary hover:text-text-primary hover:bg-white/50 dark:hover:bg-white/10"
                            )}
                        >
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-brand-main dark:bg-[#A9F0D4] rounded-full shadow-md"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                            transition={{ duration: 0.3 }}
                            className={cn("h-full", project.bentoClass)}
                        >
                            <Card className="h-full group flex flex-col justify-between p-8 bg-white dark:bg-[#0F261E] hover:bg-gray-50/80 dark:hover:bg-[#153026] border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] relative overflow-hidden">

                                {/* Top Content */}
                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", project.visualColor)}>
                                            <project.icon size={28} />
                                        </div>
                                        {/* Link arrow appears on hover */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <ArrowUpRight className="text-gray-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-text-primary mb-3">
                                            {project.title}
                                        </h3>
                                        <p className="text-text-secondary text-base leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Tech & Links */}
                                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4 relative z-10">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <span key={t} className="px-2.5 py-1 bg-gray-100/80 text-gray-500 text-[0.65rem] font-bold rounded-md uppercase tracking-[0.15em]">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        {project.links.map((link, idx) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm font-bold text-text-primary hover:text-brand-main transition-colors"
                                            >
                                                {link.icon && <link.icon size={16} />}
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Background Decoration */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-50 to-transparent rounded-bl-[10rem] -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

        </div>
    );
}
