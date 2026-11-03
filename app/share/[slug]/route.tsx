import { ImageResponse } from "next/og";
import { PUBLISHED_PROJECTS } from "@/lib/projects";
import { SITE_PAGES } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...SITE_PAGES.map((page) => ({ slug: page.imageKey })),
    ...PUBLISHED_PROJECTS.map((project) => ({
      slug: `project-${project.slug}`,
    })),
  ];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const page = SITE_PAGES.find((page) => page.imageKey === slug);
  const project = PUBLISHED_PROJECTS.find(
    (project) => `project-${project.slug}` === slug,
  );
  if (!page && !project)
    return new Response("Preview not found", { status: 404 });

  const title = project?.title ?? page!.previewTitle;
  const description =
    project?.hook ??
    (project
      ? "An engineering project by Pardhu Karnati. Explore the project and its implementation."
      : page!.previewDescription);
  const summary =
    description.length > 175
      ? `${description.slice(0, 172).replace(/\s+\S*$/, "")}…`
      : description;
  const label = project ? "PROJECT / ENGINEERING NOTES" : page!.label;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#0A1C16",
        color: "#D1EBE1",
        padding: "48px 64px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          right: -200,
          top: -260,
          background: "#112F23",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          right: -125,
          top: -185,
          border: "1px solid #2CC08230",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          right: -50,
          top: -110,
          border: "1px solid #2CC08230",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="52" height="52" viewBox="0 0 96 96">
            <rect width="96" height="96" rx="24" fill="#186E4A" />
            <path
              d="M23 66V30H34C52 30 52 53 34 53H23M58 30V66M77 30L58 48L79 66"
              fill="none"
              stroke="#D1EBE1"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: 29, fontWeight: 700, letterSpacing: -1 }}>
            pardhu<span style={{ color: "#2CC082" }}>.</span>
          </span>
        </div>
        <span style={{ fontSize: 12, letterSpacing: 2, color: "#9CC7B7" }}>
          {label}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          position: "relative",
          paddingBottom: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: title.length > 28 ? 64 : 78,
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: -3,
            maxWidth: 1020,
          }}
        >
          {title}
        </div>
        {slug === "home" && (
          <div
            style={{
              display: "flex",
              fontSize: 35,
              color: "#2CC082",
              marginTop: 15,
            }}
          >
            Full Stack AI Engineer
          </div>
        )}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            lineHeight: 1.5,
            color: "#9CC7B7",
            marginTop: 24,
            maxWidth: 960,
          }}
        >
          {summary}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #D1EBE12A",
          paddingTop: 25,
          position: "relative",
        }}
      >
        <span style={{ fontSize: 14, letterSpacing: 2, color: "#9CC7B7" }}>
          MODEL → BACKEND → PRODUCT
        </span>
        <span style={{ fontSize: 17, color: "#D1EBE1" }}>
          pardhukarnati.vercel.app
        </span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
