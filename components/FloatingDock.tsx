"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { Home, User, FlaskConical, Library, Mail, LucideIcon, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
            className="fixed bottom-4 md:bottom-8 inset-x-0 mx-auto w-fit z-50 flex items-end gap-1 md:gap-3 px-2 md:px-4 py-1.5 md:py-3 rounded-full bg-white/80 dark:bg-[#07130F]/90 backdrop-blur-2xl shadow-2xl border border-white/40 dark:border-white/10 h-14 md:h-20 transition-colors duration-500"
        >
            {links.map((link) => (
                <DockIcon key={link.href} mouseX={mouseX} {...link} />
            ))}

            <div className="w-[1px] h-10 bg-gray-200 dark:bg-gray-800 self-center mx-1 transition-colors duration-500" />

            <ThemeToggleIcon mouseX={mouseX} />
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

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
    const iconScaleTransform = useTransform(distance, [-150, 0, 150], [1, 1.25, 1]);

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
                        ? "bg-brand-light text-brand-main dark:bg-[#186E4A] dark:text-[#A9F0D4] shadow-inner border border-brand-main/20 dark:border-white/10"
                        : "bg-gray-100/50 dark:bg-white/5 text-text-secondary hover:bg-white dark:hover:bg-white/10 border border-transparent dark:text-[#8EBAAA]"
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
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-dark dark:bg-black text-white text-xs font-semibold rounded-lg opacity-0 pointer-events-none whitespace-nowrap shadow-xl z-50 hidden group-hover:block transition-colors duration-500"
            >
                {label}
            </motion.span>
        </Link>
    );
}

function ThemeToggleIcon({ mouseX }: { mouseX: MotionValue }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
    const iconScaleTransform = useTransform(distance, [-150, 0, 150], [1, 1.25, 1]);

    const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
    const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
    const iconScale = useSpring(iconScaleTransform, { mass: 0.1, stiffness: 150, damping: 12 });

    const isDark = theme === "dark";
    const Icon = mounted && isDark ? Sun : Moon;

    return (
        <button
            ref={ref}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative group cursor-pointer"
            aria-label="Toggle Theme"
        >
            <motion.div
                style={{ width, height }}
                className="flex items-center justify-center rounded-full transition-colors duration-200 bg-gray-100/50 dark:bg-white/5 text-text-secondary hover:bg-white dark:hover:bg-white/10 border border-transparent dark:text-[#8EBAAA]"
            >
                <motion.div style={{ scale: iconScale }} className="flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                </motion.div>
            </motion.div>

            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-dark dark:bg-black text-white text-xs font-semibold rounded-lg opacity-0 pointer-events-none whitespace-nowrap shadow-xl z-50 hidden group-hover:block transition-colors duration-500"
            >
                {mounted && isDark ? "Light Mode" : "Dark Mode"}
            </motion.span>
        </button>
    );
}
