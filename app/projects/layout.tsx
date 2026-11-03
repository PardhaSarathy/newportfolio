import type { Metadata } from "next";
import { metadataForPage } from "@/lib/site";

export const metadata: Metadata = metadataForPage("/projects");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
