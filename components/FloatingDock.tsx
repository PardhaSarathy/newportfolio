"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { Home, User, FlaskConical, Library, Mail, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useRef } from "react";

const links = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/about", icon: User, label: "Profile" },
    { href: "/projects", icon: FlaskConical, label: "Lab" },
    { href: "/certifications", icon: Library, label: "Shelf" },
    { href: "/contact", icon: Mail, label: "Signal" },
];

export function FloatingDock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.nav
            aria-label="Main Navigation"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-end gap-3 px-4 py-3 rounded-full bg-white/80 backdrop-blur-xl shadow-2xl border border-white/40 h-20"
        >
            {links.map((link) => (
                <DockIcon key={link.href} mouseX={mouseX} {...link} />
            ))}
        </motion.nav>
    );
}

function DockIcon({
    mouseX,
    icon: Icon,
    href,
    label,
}: {
    mouseX: MotionValue;
    icon: LucideIcon;
    href: string;
    label: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const isActive = pathname === href;

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const iconScaleTransform = useTransform(distance, [-150, 0, 150], [1, 1.5, 1]);

    const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
    const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
    const iconScale = useSpring(iconScaleTransform, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Link
            href={href}
            className="relative group"
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
        >
            <motion.div
                ref={ref}
                style={{ width, height }}
                className={clsx(
                    "flex items-center justify-center rounded-full transition-colors duration-200",
                    isActive
                        ? "bg-brand-light text-brand-main shadow-inner border border-brand-main/20"
                        : "bg-gray-100/50 text-text-secondary hover:bg-white border border-transparent"
                )}
            >
                <motion.div style={{ scale: iconScale }} className="flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                </motion.div>
            </motion.div>

            {/* Tooltip */}
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-dark text-white text-xs font-semibold rounded-lg opacity-0 pointer-events-none whitespace-nowrap shadow-xl z-50 pointer-events-none hidden group-hover:block"
            >
                {label}
            </motion.span>
        </Link>
    );
}
