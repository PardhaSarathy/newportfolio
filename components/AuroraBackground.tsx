"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
    return (
        <div className="absolute top-0 left-0 w-full h-[800px] z-[-1] overflow-hidden pointer-events-none">
            {/* Gradient Mask to fade into background color */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-bg-mist/50 to-bg-mist" />

            {/* Orb 1 - Top Left (Deep Green) */}
            <motion.div
                animate={{
                    x: [-50, 50, -50],
                    y: [-20, 20, -20],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-brand-main/20 rounded-full blur-[100px]"
            />

            {/* Orb 2 - Right (Mint) */}
            <motion.div
                animate={{
                    x: [20, -20, 20],
                    y: [20, -20, 20],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-brand-light/60 rounded-full blur-[100px]"
            />

            {/* Orb 3 - Middle Center (Lime Accent) */}
            <motion.div
                animate={{
                    x: [-30, 30, -30],
                    y: [-30, 30, -30],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-accent-lime/40 rounded-full blur-[80px] mix-blend-overlay"
            />
        </div>
    );
}
