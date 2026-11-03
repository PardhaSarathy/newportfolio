import Image from "next/image";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

// Only public marketing websites. No private app or console screens.
const previews: Record<string, { image: string; domain: string; title: string }> = {
  "mr-sales": { image: "mrsales-website.png", domain: "mrsales.in", title: "Mr. Sales" },
  "drswift-diagnostics": { image: "drswift-website.png", domain: "drswift.in", title: "Dr. Swift Diagnostics" },
  "mr-rider": { image: "mrrider-website.png", domain: "mrrider.in", title: "Mr. Rider" },
  cleocure: { image: "cleocure-website.png", domain: "cleocure.com", title: "CleoCure" },
};

export function hasProjectPreview(slug: string) {
  return slug in previews;
}

export function ProjectPreview({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const preview = previews[slug];
  if (!preview) return null;
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-hairline bg-surface-sunken", !compact && "rounded-3xl")}>
      <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-text-secondary border-b border-hairline">
        <span className="inline-flex items-center gap-2"><Globe size={14} aria-hidden />{preview.domain}</span>
        <span className="text-text-muted">Public website</span>
      </figcaption>
      <div className="relative aspect-[32/17] overflow-hidden bg-[#f8f6f1]">
        <Image
          src={`/projects/${preview.image}`}
          alt={`${preview.title} public website homepage`}
          fill
          sizes={compact ? "(max-width: 767px) 90vw, (max-width: 1279px) 44vw, 560px" : "(max-width: 1023px) 92vw, 992px"}
          className="object-contain"
        />
      </div>
    </figure>
  );
}
