import type { Metadata, Viewport } from "next";
import { metadataForPage, SITE_URL } from "@/lib/site";
import { Manrope, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FloatingDock } from "@/components/FloatingDock";
import { clsx } from "clsx";
import { AuroraBackground } from "@/components/AuroraBackground";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  ...metadataForPage("/"),
  metadataBase: new URL(SITE_URL),
  applicationName: "Pardhu’s Portfolio",
  authors: [{ name: "Pardhu Karnati", url: SITE_URL }],
  creator: "Pardhu Karnati",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximumScale: clamping it blocks pinch-zoom (WCAG 1.4.4).
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A1C16" },
    { media: "(prefers-color-scheme: light)", color: "#EDE7DE" },
  ],
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // overflow-x-clip, not overflow-x-hidden: `hidden` on one axis forces the
  // other to `auto`, turning html/body into scroll containers and breaking
  // `position: sticky` everywhere. `clip` contains the same overflow without
  // creating a scroll container.
  return (
    <html
      lang="en"
      className={clsx(
        manrope.variable,
        spaceGrotesk.variable,
        jetbrainsMono.variable,
        "overflow-x-clip",
      )}
      suppressHydrationWarning
    >
      <body className="antialiased bg-bg-mist text-text-primary min-h-screen relative overflow-x-clip w-full selection:bg-brand-main selection:text-white transition-colors duration-500">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuroraBackground />

          {/* Main is a bare shell: each page owns its own max-width and padding,
              so a wide page (like /projects) is no longer clamped by this one. */}
          <main
            id="main-content"
            tabIndex={-1}
            className="pt-10 pb-[var(--dock-clearance)] min-h-[90vh] flex flex-col relative z-10 outline-none"
          >
            {children}
          </main>

          {/* Navigation */}
          <FloatingDock />
        </ThemeProvider>
      </body>
    </html>
  );
}
