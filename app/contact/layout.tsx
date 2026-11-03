import type { Metadata } from "next";
import { metadataForPage } from "@/lib/site";

export const metadata: Metadata = metadataForPage("/contact");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
