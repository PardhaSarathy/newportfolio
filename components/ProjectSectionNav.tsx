"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

function centerItem(
  scroller: HTMLElement,
  item: HTMLElement,
  behavior: ScrollBehavior,
) {
  if (scroller.scrollWidth <= scroller.clientWidth) return;
  const itemBounds = item.getBoundingClientRect();
  const scrollBounds = scroller.getBoundingClientRect();
  const target =
    scroller.scrollLeft +
    itemBounds.left -
    scrollBounds.left -
    (scroller.clientWidth - itemBounds.width) / 2;
  scroller.scrollTo({
    left: Math.max(
      0,
      Math.min(target, scroller.scrollWidth - scroller.clientWidth),
    ),
    behavior,
  });
}

export function ProjectSectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const scroller = scrollerRef.current;
    const item = scroller?.querySelector<HTMLElement>(
      '[aria-current="location"]',
    );
    if (scroller && item)
      centerItem(scroller, item, reduceMotion ? "auto" : "smooth");
  }, [active, reduceMotion]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new ResizeObserver(() => {
      const item = scroller.querySelector<HTMLElement>(
        '[aria-current="location"]',
      );
      if (item) centerItem(scroller, item, "auto");
    });
    observer.observe(scroller);
    return () => observer.disconnect();
  }, []);

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
      className="sticky top-4 z-40 w-fit max-w-full mx-auto rounded-full border border-hairline bg-bg-card/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-1.5"
    >
      <div
        ref={scrollerRef}
        className="flex gap-1 overflow-x-auto no-scrollbar rounded-full"
      >
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? "location" : undefined}
            onClick={() => setActive(section.id)}
            onFocus={(event) => {
              if (scrollerRef.current) {
                centerItem(
                  scrollerRef.current,
                  event.currentTarget,
                  reduceMotion ? "auto" : "smooth",
                );
              }
            }}
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
