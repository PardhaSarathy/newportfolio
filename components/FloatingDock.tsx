"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  Home,
  User,
  FolderKanban,
  Library,
  Mail,
  LucideIcon,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useRef, useState, useEffect, type PointerEvent } from "react";
import { useTheme } from "next-themes";
import { DockGesture } from "@/lib/dock-gesture";

const links = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/about", icon: User, label: "Profile" },
  { href: "/projects", icon: FolderKanban, label: "Projects" },
  { href: "/certifications", icon: Library, label: "Credentials" },
  { href: "/contact", icon: Mail, label: "Contact" },
];

export function FloatingDock() {
  const mouseX = useMotionValue(Infinity);
  const touchMode = useMotionValue(0);
  const gesture = useRef(new DockGesture());
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let frame = 0;
    const keepFocusVisible = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const focused = document.activeElement;
        if (!(focused instanceof HTMLElement) || !focused.closest("main")) return;
        const dock = document.querySelector<HTMLElement>('[aria-label="Main Navigation"]');
        if (!dock) return;
        const rect = focused.getBoundingClientRect();
        const viewport = window.visualViewport;
        const visibleBottom = (viewport?.height ?? window.innerHeight) + (viewport?.offsetTop ?? 0);
        const safeBottom = Math.min(visibleBottom, dock.getBoundingClientRect().top) - 24;
        const safeTop = (viewport?.offsetTop ?? 0) + 24;
        if (rect.bottom > safeBottom) {
          window.scrollBy({ top: Math.min(rect.bottom - safeBottom, rect.top - safeTop), behavior: "instant" });
        }
      });
    };
    document.addEventListener("focusin", keepFocusVisible);
    window.visualViewport?.addEventListener("resize", keepFocusVisible);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("focusin", keepFocusVisible);
      window.visualViewport?.removeEventListener("resize", keepFocusVisible);
    };
  }, []);

  function clearReleaseTimer() {
    if (releaseTimer.current !== null) clearTimeout(releaseTimer.current);
    releaseTimer.current = null;
  }

  function pointerDown(event: PointerEvent<HTMLElement>) {
    if (!event.isPrimary) return;
    clearReleaseTimer();
    touchMode.set(event.pointerType === "mouse" ? 0 : 1);
    mouseX.set(event.clientX);
    if (event.pointerType === "mouse") gesture.current.cancel();
    else gesture.current.begin(event.pointerId, event.clientX, event.clientY);
  }

  function pointerMove(event: PointerEvent<HTMLElement>) {
    if (!event.isPrimary) return;
    if (event.pointerType === "mouse") {
      touchMode.set(0);
      mouseX.set(event.clientX);
    } else if (
      gesture.current.move(event.pointerId, event.clientX, event.clientY)
    ) {
      const bounds = event.currentTarget.getBoundingClientRect();
      // A finger can leave the dock while its original link retains capture.
      const nearDock =
        event.clientY >= bounds.top - 32 && event.clientY <= bounds.bottom + 32;
      mouseX.set(nearDock ? event.clientX : Infinity);
    }
  }

  function pointerUp(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" || !gesture.current.end(event.pointerId))
      return;
    // Let a quick tap register visually; navigation itself is never delayed.
    clearReleaseTimer();
    releaseTimer.current = setTimeout(() => {
      mouseX.set(Infinity);
      releaseTimer.current = null;
    }, 120);
  }

  function cancelTouch(event: PointerEvent<HTMLElement>) {
    if (!event.isPrimary) return;
    clearReleaseTimer();
    gesture.current.cancel();
    mouseX.set(Infinity);
  }

  useEffect(() => {
    const reset = () => {
      if (releaseTimer.current !== null) clearTimeout(releaseTimer.current);
      releaseTimer.current = null;
      gesture.current.cancel();
      mouseX.set(Infinity);
    };
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", reset);
    return () => {
      reset();
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, [mouseX]);

  return (
    <motion.nav
      aria-label="Main Navigation"
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={cancelTouch}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") mouseX.set(Infinity);
      }}
      onClickCapture={(event) => {
        if (gesture.current.consumeClick(event.detail)) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      style={{ touchAction: "pan-y pinch-zoom" }}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] md:bottom-8 inset-x-0 mx-auto w-max max-w-[calc(100vw-1rem)] md:w-fit z-50 flex items-end justify-center gap-0.5 md:gap-3 px-2 md:px-4 py-1.5 md:py-3 rounded-full bg-white/50 dark:bg-[#0A1C16]/60 backdrop-blur-2xl shadow-[0_8px_28px_rgba(2,90,78,0.18)] dark:shadow-[0_0_25px_rgba(169,240,212,0.3)] border border-white/60 dark:border-[#A9F0D4]/20 h-16 md:h-20 transition-colors duration-200"
    >
      {links.map((link) => (
        <DockIcon
          key={link.href}
          mouseX={mouseX}
          touchMode={touchMode}
          {...link}
        />
      ))}

      <div className="w-px h-10 bg-hairline self-center mx-1 transition-colors duration-500" />

      <ThemeToggleIcon mouseX={mouseX} touchMode={touchMode} />
    </motion.nav>
  );
}

const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };
const RANGE = 150;

