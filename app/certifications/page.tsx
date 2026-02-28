"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { BookOpen, Award } from "lucide-react";
import { CertificateModal } from "@/components/ui/CertificateModal";

export default function CertificationsPage() {
    const [selectedCertificate, setSelectedCertificate] = useState<{ url: string; alt: string } | null>(null);

    return (
        <>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-32 md:pb-40">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="flex items-center gap-4 group cursor-pointer" onClick={() => setSelectedCertificate({ url: "/certificates/gen-ai-study-jams-2024.jpeg", alt: "Gen AI Study Jams 2024" })}>
                            <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-primary">Gen AI Study Jams 2024</h3>
                                <p className="text-xs text-text-secondary font-mono">Google Cloud</p>
                            </div>
                        </Card>

                        <Card className="flex items-center gap-4 group cursor-pointer" onClick={() => setSelectedCertificate({ url: "/certificates/CDAC.jpeg", alt: "CDAC Certificate" })}>
                            <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-primary">Cloud Computing</h3>
                                <p className="text-xs text-text-secondary font-mono">CDAC</p>
                            </div>
                        </Card>

                        <Card className="flex items-center gap-4 group cursor-pointer" onClick={() => setSelectedCertificate({ url: "/certificates/Deep_Learning.jpeg", alt: "Deep Learning Certificate" })}>
                            <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-primary">Deep Learning</h3>
                                <p className="text-xs text-text-secondary font-mono">Great Learning</p>
                            </div>
                        </Card>

                        <Card className="flex items-center gap-4 group">
                            <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg text-orange-600 dark:text-orange-400">
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-primary">AWS Cloud Practitioner</h3>
                                <p className="text-xs text-text-secondary font-mono">Amazon Web Services</p>
                            </div>
                        </Card>

                        <Card className="flex items-center gap-4 group">
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-500/20 rounded-lg text-yellow-600 dark:text-yellow-400">
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-primary">Python Gold</h3>
                                <p className="text-xs text-text-secondary font-mono">HackerRank</p>
                            </div>
                        </Card>
                    </div>

                    {/* Specializations & Bootcamps */}
                    <h2 className="text-2xl font-bold text-text-primary mt-12 mb-6">Specializations & Bootcamps</h2>

                    <Card className="flex flex-col md:flex-row gap-6 p-6 group cursor-pointer" onClick={() => setSelectedCertificate({ url: "/certificates/mathworks-final-1.jpg", alt: "MATLAB Onramp Certificate" })}>
                        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 bg-blue-100 dark:bg-blue-500/20 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <Award size={32} />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold text-text-primary mb-1">MathWorks Developer Certification Series</h3>
                            <p className="text-sm text-text-secondary font-mono mb-4">MathWorks Training Services</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-bg-mist border border-white/5 shadow-sm hover:border-brand-main transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedCertificate({ url: "/certificates/mathworks-final-1.jpg", alt: "MATLAB Onramp" }); }}>
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                    <span className="text-sm">MATLAB Onramp</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-bg-mist border border-white/5 shadow-sm hover:border-brand-main transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedCertificate({ url: "/certificates/mathworks-final-2.jpg", alt: "Machine Learning Onramp" }); }}>
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                    <span className="text-sm">Machine Learning Onramp</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-bg-mist border border-white/5 shadow-sm hover:border-brand-main transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedCertificate({ url: "/certificates/mathworks-final-3.jpg", alt: "Machine Learning with MATLAB" }); }}>
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                    <span className="text-sm">Machine Learning with MATLAB</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-bg-mist border border-white/5 shadow-sm hover:border-brand-main transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedCertificate({ url: "/certificates/mathworks-final-4.jpg", alt: "MATLAB for Data Processing and Visualization" }); }}>
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                    <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap" title="MATLAB for Data Processing and Visualization">Data Processing & Visualization</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                </div>
            </div>

            <CertificateModal
                isOpen={!!selectedCertificate}
                onClose={() => setSelectedCertificate(null)}
                imageUrl={selectedCertificate?.url || ""}
                altText={selectedCertificate?.alt || "Certificate"}
            />
        </>
    )
}
