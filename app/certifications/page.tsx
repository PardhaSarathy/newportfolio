"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { BookOpen, Award, Maximize2 } from "lucide-react";
import { CertificateModal } from "@/components/ui/CertificateModal";
import { cn } from "@/lib/utils";

interface Certificate {
  title: string;
  issuer: string;
  /** Omitted when no scan is available — the card then renders as static. */
  image?: { url: string; alt: string };
  accent: string;
}

const CERTIFICATES: Certificate[] = [
  {
    title: "Gen AI Study Jams 2024",
    issuer: "Google Cloud",
    image: {
      url: "/certificates/gen-ai-study-jams-2024.jpeg",
      alt: "Gen AI Study Jams 2024 certificate",
    },
    accent: "bg-accent-model/10 text-accent-model ring-1 ring-accent-model/20",
  },
  {
    title: "Cloud Computing",
    issuer: "CDAC",
    image: {
      url: "/certificates/CDAC.jpeg",
      alt: "CDAC Cloud Computing certificate",
    },
    accent: "bg-accent-infra/10 text-accent-infra ring-1 ring-accent-infra/20",
  },
  {
    title: "Deep Learning",
    issuer: "Sathyabama Institute of Science and Technology",
    image: {
      url: "/certificates/Deep_Learning.jpeg",
      alt: "Deep Learning certificate",
    },
    accent: "bg-accent-model/10 text-accent-model ring-1 ring-accent-model/20",
  },
  {
    title: "Python Gold",
    issuer: "HackerRank",
    accent:
      "bg-accent-serving/10 text-accent-serving ring-1 ring-accent-serving/20",
  },
];

const MATHWORKS_MODULES = [
  { label: "MATLAB Onramp", url: "/certificates/mathworks-final-1.jpg" },
  {
    label: "Machine Learning Onramp",
    url: "/certificates/mathworks-final-2.jpg",
  },
  {
    label: "Machine Learning with MATLAB",
    url: "/certificates/mathworks-final-3.jpg",
  },
  {
    label: "Data Processing & Visualization",
    url: "/certificates/mathworks-final-4.jpg",
  },
];

export default function CertificationsPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<{
    url: string;
    alt: string;
  } | null>(null);
  const scanned = CERTIFICATES.filter((cert) => cert.image);
  const otherCredentials = CERTIFICATES.filter((cert) => !cert.image);

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-4 pb-24 space-y-12 md:space-y-16">
        <header className="space-y-4 pt-4 md:pt-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
            Shelf
          </h1>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            Education, credentials, and continuous learning.
          </p>
          <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-brand-main/10 border border-brand-main/25 rounded-full text-text-primary text-xs sm:text-sm">
            <span
              className="h-2 w-2 rounded-full bg-brand-main shrink-0"
              aria-hidden
            />
            <span>
              Currently learning: <strong>Advanced RAG architectures</strong>
            </span>
          </div>
        </header>

        <section aria-labelledby="education-heading" className="space-y-5">
          <h2
            id="education-heading"
            className="text-2xl md:text-3xl font-display font-bold text-text-primary"
          >
            Education
          </h2>
          <Card
            hoverEffect={false}
            className="flex flex-col sm:flex-row sm:items-center gap-5 md:gap-6 border border-hairline p-6 md:p-8"
          >
            <span className="h-14 w-14 bg-brand-main/10 rounded-2xl flex items-center justify-center shrink-0 text-brand-main">
              <BookOpen size={27} aria-hidden />
            </span>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                B.E. Computer Science
              </h3>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed mt-2">
                Sathyabama Institute of Science and Technology, Chennai
              </p>
              <p className="text-xs text-text-muted leading-relaxed mt-3">
                GDSC contributor · Class representative for four years
              </p>
            </div>
            <p className="text-xs text-text-muted font-mono shrink-0 rounded-full border border-hairline bg-surface-sunken px-4 py-2 w-fit">
              2021 — 2025
            </p>
          </Card>
        </section>

        <section aria-labelledby="certificates-heading" className="space-y-6">
          <div className="space-y-2">
            <h2
              id="certificates-heading"
              className="text-2xl md:text-3xl font-display font-bold text-text-primary"
            >
              Certifications
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Open a certificate to take a closer look.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {scanned.map((cert) => (
              <Card
                key={cert.title}
                hoverEffect={false}
                className="relative group !p-0 overflow-hidden border border-hairline hover:border-brand-main/30 transition-colors flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-surface-sunken border-b border-hairline m-3 rounded-2xl overflow-hidden">
                  <Image
                    src={cert.image!.url}
                    alt={cert.image!.alt}
                    fill
                    sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 310px"
                    className="object-contain p-3"
                  />
                </div>
                <div className="p-5 pt-3 flex flex-col flex-1">
                  <p className="text-xs text-text-muted mb-2">{cert.issuer}</p>
                  <h3 className="text-lg font-bold text-text-primary leading-snug">
                    {cert.title}
                  </h3>
                  <span className="mt-auto pt-5 flex items-center justify-between gap-3 text-sm font-bold text-brand-main">
                    View certificate
                    <Maximize2 size={16} aria-hidden />
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(cert.image!)}
                  aria-label={`View ${cert.title} certificate`}
                  className="absolute inset-0 rounded-3xl z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-main"
                />
              </Card>
            ))}
          </div>
          <div className="flex flex-wrap gap-5">
            {otherCredentials.map((cert) => (
              <Card
                key={cert.title}
                hoverEffect={false}
                className="flex w-full sm:w-auto items-center gap-4 border border-hairline p-5 sm:pr-12"
              >
                <span
                  className={cn(
                    "w-11 h-11 rounded-xl shrink-0 flex items-center justify-center",
                    cert.accent,
                  )}
                >
                  <Award size={23} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-text-primary">{cert.title}</h3>
                  <p className="text-xs text-text-secondary mt-1">
                    {cert.issuer}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="specializations-heading"
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2
              id="specializations-heading"
              className="text-2xl md:text-3xl font-display font-bold text-text-primary"
            >
              Specializations & Bootcamps
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              MathWorks Developer Certification Series · MathWorks Training
              Services
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {MATHWORKS_MODULES.map((mod) => (
              <button
                key={mod.url}
                type="button"
                onClick={() =>
                  setSelectedCertificate({ url: mod.url, alt: mod.label })
                }
                aria-label={`View ${mod.label} certificate`}
                className="group rounded-3xl border border-hairline bg-bg-card p-4 sm:p-5 text-left hover:border-brand-main/30 transition-colors shadow-lg shadow-black/5 dark:shadow-black/20 focus-visible:outline-2 focus-visible:outline-brand-main focus-visible:outline-offset-4"
              >
                <span className="block relative aspect-[16/9] rounded-xl overflow-hidden bg-surface-sunken">
                  <Image
                    src={mod.url}
                    alt={`${mod.label} certificate preview`}
                    fill
                    sizes="(max-width: 639px) 90vw, 460px"
                    className="object-contain p-3"
                  />
                </span>
                <span className="block font-bold text-text-primary mt-4 mb-3 text-base">
                  {mod.label}
                </span>
                <span className="flex items-center justify-between gap-3 text-xs font-bold text-brand-main">
                  View certificate
                  <Maximize2 size={15} aria-hidden />
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
      <CertificateModal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        imageUrl={selectedCertificate?.url ?? null}
        altText={selectedCertificate?.alt ?? "Certificate"}
      />
    </>
  );
}
