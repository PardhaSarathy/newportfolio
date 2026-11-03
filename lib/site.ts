import type { Metadata } from "next";
import { PROFILE } from "@/lib/profile";

export const SITE_URL = "https://pardhukarnati.vercel.app";
export const RESUME_URL = "/assets/Pardhasaradhi_Karnati_ResumeM.pdf";
export const SITE_NAME = `Pardhu | ${PROFILE.role}`;
export const SITE_DESCRIPTION =
  "Pardhu Karnati is a Software Engineer building full-stack web platforms, Flutter mobile apps, and applied AI systems from design to production.";

export const SITE_PAGES = [
  {
    path: "/",
    imageKey: "home",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    previewTitle: "Pardhu Karnati.",
    label: "SOFTWARE ENGINEER",
    previewDescription:
      "Full-stack product engineering. Applied AI. Design to production.",
  },
  {
    path: "/about",
    imageKey: "profile",
    title: "Profile | Pardhu",
    description:
      "Meet Pardhu Karnati, a Software Engineer in Hyderabad. Explore his experience at Dr. Swift Diagnostics and HCL, full-stack product work, and applied AI.",
    previewTitle: "The person behind the work.",
    label: "PROFILE",
    previewDescription:
      "Pardhu Karnati. Software Engineer, based in Hyderabad, India.",
  },
  {
    path: "/projects",
    imageKey: "work",
    title: "Lab | Pardhu",
    description:
      "Explore Pardhu’s AI and full-stack engineering projects, including Dr.Swift Diagnostics, Mr. Sales, Mr. Rider, Cleocure, and production AI agents.",
    previewTitle: "Ideas into working systems.",
    label: "SELECTED WORK",
    previewDescription:
      "Web platforms, mobile products, applied AI, and the engineering behind them.",
  },
  {
    path: "/certifications",
    imageKey: "credentials",
    title: "Shelf | Pardhu",
    description:
      "Pardhu Karnati’s education and credentials in computer science, AI, deep learning, cloud computing, and MATLAB, with certificate previews.",
    previewTitle: "Always learning. Always building.",
    label: "EDUCATION & CREDENTIALS",
    previewDescription:
      "Computer science, AI, cloud computing, and the foundations behind the work.",
  },
  {
    path: "/contact",
    imageKey: "contact",
    title: "Signal | Pardhu",
    description:
      "Contact Pardhu Karnati about AI engineering, full-stack development, project collaboration, or engineering opportunities.",
    previewTitle: "Let’s build something useful.",
    label: "GET IN TOUCH",
    previewDescription:
      "A project, an engineering opportunity, or a good conversation.",
  },
] as const;

export function createPageMetadata({
  title,
  description,
  path,
  imageKey,
}: {
  title: string;
  description: string;
  path: string;
  imageKey: string;
}): Metadata {
  const image = {
    url: `/share/${imageKey}`,
    width: 1200,
    height: 630,
    alt: title,
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

export function metadataForPage(path: string): Metadata {
  const page = SITE_PAGES.find((page) => page.path === path);
  if (!page) throw new Error(`No metadata configured for ${path}`);
  return createPageMetadata(page);
}
