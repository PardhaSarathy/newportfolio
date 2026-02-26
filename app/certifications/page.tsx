"use client";

import { Card } from "@/components/ui/Card";
import { BookOpen, Award } from "lucide-react";

export default function CertificationsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <header>
                <h1 className="text-4xl font-display font-bold text-text-primary">Shelf</h1>
                <p className="text-text-secondary mt-2">Education, credentials, and continuous learning.</p>
            </header>

            {/* Currently Learning Widget */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-light/50 border border-brand-light rounded-full text-brand-dark text-sm mb-4">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-main opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-main"></span>
                </span>
                <span>Currently Learning: <strong>Advanced RAG Architectures</strong></span>
            </div>

            <div className="grid gap-6">

                {/* Degree - Row 1 */}
                <Card className="flex items-center gap-6 group">
                    <div className="h-16 w-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-light dark:group-hover:bg-brand-light/20 transition-colors duration-500">
                        <BookOpen size={28} className="text-gray-500 dark:text-gray-400 group-hover:text-brand-dark transition-colors" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-text-primary">B.Tech in Computer Science</h2>
                        <p className="text-text-secondary">Sathyabama Institute of Science and Technology, Chennai</p>
                        <p className="text-sm text-gray-400 mt-1 font-mono">2020 - 2024</p>
                    </div>
                </Card>

                {/* Certifications - Row 2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="flex items-center gap-4">
                        <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg text-orange-600 dark:text-orange-400">
                            <Award size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-text-primary">AWS Cloud Practitioner</h3>
                            <p className="text-xs text-text-secondary font-mono">Amazon Web Services</p>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-500/20 rounded-lg text-yellow-600 dark:text-yellow-400">
                            <Award size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-text-primary">Python Gold</h3>
                            <p className="text-xs text-text-secondary font-mono">HackerRank</p>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    )
}
