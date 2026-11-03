import type { Metadata } from "next";

export const SITE_URL = "https://pardhukarnati.vercel.app";
export const RESUME_URL = "/assets/Pardhasaradhi_Karnati_ResumeM.pdf";
export const SITE_NAME = "Pardhu | Full Stack AI Engineer";
export const SITE_DESCRIPTION =
  "Pardhu Karnati is a Full Stack AI Engineer building voice, vision, retrieval systems, and full-stack products end to end.";

export const SITE_PAGES = [
  {
    path: "/",
    imageKey: "home",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    previewTitle: "Pardhu Karnati.",
    label: "FULL STACK AI ENGINEER",
    previewDescription:
      "Voice, vision & retrieval. Model to backend to product.",
  },
  {
    path: "/about",
    imageKey: "profile",
    title: "Profile | Pardhu",
    description:
      "Meet Pardhu Karnati, a Full Stack AI Engineer in Hyderabad. Explore his approach to AI, real-time systems, infrastructure, and product engineering.",
    previewTitle: "The person behind the work.",
    label: "PROFILE",
    previewDescription:
      "Pardhu Karnati. Full Stack AI Engineer, based in Hyderabad, India.",
  },
  {
    path: "/projects",
    imageKey: "work",
    title: "Lab | Pardhu",
    description:
      "Explore Pardhu’s AI and full-stack engineering projects, including voice agents, Dr.Swift Diagnostics, Mr. Sales, and Mr. Rider.",
    previewTitle: "Ideas into working systems.",
    label: "SELECTED WORK",
    previewDescription:
      "Voice agents, connected platforms, and the engineering behind them.",
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
