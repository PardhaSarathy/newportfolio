"use client";

import { Card } from "@/components/ui/Card";
import { ArrowUpRight, Github, Dumbbell, Stethoscope, Utensils, ListTodo, MessageSquare, Map, Database, Layout } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface TagProps {
    children: React.ReactNode;
}

function Tag({ children }: TagProps) {
    return (
        <span className="px-3 py-1 bg-brand-light text-brand-dark text-xs font-mono rounded-full font-bold border border-brand-main/20">
            {children}
        </span>
    );
}

export default function ProjectsPage() {
    return (
        <div className="space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-display font-bold text-text-primary">Lab / Projects</h1>
                    <p className="text-text-secondary mt-2 max-w-lg">
                        Full-stack applications, AI models, and real-world solutions.
                    </p>
                </div>
                <span className="text-sm font-mono text-text-secondary bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                    Selected Works
                </span>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Featured Project 1 - Real-Time Insurance AI Agent */}
                <Card className="md:col-span-2 !p-0 overflow-hidden bg-white group row-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
                        <div className="p-8 md:p-12 space-y-8 flex flex-col justify-center relative z-10">
                            <div className="flex gap-2 flex-wrap">
                                <Tag>Python</Tag>
                                <Tag>LiveKit</Tag>
                                <Tag>WebRTC</Tag>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-text-primary mb-4">Real-Time Insurance AI Agent</h2>
                                <p className="text-text-secondary leading-loose text-lg">
                                    A voice-first AI system that autonomously handles KYC verification and claims validation.
                                    Engineered with <strong className="text-brand-dark">low-latency WebRTC pipelines</strong> and an intelligent state machine.
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Link href="#" className="flex items-center gap-2 px-6 py-3 bg-brand-dark text-white rounded-full font-bold hover:bg-brand-main transition-colors shadow-lg shadow-brand-dark/20">
                                    View Architecture <ArrowUpRight size={18} />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-bg-mist p-8 flex items-center justify-center min-h-[300px] border-l border-gray-100 relative overflow-hidden group-hover:bg-brand-light/30 transition-colors duration-700">
                            {/* Flowchart Visualization */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white w-full max-w-sm relative"
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-brand-main/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                                <div className="flex flex-col gap-4 items-center relative z-10">
                                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm w-full border border-gray-100">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">👤</div>
                                        <span className="text-xs font-bold text-gray-600">User Voice</span>
                                    </div>
                                    <div className="h-6 w-0.5 bg-gray-200"></div>
                                    <div className="flex items-center gap-3 bg-brand-dark text-white px-4 py-3 rounded-xl shadow-lg w-full ring-4 ring-brand-light/50">
                                        <div className="w-8 h-8 rounded-full bg-brand-main flex items-center justify-center animate-pulse">⚡️</div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold">AI Agent Core</span>
                                            <span className="text-[10px] opacity-60 font-mono">Processing...</span>
                                        </div>
                                    </div>
                                    <div className="h-6 w-0.5 bg-gray-200"></div>
                                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm w-full border border-gray-100">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✅</div>
                                        <span className="text-xs font-bold text-gray-600">Claims Validated</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Card>

                {/* AVOI Company Site */}
                <Card className="flex flex-col justify-between h-full hover:bg-white transition-colors group min-h-[300px]">
                    <div className="space-y-6">
                        <div className="w-14 h-14 bg-brand-dark text-white rounded-2xl flex items-center justify-center shadow-md shadow-brand-dark/20 group-hover:scale-110 transition-transform duration-300">
                            <Layout size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-text-primary mb-2">AVOI Company Site</h3>
                            <p className="text-text-secondary leading-relaxed text-sm">
                                High-performance frontend architecture for an AI startup. Focusing on SEO, load times, and premium aesthetics.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                        <Tag>Next.js</Tag>
                        <Tag>Tailwind</Tag>
                        <Tag>Framer</Tag>
                    </div>
                </Card>

                {/* Featured Project 2 - AI Travel Planner */}
                <Card className="md:col-span-2 !p-0 overflow-hidden bg-white group row-span-2 bg-gradient-to-br from-blue-50 to-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
                        <div className="p-8 md:p-12 space-y-8 flex flex-col justify-center relative z-10">
                            <div className="flex gap-2 flex-wrap">
                                <Tag>React</Tag>
                                <Tag>Python</Tag>
                                <Tag>Web</Tag>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-text-primary mb-4">AI Travel Planner</h2>
                                <p className="text-text-secondary leading-loose text-lg">
                                    An intelligent travel companion that generates personalized itineraries.
                                    (Final Year Project).
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <a href="https://pardhu-travelplanner.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-brand-dark text-white rounded-full font-bold hover:bg-brand-main transition-colors shadow-lg shadow-brand-dark/20">
                                    Live Demo <ArrowUpRight size={18} />
                                </a>
                                <a href="https://github.com/PardhaSarathy/FINAL_PROJECT.git" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-text-primary rounded-full font-bold hover:bg-gray-200 transition-colors">
                                    <Github size={20} />
                                </a>
                            </div>
                        </div>

                        <div className="bg-bg-mist p-8 flex items-center justify-center min-h-[300px] border-l border-gray-100 relative overflow-hidden group-hover:bg-brand-light/30 transition-colors duration-700">
                            {/* Map/Travel Visual */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white w-full max-w-sm relative"
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="flex flex-col gap-4 items-center">
                                    <Map size={48} className="text-brand-main" />
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-main w-2/3"></div>
                                    </div>
                                    <div className="flex justify-between w-full text-xs font-mono text-gray-500">
                                        <span>Origin</span>
                                        <span>Destination</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Card>


                {/* ML Stroke Risk Predictor */}
                <Card className="flex flex-col justify-between h-full hover:bg-white transition-colors group min-h-[300px] md:col-start-3">
                    <div className="space-y-6">
                        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                            <Stethoscope size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">Stroke Risk Predictor</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Machine Learning model to predict stroke likelihood based on health parameters.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-4">
                        <div className="flex gap-2 flex-wrap">
                            <Tag>ML</Tag>
                            <Tag>Streamlit</Tag>
                        </div>
                        <div className="flex gap-3">
                            <a href="https://fitvisor.streamlit.app/" target="_blank" className="font-bold text-sm hover:underline">View App</a>
                            <a href="https://github.com/PardhaSarathy/fitvisor-app.git" target="_blank" className="text-gray-400 hover:text-black transition-colors"><Github size={18} /></a>
                        </div>
                    </div>
                </Card>

                {/* Generative AI Chatbot */}
                <Card className="flex flex-col justify-between h-full hover:bg-white transition-colors group min-h-[300px]">
                    <div className="space-y-6">
                        <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-sm">
                            <MessageSquare size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">GenAI Chatbot</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Interactive chatbot powered by Generative AI models.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-4">
                        <div className="flex gap-2 flex-wrap">
                            <Tag>AI</Tag>
                        </div>
                        <div className="flex gap-3">
                            <a href="https://pardhugenai.ccbp.tech/" target="_blank" className="font-bold text-sm hover:underline">View App</a>
                            <a href="https://github.com/PardhaSarathy/genAI_ChatBot.git" target="_blank" className="text-gray-400 hover:text-black transition-colors"><Github size={18} /></a>
                        </div>
                    </div>
                </Card>

                {/* Smart Todo List */}
                <Card className="flex flex-col justify-between h-full hover:bg-white transition-colors group min-h-[250px]">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center shadow-sm">
                            <ListTodo size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-text-primary">Smart Todo List</h3>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                        <div className="flex gap-3">
                            <a href="https://pardhasaradhi7.ccbp.tech/" target="_blank" className="font-bold text-xs hover:underline">View App</a>
                            <a href="https://github.com/PardhaSarathy/TODO.git" target="_blank" className="text-gray-400 hover:text-black transition-colors"><Github size={16} /></a>
                        </div>
                    </div>
                </Card>

                {/* Food Munch */}
                <Card className="flex flex-col justify-between h-full hover:bg-white transition-colors group min-h-[250px]">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm">
                            <Utensils size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-text-primary">Food Munch</h3>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                        <div className="flex gap-3">
                            <a href="https://parthasaradhi.ccbp.tech/" target="_blank" className="font-bold text-xs hover:underline">View App</a>
                            <a href="https://github.com/PardhaSarathy/FoodMunch.git" target="_blank" className="text-gray-400 hover:text-black transition-colors"><Github size={16} /></a>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    )
}
