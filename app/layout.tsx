import type { Metadata } from "next";
import { Manrope, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FloatingDock } from "@/components/FloatingDock";
import { clsx } from "clsx";
import { AuroraBackground } from "@/components/AuroraBackground";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Pardhu | Agile Link",
  description: "AI Systems Architect bridging the gap between raw data and human utility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(manrope.variable, spaceGrotesk.variable, jetbrainsMono.variable)}>
      <body className="antialiased bg-bg-mist text-text-primary min-h-screen relative overflow-x-hidden selection:bg-brand-main selection:text-white">
        <AuroraBackground />

        {/* Main Content Area - padded for bottom dock */}
        <main className="pb-32 container mx-auto px-4 pt-10 max-w-5xl min-h-[90vh] flex flex-col justify-center">
          {children}
        </main>

        {/* Navigation */}
        <FloatingDock />
      </body>
    </html>
  );
}
