"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function Card({ children, className, delay = 0 }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay
            }}
            whileHover={{
                y: -8,
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)"
            }}
            className={clsx(
                "bg-bg-card rounded-3xl p-8 border-2 border-white/60 shadow-lg shadow-gray-200/50 hover:border-white transition-colors",
                className
            )}
        >
            {children}
        </motion.div>
    );
}
