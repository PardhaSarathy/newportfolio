"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

export function ProjectSectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => !!element);
    const update = () => {
      const current = [...elements]
        .reverse()
        .find((element) => element.getBoundingClientRect().top <= 180);
      setActive(current?.id ?? sections[0]?.id);
    };
    let frame = 0;
    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        update();
        frame = 0;
      });
    };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    update();
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  return (
    <nav
      aria-label="On this project page"
      className="sticky top-4 z-40 -mx-1 rounded-full border border-hairline bg-bg-card/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-1.5"
    >
      <div className="flex gap-1 overflow-x-auto no-scrollbar rounded-full">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? "location" : undefined}
            onClick={() => setActive(section.id)}
            className={cn(
              "shrink-0 rounded-full px-4 md:px-5 py-2.5 text-xs md:text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand-main focus-visible:-outline-offset-2",
              active === section.id
                ? "bg-brand-main text-white dark:text-[#052018]"
                : "text-text-secondary hover:bg-surface-sunken hover:text-text-primary",
            )}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
