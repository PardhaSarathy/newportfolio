"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        // No `filter` here on purpose. Framer leaves `filter: blur(0px)` on the
        // element after the intro, and any filter value creates a containing
        // block that permanently breaks `position: sticky` for everything
        // inside — which is what stopped the /projects filter bar from sticking.
        <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
