"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends Omit<
  HTMLMotionProps<"div">,
  "children" | "onClick"
> {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  delay = 0,
  hoverEffect = true,
  onClick,
  ...rest
}: CardProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
      whileHover={
        reduceMotion || !hoverEffect
          ? undefined
          : { y: -4 }
      }
      onClick={onClick}
      // Clickable cards are divs, so give them real keyboard semantics.
      {...(onClick && {
        role: "button",
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
      })}
      className={cn(
        "bg-bg-card rounded-3xl p-8 border-2 border-white/60 dark:border-white/5 shadow-lg shadow-black/5 dark:shadow-black/30 hover:border-white dark:hover:border-white/10 transition-colors duration-200",
        onClick &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-main focus-visible:ring-offset-2 focus-visible:ring-offset-bg-mist",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
