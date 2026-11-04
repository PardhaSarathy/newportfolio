import Image from "next/image";
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
    <figure className="space-y-3">
      <div className={cn("relative aspect-[32/17] overflow-hidden border border-hairline bg-bg-card", compact ? "rounded-lg" : "rounded-3xl")}>
        <Image
          src={`/projects/${preview.image}`}
          alt={`${preview.title} public website homepage`}
          fill
          sizes={compact ? "(max-width: 767px) 90vw, (max-width: 1279px) 44vw, 560px" : "(max-width: 1023px) 92vw, 992px"}
          className="object-contain"
        />
      </div>
      <figcaption className="flex items-center justify-between gap-3 text-xs text-text-muted">
        <span>{preview.domain}</span>
        <span>Public website</span>
      </figcaption>
    </figure>
  );
}
