"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends Omit<
  HTMLMotionProps<"div">,
  "children" | "onClick"
> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  hoverEffect = true,
  onClick,
  ...rest
}: CardProps) {
  return (
    <motion.div
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
        "bg-bg-card rounded-3xl p-6 border border-hairline transition-colors duration-150",
        hoverEffect && "hover:border-brand-main/30",
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