/** Shared macOS-style magnification for every dock item. */
function useMagnification(
  mouseX: MotionValue,
  touchMode: MotionValue<number>,
  ref: React.RefObject<HTMLElement | null>,
) {
  const canMagnify = useCanMagnify();
  const reduceMotion = useReducedMotion();

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const size = useTransform([distance, touchMode], ([value, touch]) => {
    const val = value as number;
    const base = canMagnify && touch !== 1 ? 48 : 44;
    const max = 80;
    if (
      touch === 1 ||
      !canMagnify ||
      reduceMotion ||
      val < -RANGE ||
      val > RANGE
    )
      return base;
    return base + (1 - Math.abs(val) / RANGE) * (max - base);
  });

  // Touch keeps 44px hit areas fixed; transform the circles above those areas.
  // This gives the wave room to move without widening the dock off-screen.
  const touchInfluence = useTransform(
    [distance, touchMode],
    ([value, touch]) => {
      if (reduceMotion || (touch !== 1 && canMagnify)) return 0;
      return Math.max(0, 1 - Math.abs(value as number) / 90);
    },
  );
  const lift = useTransform(touchInfluence, (value) => -12 * value);
  const tileScale = useTransform(touchInfluence, (value) => 1 + 0.25 * value);

  const scale = useTransform([distance, touchMode], ([value, touch]) => {
    const val = value as number;
    if (reduceMotion) return 1;
    if (touch === 1 || !canMagnify)
      return 1 + Math.max(0, 1 - Math.abs(val) / 90) * 0.1;
    const max = 1.5;
    if (val < -RANGE || val > RANGE) return 1;
    return 1 + (1 - Math.abs(val) / RANGE) * (max - 1);
  });

  return {
    width: useSpring(size, SPRING),
    height: useSpring(size, SPRING),
    iconScale: useSpring(scale, SPRING),
    y: useSpring(lift, SPRING),
    tileScale: useSpring(tileScale, SPRING),
  };
}

const TOOLTIP_CLASS =
  "absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-dark dark:bg-[#D1EBE1] text-white dark:text-[#0A1C16] text-xs font-semibold rounded-md opacity-0 pointer-events-none whitespace-nowrap shadow-xl z-[999] transition-[opacity,transform] duration-150 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0";

const IDLE_ICON_CLASS =
  "bg-bg-card/50 dark:bg-white/5 text-text-secondary hover:bg-bg-card dark:hover:bg-white/10 border border-brand-main/20 dark:border-transparent shadow-[0_0_10px_rgba(2,90,78,0.2)] dark:shadow-none hover:shadow-[0_0_15px_rgba(2,90,78,0.3)] dark:hover:shadow-none hover:border-brand-main/40 dark:hover:border-transparent dark:text-[#8EBAAA]";

function DockIcon({
  mouseX,
  touchMode,
  icon: Icon,
  href,
  label,
}: {
  mouseX: MotionValue;
  touchMode: MotionValue<number>;
  icon: LucideIcon;
  href: string;
  label: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const { width, height, iconScale, y, tileScale } = useMagnification(
    mouseX,
    touchMode,
    ref,
  );

  return (
    <Link
      href={href}
      ref={ref}
      className="relative group rounded-full"
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
    >
      <motion.div
        style={{
          width,
          height,
          y,
          scale: tileScale,
          transformOrigin: "50% 100%",
        }}
        className={clsx(
          "flex items-center justify-center rounded-full transition-colors duration-200",
          isActive
            ? "bg-brand-light text-brand-main dark:bg-[#186E4A] dark:text-[#A9F0D4] shadow-inner dark:shadow-inner border border-brand-main/40 dark:border-white/10 shadow-[0_0_15px_rgba(2,90,78,0.4)] dark:shadow-none"
            : IDLE_ICON_CLASS,
        )}
      >
        <motion.div
          style={{ scale: iconScale }}
          className="flex items-center justify-center"
        >
          <Icon className="w-5 h-5 md:w-[22px] md:h-[22px]" />
        </motion.div>
      </motion.div>

      <span className={TOOLTIP_CLASS}>{label}</span>
    </Link>
  );
}

function ThemeToggleIcon({
  mouseX,
  touchMode,
}: {
  mouseX: MotionValue;
  touchMode: MotionValue<number>;
}) {
  // resolvedTheme, not theme: `theme` can be "system", which made the toggle
  // report light while the page was actually rendering dark.
  const { resolvedTheme, setTheme } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  const { width, height, iconScale, y, tileScale } = useMagnification(
    mouseX,
    touchMode,
    ref,
  );

  // Which icon to show is decided by CSS off the `.dark` class rather than by
  // a mounted flag. resolvedTheme is undefined on the first client render, so
  // a JS-driven icon flashes the wrong glyph before hydration settles.
  return (
    <button
      ref={ref}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative group cursor-pointer rounded-full"
      aria-label="Toggle colour theme"
    >
      <motion.div
        style={{
          width,
          height,
          y,
          scale: tileScale,
          transformOrigin: "50% 100%",
        }}
        className={clsx(
          "flex items-center justify-center rounded-full transition-colors duration-200",
          IDLE_ICON_CLASS,
        )}
      >
        <motion.div
          style={{ scale: iconScale }}
          className="flex items-center justify-center"
        >
          <Sun className="w-5 h-5 md:w-[22px] md:h-[22px] hidden dark:block" />
          <Moon className="w-5 h-5 md:w-[22px] md:h-[22px] block dark:hidden" />
        </motion.div>
      </motion.div>

      <span className={TOOLTIP_CLASS}>
        <span className="hidden dark:inline">Light mode</span>
        <span className="inline dark:hidden">Dark mode</span>
      </span>
    </button>
  );
}

function useCanMagnify() {
  const [canMagnify, setCanMagnify] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );
    const sync = () => setCanMagnify(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return canMagnify;
}
