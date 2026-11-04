"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    const reduceMotion = useReducedMotion();
    return (
        // No `filter` here on purpose. Framer leaves `filter: blur(0px)` on the
        // element after the intro, and any filter value creates a containing
        // block that permanently breaks `position: sticky` for everything
        // inside — which is what stopped the /projects filter bar from sticking.
        <motion.div
            initial={reduceMotion ? false : { y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: reduceMotion ? 0 : 0.24 }}
        >
            {children}
        </motion.div>
    );
}
