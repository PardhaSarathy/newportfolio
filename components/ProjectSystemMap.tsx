import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  Database,
  FileText,
  Globe,
  Layers3,
  PhoneCall,
  Server,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Node {
  title: string;
  detail: string;
  icon: LucideIcon;
}
const maps: Record<
  string,
  { intro: string; paths: { label: string; nodes: Node[] }[] }
> = {
  "drswift-diagnostics": {
    intro:
      "Two connected workflows: getting a booking into the platform, and turning a lab PDF into a visual report.",
    paths: [
      {
        label: "Booking & catalog",
        nodes: [
          {
            title: "App & website",
            detail: "Patient-facing experience",
            icon: Smartphone,
          },
          {
            title: "Cloudflare Worker",
            detail: "Server rendering · booking queues",
            icon: Globe,
          },
          {
            title: "Spring Boot CMS",
            detail: "Catalog · pricing · PostgreSQL",
            icon: Database,
          },
        ],
      },
      {
        label: "Report generation",
        nodes: [
          { title: "Lab PDF", detail: "Original lab document", icon: FileText },
          {
            title: "OCR + Gemini",
            detail: "Schema-validated transcription",
            icon: Layers3,
          },
          {
            title: "Visual report",
            detail: "React preview · Playwright PDF",
            icon: FileText,
          },
        ],
      },
    ],
  },
  "mr-sales": {
    intro:
      "Field actions can queue offline, then sync through a shared backend. Office and platform teams work through separate consoles; the public website is a separate product surface.",
    paths: [
      {
        label: "Field work to office review",
        nodes: [
          {
            title: "Field & manager app",
            detail: "Flutter · offline outbox",
            icon: Smartphone,
          },
          {
            title: "Shared backend",
            detail: "RPCs · PostgreSQL · RLS",
            icon: Database,
          },
          {
            title: "Company & ops consoles",
            detail: "Office workflows · platform controls",
            icon: Server,
          },
        ],
      },
    ],
  },
  "mr-rider": {
    intro:
      "The phone reports on-duty observations; the server measures distance. Managers review uncertain journeys before travel records are finalized.",
    paths: [
      {
        label: "From duty to review",
        nodes: [
          {
            title: "On-duty GPS",
            detail: "Flutter · offline uploads",
            icon: Smartphone,
          },
          {
            title: "Server measurement",
            detail: "Trail checks · road-distance estimates",
            icon: Database,
          },
          {
            title: "Review & records",
            detail: "Manager app · company dashboard",
            icon: Server,
          },
        ],
      },
    ],
  },
  "production-voice-agent": {
    intro:
      "A custom voice stack connecting customer calls to a multilingual speech model and retrieval tools.",
    paths: [
      {
        label: "Conversation pipeline",
        nodes: [
          {
            title: "Customer calls",
            detail: "SIP / PSTN telephony",
            icon: PhoneCall,
          },
          {
            title: "Voice orchestration",
            detail: "Pipecat · WebSockets",
            icon: AudioLines,
          },
          {
            title: "Speech & retrieval",
            detail: "Google S2S · RAG · tool calling",
            icon: Layers3,
          },
        ],
      },
    ],
  },
};

export function hasSystemMap(slug: string) {
  return slug in maps;
}

export function ProjectSystemMap({ slug }: { slug: string }) {
  const map = maps[slug];
  if (!map) return null;
  return (
    <div className="rounded-3xl border border-brand-main/20 bg-bg-card/80 p-5 md:p-8 space-y-7 shadow-lg shadow-brand-main/5">
      <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">
        {map.intro}
      </p>
      {map.paths.map((path) => (
        <div key={path.label} className="space-y-4">
          <h3 className="text-xs font-bold tracking-widest uppercase text-text-muted">
            {path.label}
          </h3>
          <ol
            aria-label={path.label}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5"
          >
            {path.nodes.map((node, index) => (
              <li key={node.title} className="relative">
                <div className="h-full rounded-2xl border border-hairline bg-surface-sunken p-5 flex flex-col items-start gap-3">
                  <span className="inline-flex items-center gap-2 text-brand-main">
                    <node.icon size={21} strokeWidth={1.5} aria-hidden />
                    <span className="text-[10px] font-mono text-text-muted">
                      0{index + 1}
                    </span>
                  </span>
                  <h4 className="font-bold text-text-primary text-sm">
                    {node.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {node.detail}
                  </p>
                </div>
                {index < path.nodes.length - 1 && (
                  <>
                    <ArrowRight
                      size={15}
                      aria-hidden
                      className="hidden sm:block absolute -right-[18px] top-1/2 -translate-y-1/2 text-brand-main"
                    />
                    <ArrowDown
                      size={14}
                      aria-hidden
                      className="sm:hidden mx-auto mt-3 text-brand-main"
                    />
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
      ))}
      <p className="text-[11px] text-text-muted leading-relaxed border-t border-hairline pt-4">
        Simplified system map. Implementation details are explained below.
      </p>
    </div>
  );
}
