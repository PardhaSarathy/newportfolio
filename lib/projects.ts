import {
  Bike,
  Mic,
  PhoneCall,
  ScanEye,
  Database,
  Plane,
  Languages,
  Salad,
  Stethoscope,
  Smartphone,
  LayoutDashboard,
  Globe,
  FileText,
  Briefcase,
  MapPin,
  Building2,
  ServerCog,
  type LucideIcon,
} from "lucide-react";

/**
 * SOURCE OF TRUTH: docs/projects.md
 *
 * Cards and case-study pages are generated from these fields so the data and
 * the presentation stay separable.
 *
 * HARD RULE: do not invent project details. A field left `undefined` here is a
 * real gap awaiting input from Pardhasaradhi, not a placeholder to fill
 * creatively. Never add latency numbers, accuracy figures, user counts, dates,
 * or architecture claims that were not supplied. Fabricated metrics on a
 * portfolio fail the first interview question.
 *
 * Entries marked `draft: true` are withheld from the public site because there
 * is not yet enough real content to justify a card.
 */

/** Which layer of the stack a project demonstrates. */
export type Layer = "model" | "serving" | "infra" | "product";

export type Status = "live" | "shipped" | "in-progress" | "case-study-only";

export const LAYERS: readonly Layer[] = [
  "model",
  "serving",
  "infra",
  "product",
] as const;

export const LAYER_LABEL: Record<Layer, string> = {
  model: "Model",
  serving: "Serving",
  infra: "Infra",
  product: "Product",
};

export const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  shipped: "Shipped",
  "in-progress": "In progress",
  "case-study-only": "Case study",
};

export interface Accent {
  /** Icon tile: tinted fill + saturated glyph. */
  tile: string;
  /** Foreground-only accent. */
  text: string;
}

/**
 * One accent per layer, so the palette encodes coverage rather than domain.
 * Class strings are spelled out in full: Tailwind scans source literals and
 * cannot see interpolated names like `bg-${x}`.
 */
const LAYER_ACCENT: Record<Layer, Accent> = {
  model: {
    tile: "bg-accent-model/10 text-accent-model ring-1 ring-accent-model/20",
    text: "text-accent-model",
  },
  serving: {
    tile: "bg-accent-serving/10 text-accent-serving ring-1 ring-accent-serving/20",
    text: "text-accent-serving",
  },
  infra: {
    tile: "bg-accent-infra/10 text-accent-infra ring-1 ring-accent-infra/20",
    text: "text-accent-infra",
  },
  product: {
    tile: "bg-accent-product/10 text-accent-product ring-1 ring-accent-product/20",
    text: "text-accent-product",
  },
};

/** Tech grouped by layer, not a flat tag soup. */
export type Stack = Partial<Record<Layer, string[]>>;

export interface ProjectLink {
  label: string;
  url: string;
  icon?: LucideIcon;
}

/**
 * A distinct surface within one project.
 *
 * Some projects are a platform rather than a single artefact. Listing the
 * surfaces inside one entry keeps the "owned the whole thing" claim intact —
 * splitting them into separate cards would argue the opposite.
 */
export interface ProjectComponent {
  name: string;
  contribution?: string;
  /** One short line. Omit rather than pad. */
  detail?: string;
  icon: LucideIcon;
}

export interface Project {
  slug: string;
  title: string;
  /** One sentence for a recruiter skimming. Undefined = not yet written. */
  hook?: string;
  status: Status;
  layers: Layer[];
  stack?: Stack;
  /** Distinct surfaces built within this one project. */
  components?: ProjectComponent[];
  problem?: string;
  caseStudy?: {
    responsibility: string;
    journeys: {
      title: string;
      steps: { title: string; detail: string }[];
    }[];
    outcomes: { title: string; detail: string }[];
  };
  architecture?: string;
  challenge?: string;
  metrics?: { label: string; value: string }[];
  broke?: string;
  proof?: ProjectLink[];
  /** Planned evidence, where none is publishable yet. */
  proofNote?: string;
  role?: string;
  timeframe?: string;
  /** Confidentiality or open-decision note. Never rendered publicly. */
  note?: string;
  icon: LucideIcon;
  featured?: boolean;
  featuredOrder?: number;
  wide?: boolean;
  /** Withheld from the public site until it has real content. */
  draft?: boolean;
}

/** Accent classes for a project, keyed off the first layer it proves. */
export function accentOf(project: Project): Accent {
  return LAYER_ACCENT[project.layers[0] ?? "model"];
}

export function accentOfLayer(layer: Layer): Accent {
  return LAYER_ACCENT[layer];
}

/** Flattens grouped stack into an ordered, de-duplicated tag list for cards. */
export function stackTags(stack?: Stack): string[] {
  if (!stack) return [];
  const seen = new Set<string>();
  for (const layer of LAYERS) {
    for (const tech of stack[layer] ?? []) seen.add(tech);
  }
  return [...seen];
}

export const PROJECTS: Project[] = [
  {
    slug: "local-voice-agent",
    title: "Local Voice Agent",
    hook: "A self-hosted voice-agent experiment exploring a local speech and conversation pipeline.",
    status: "in-progress",
    layers: ["model", "serving", "infra"],
    // stack: TBD: which STT, LLM and TTS models; serving runtime; target hardware.
    // problem: TBD: latency, per-minute cost, or data residency. Pick the real one.
    // metrics: TBD: time-to-first-audio and full turn latency, against the
    // cloud-hosted equivalent. That comparison is the story.
    proofNote: "Recorded video/audio: live hosting is too costly to leave up.",
    role: "Solo",
    icon: Mic,
    // Keep this experiment out of featured work until a fuller case study exists.
  },
  {
    slug: "production-voice-agent",
    title: "Production Voice Agent",
    hook: "Multilingual AI voice receptionist handling real customer calls for a spa chain.",
    status: "case-study-only",
    layers: ["model", "serving", "infra", "product"],
    stack: {
      model: [
        "Google native speech (S2S)",
        "RAG",
        "LangGraph",
        "Function calling",
      ],
      serving: ["Pipecat", "WebSockets", "SIP/PSTN"],
      infra: ["Ubuntu VPS", "Nginx"],
    },
    challenge:
      "Tested many LLM, STT and TTS combinations before settling on Google's native " +
      "speech model, which handles multilingual conversation directly. Vapi and Retell " +
      "were evaluated and bypassed in favour of the custom build.",
    metrics: [{ label: "Call latency", value: "Sub-400ms" }],
    proofNote: "Sanitized demo recording.",
    role: "Sole technical owner, lead developer",
    timeframe: "From June 2025, at avoi.in",
    note:
      "CONFIDENTIALITY: client work (Ridhira Group / Ode Spa). Client is described " +
      "generically as 'a spa chain' until naming is cleared.",
    icon: PhoneCall,
    featured: true,
    featuredOrder: 4,
  },
  {
    slug: "vision-agent",
    title: "Multimodal Vision Agent",
    hook:
      "Field-inspection agent combining scratch detection, IMEI validation and OCR ID " +
      "checks into automated KYC decisions.",
    status: "case-study-only",
    layers: ["model", "serving", "product"],
    stack: {
      model: ["Computer Vision", "OCR"],
      serving: ["LiveKit", "WebRTC"],
      infra: ["AWS S3"],
    },
    proofNote: "Sanitized demo recording.",
    role: "Sole technical owner, lead developer",
    timeframe: "At avoi.in",
    note:
      "Detail sourced from the resume (multimodal Insurance Agent for field inspections). " +
      "CONFIRM status, metrics and whether this is publishable separately from the voice agent.",
    icon: ScanEye,
  },
  {
    slug: "production-rag",
    title: "Production RAG",
    status: "in-progress",
    layers: ["model", "serving", "product"],
    // problem: DECISION NEEDED: generic RAG demos are the most saturated
    // category on AI portfolios. Pick a use case whose retrieval problem is
    // visibly hard: heterogeneous documents, freshness, ambiguous queries,
    // or domain jargon that breaks naive embedding search.
    // metrics: must include retrieval eval: Recall@k against a labeled set
    // is the minimum, not vibes.
    role: "Solo",
    icon: Database,
    note: "Use case undecided: withheld until there is something real to show.",
    draft: true,
  },
  {
    slug: "travel-planner",
    title: "AI Travel Planner",
    hook: "Intelligent travel companion that generates personalized itineraries using generative AI.",
    status: "shipped",
    layers: ["product", "serving"],
    // stack: TBD: mobile framework, backend, which model.
    proofNote: "Play Store listing pending.",
    role: "Solo",
    icon: Plane,
    note: "Hook carried over from the previous site copy. Confirm or rewrite.",
  },
  {
    slug: "english-learning-app",
    title: "English Learning App",
    hook: "English for Indian users, taught through their own local languages.",
    status: "shipped",
    layers: ["product", "model"],
    // stack: TBD: which languages, how, and whether speech is involved.
    // problem: TBD: existing apps teach English through English. Explain why
    // that fails for the target user; the local-language angle is the story.
    proofNote: "Play Store listing pending.",
    role: "Solo",
    icon: Languages,
  },
  {
    slug: "calorie-tracker",
    title: "Calorie Tracker",
    hook: "Photograph a meal, get it logged with calorie estimates.",
    status: "shipped",
    layers: ["product", "serving"],
    stack: {
      model: ["OpenAI Vision API"],
    },
    // challenge: frame as a shipping and cost-control story, not a model
    // story. The AI call is one request; the engineering is everything around it.
    // metrics: TBD: cost per scan, latency, failure rate.
    proofNote: "Play Store listing pending.",
    role: "Solo",
    icon: Salad,
  },
  {
    slug: "drswift-diagnostics",
    title: "Dr.Swift Diagnostics",
    hook:
      "Every surface of a live diagnostics platform, built solo from scratch: patient " +
      "app, catalog CMS, edge-rendered website and an AI lab-report generator.",
    status: "live",
    layers: ["product", "serving", "infra", "model"],
    stack: {
      model: ["Gemini API", "Tesseract OCR", "PyMuPDF"],
      serving: ["Python", "Spring Boot 3", "Cloudflare Workers", "Playwright"],
      infra: ["Cloudflare D1 / R2 / Queues", "PostgreSQL", "Docker"],
      product: ["Flutter", "Riverpod", "React", "TypeScript", "Thymeleaf"],
    },
    components: [
      {
        name: "Patient app",
        contribution: "Built the patient experience for family bookings, report access and biomarker trends.",
        detail:
          "Flutter + Riverpod: Android, iOS, and web; family booking, reports, and biomarker trend charts.",
        icon: Smartphone,
      },
      {
        name: "CMS",
        contribution: "Built the staff publishing workflow and the API that supplies the public catalog.",
        detail:
          "Spring Boot 3: versioned public API, draft/live/retired publishing, audit logs, and automatic CDN cache purging.",
        icon: LayoutDashboard,
      },
      {
        name: "Website",
        contribution: "Built the public browsing, sign-in, booking and checkout experience.",
        detail:
          "drswift.in: Cloudflare Workers SSR, OTP and Google sign-in, booking, and checkout.",
        icon: Globe,
      },
      {
        name: "Report generator",
        contribution: "Built the pipeline from lab PDFs to structured data, visual reports and printable output.",
        detail:
          "Python + Tesseract OCR + Gemini: schema-validated extraction, a tested report-rule registry, React visual reports, and print-ready Playwright output.",
        icon: FileText,
      },
    ],
    problem:
      "Patients need to find and book tests, staff need to publish the catalog, and lab PDFs need to become readable reports. The platform connects these workflows across mobile, web and internal tools, with controlled publishing and consistent report output.",
    caseStudy: {
      responsibility:
        "I owned design, implementation and deployment across all four surfaces: the patient app, catalog CMS, public website and report generator.",
      journeys: [
        {
          title: "From finding a test to booking it",
          steps: [
            { title: "Browse the catalog", detail: "The public website presents tests and pricing from the published CMS catalog." },
            { title: "Sign in and book", detail: "Patients use OTP or Google sign-in, then continue through booking and checkout." },
            { title: "Connect the booking", detail: "Booking events sync back to the CMS through a queued workflow." },
          ],
        },
        {
          title: "From a lab PDF to a visual report",
          steps: [
            { title: "Read the source document", detail: "PDF extraction and OCR read the lab document; Gemini helps extract structured data." },
            { title: "Validate and present", detail: "Schema validation checks the extracted structure. Tested rules control how results are displayed." },
            { title: "Preview and print", detail: "The same React report powers the visual preview and the print-ready PDF." },
          ],
        },
      ],
      outcomes: [
        { title: "Patient-facing workflows, shipped", detail: "A live website for browsing and booking, alongside a patient app for family bookings, reports and biomarker trends." },
        { title: "Controlled catalog publishing", detail: "Draft, live and retired states, audit logs and cache purging keep publishing explicit across the platform." },
        { title: "One report, two outputs", detail: "Structured extraction and tested display rules feed a shared report for preview and printable PDF output." },
      ],
    },
    architecture:
      "The website runs as a Cloudflare Worker that renders pages and acts as the BFF for " +
      "the app and field staff. It reads the catalog from the Spring Boot CMS (PostgreSQL) " +
      "and syncs bookings back through Cloudflare Queues with dead-letter queues. The CMS " +
      "accepts those events over HMAC-signed endpoints, processes each exactly once, and " +
      "purges the Cloudflare cache on catalog changes.",
    challenge:
      "The Python extraction service combines Tesseract OCR, PyMuPDF, and Gemini to turn lab PDFs into schema-validated data. A unit-tested rule registry across nine report panels owns the clinical display logic. The model extracts information; tested code decides how it is presented. The preview and print-ready PDF use the same React report, rendered by Playwright.",
    role: "Solo: design, build and deployment of all four surfaces",
    proof: [{ label: "drswift.in", url: "https://drswift.in" }],
    icon: Stethoscope,
    featured: true,
    featuredOrder: 2,
    // Wide: the component grid needs two columns to read as a platform
    // rather than a list.
    wide: true,
    note:
      "Current employer work: cleared for the site by Pardhasaradhi. Details verified " +
      "against the codebases (Sep 2026). metrics: TBD: no production numbers supplied.",
  },
  {
    slug: "mr-sales",
    title: "Mr. Sales",
    hook: "A pharma field-force platform connecting offline field work, office approvals, and platform operations: with a Flutter app, company console, ops console, and product website.",
    status: "live",
    layers: ["product", "infra", "serving"],
    stack: {
      serving: ["Supabase RPC", "Edge Functions"],
      infra: ["PostgreSQL + RLS", "Supabase Storage", "Vercel"],
      product: ["Flutter", "Riverpod", "React", "TypeScript", "Astro", "GSAP"],
    },
    components: [
      {
        name: "Field & manager app",
        contribution:
          "Built the day-to-day experience for field reps and managers, including offline field actions and team approvals.",
        detail:
          "Flutter: day plans, location-checked visits, orders, expenses, tour plans, leave, and team approvals; offline actions queue for sync.",
        icon: Smartphone,
      },
      {
        name: "Company console",
        contribution:
          "Built the office workspace for company teams to manage people, clients, field activity and claims.",
        detail:
          "React: people, clients, field activity, sales, claims, payroll, and company settings, with role-based access and organization-scoped visibility.",
        icon: Building2,
      },
      {
        name: "Platform ops console",
        detail:
          "React: organization onboarding, plans, subscriptions, invoices, support, system health, and audited administrative actions.",
        contribution:
          "Built the operational workspace for onboarding organizations, managing plans and supporting companies.",
        icon: ServerCog,
      },
      {
        name: "Product website",
        detail:
          "Astro + GSAP: product storytelling, pricing, and a server-side demo-enquiry form at mrsales.in.",
        contribution:
          "Designed and built the public product story, pricing pages and demo-enquiry experience.",
        icon: Globe,
      },
    ],
    problem:
      "Pharma field work spans visits, orders and expenses, often through patchy connectivity. Managers need to review requests, office teams need visibility into company activity, and platform staff need their own controls. The product connects those workflows while keeping each organization's records and roles separate.",
    caseStudy: {
      responsibility:
        "I owned product design and engineering across the database schema, Flutter app, company console, platform ops console and public website.",
      journeys: [
        {
          title: "From a day plan to a recorded visit",
          steps: [
            {
              title: "Plan the field day",
              detail: "Reps submit a day plan and use the app to see their work and upcoming visits.",
            },
            {
              title: "Record the visit",
              detail: "A visit combines a location check, call notes and a photo, with orders captured in the same field app.",
            },
            {
              title: "Keep working offline",
              detail: "Supported field actions queue when the signal drops and sync when it returns, with retry IDs preventing duplicate records.",
            },
          ],
        },
        {
          title: "From a field request to team review",
          steps: [
            {
              title: "Submit the request",
              detail: "Reps submit expenses with receipts, leave, tour plans and orders through the app.",
            },
            {
              title: "Review as a manager",
              detail: "Managers review their team's requests and approve or reject them, with a reason required for rejection.",
            },
            {
              title: "Bring the office into the loop",
              detail: "Company teams use their console to review field activity, sales and claims within their organization and role.",
            },
          ],
        },
      ],
      outcomes: [
        {
          title: "Field work through patchy signal",
          detail: "Day plans, visits, orders and expenses have an offline queue with idempotent retries when connectivity returns.",
        },
        {
          title: "Connected, role-based workspaces",
          detail: "The field app and company console share records through one backend, with organization and employee-hierarchy visibility enforced server-side.",
        },
        {
          title: "A platform beyond the field app",
          detail: "An ops console supports organization onboarding and audited administration, while the live product website explains the service and accepts demo enquiries.",
        },
      ],
    },
    architecture:
      "The Flutter app and React consoles share a Supabase backend. Row-level security and server-side visibility rules scope access to the organization and employee hierarchy. Field actions go through RPCs; an offline outbox queues visits, plans, expenses, and orders with client-generated IDs for idempotent retries. Visit photos and receipts stay in private storage, with signed access for authorized readers. The Astro product website is a separate surface on Vercel.",
    challenge:
      "Field work has to continue through patchy connectivity without creating duplicate records when a request is retried. The app separates screens from repository implementations and adds a durable outbox around offline writes. The server enforces organization scope, employee visibility, and visit rules as well as the app. Role-based consoles keep field, company, and platform operations separate while sharing the same backend and authorization rules.",
    role: "Solo: product design, schema, mobile app, consoles, and website",
    proof: [{ label: "mrsales.in", url: "https://mrsales.in" }],
    icon: Briefcase,
    featured: true,
    featuredOrder: 1,
    note: "Updated from the current resume and Documents/MrSales source. Main project confirmed live in November 2026; no customer, accuracy, or performance metrics are claimed.",
  },
  {
    slug: "mr-rider",
    title: "Mr. Rider",
    hook: "A field-rider operations platform that connects on-duty GPS journeys, visits, tasks, and travel-expense review across mobile apps and company dashboards.",
    status: "live",
    layers: ["product", "serving", "infra"],
    stack: {
      serving: ["Supabase RPC", "Edge Functions"],
      infra: [
        "PostgreSQL + RLS",
        "PostGIS",
        "pgRouting",
        "OpenStreetMap",
        "Vercel",
      ],
      product: ["Flutter", "React", "TypeScript", "MapLibre", "Astro", "GSAP"],
    },
    components: [
      {
        name: "Rider & manager app",
        contribution:
          "Built the rider and manager workflows for on-duty journeys, visits, tasks and travel review.",
        detail:
          "Flutter: on-duty location tracking, offline GPS uploads, visits, assigned tasks, routes, and manager review. Location collection stops outside duty.",
        icon: Smartphone,
      },
      {
        name: "Company dashboard",
        contribution:
          "Built the company workspace for field visibility, route review, approvals and travel records.",
        detail:
          "React + MapLibre: live field visibility, routes, attendance, approvals, travel records, and downloadable workbooks.",
        icon: MapPin,
      },
      {
        name: "Platform ops console",
        detail:
          "React: company administration, platform settings, support, app-update controls, and health monitoring.",
        contribution:
          "Built platform controls for company administration, support and app-update management.",
        icon: ServerCog,
      },
      {
        name: "Product website",
        detail:
          "Astro + GSAP: original route illustrations, product workflows, GPS-verification explanations, and demo enquiries at mrrider.in.",
        contribution:
          "Designed and built the public website with original journey illustrations and explanations of the measurement workflow.",
        icon: Globe,
      },
    ],
    problem:
      "A phone's live GPS estimate is not enough to finalize a travel-expense record. Field journeys can include missing signal and uncertain GPS gaps, while companies still need distance records they can review. The product separates on-duty tracking, server-side measurement and manager review, with location collection stopping outside duty.",
    caseStudy: {
      responsibility:
        "My engineering work spans the rider and manager app, company dashboard, platform ops console, backend measurement workflow and public website.",
      journeys: [
        {
          title: "From starting duty to measured distance",
          steps: [
            {
              title: "Start the work journey",
              detail: "The rider app records location during duty, alongside visits and assigned tasks. Collection stops outside duty.",
            },
            {
              title: "Carry the trail through signal gaps",
              detail: "GPS observations can upload after connectivity returns, keeping collection separate from server measurement.",
            },
            {
              title: "Measure on the server",
              detail: "The server cleans the trail and measures ridden distance, checking completed legs against road-distance and trusted-history estimates.",
            },
          ],
        },
        {
          title: "From an uncertain journey to review",
          steps: [
            {
              title: "Surface the uncertainty",
              detail: "GPS gaps and provisional distance estimates are routed for review rather than silently treated as final travel records.",
            },
            {
              title: "Review the journey",
              detail: "Managers and company teams review routes, uncertain journeys and travel records through their own workspaces.",
            },
            {
              title: "Work with the records",
              detail: "The company dashboard brings travel records, attendance and approvals together, with downloadable workbooks for further review.",
            },
          ],
        },
      ],
      outcomes: [
        {
          title: "Duty-aware field tracking",
          detail: "The rider app supports on-duty location collection and offline GPS uploads, with visits and tasks alongside the journey.",
        },
        {
          title: "Measurement with a review path",
          detail: "Server-side trail checks and distance measurement are separate from the phone's estimate. Uncertain journeys remain reviewable by managers and company teams.",
        },
        {
          title: "Traceable travel records",
          detail: "Measured days record an engine version, and later rule changes do not silently rewrite locked records. Company dashboards provide travel records and workbook exports.",
        },
      ],
    },
    architecture:
      "The Flutter app records GPS points during duty and uploads them to a shared Supabase backend. Server-side measurement cleans the trail, computes ridden distance, and compares completed legs with road-distance and trusted-history estimates. PostgreSQL, PostGIS, and pgRouting support the routing layer. Managers and company dashboards review uncertain journeys and travel records; the ops console manages the platform. Companies remain separated by row-level security, and the Astro website is deployed independently on Vercel.",
    challenge:
      "A phone's live distance estimate cannot be treated as a verified travel-expense record. Tracking, distance measurement, and approval are separate concerns: the phone reports observations, the server measures, and uncertain GPS gaps or provisional estimates go to review. Learned route history is bounded by road-distance checks, while an engine version is recorded for measured days so later rule changes do not silently rewrite locked records. Tracking also has to respect duty boundaries and continue through intermittent connectivity.",
    role: "Product engineering: mobile, dashboards, backend, and website",
    proof: [{ label: "mrrider.in", url: "https://mrrider.in" }],
    icon: Bike,
    featured: true,
    featuredOrder: 3,
    note: "Sourced from Documents/MrRider code and product documentation, November 2026. Main project confirmed live. Public product screens are private by owner decision. No production accuracy, savings, customer counts, or payment-processing claims.",
  },
  {
    slug: "cleocure",
    title: "CleoCure",
    hook: "A live customer web platform for CleoCure Life Sciences, built end to end with React, Vite, and Cloudflare.",
    status: "live",
    layers: ["product", "infra"],
    stack: {
      product: ["React", "Vite"],
      infra: ["Cloudflare"],
    },
    architecture:
      "A React customer-facing web application, built with Vite and deployed on Cloudflare. The project covers the interface, application implementation, and deployment for CleoCure Life Sciences.",
    role: "Sole engineer: end-to-end web platform and deployment",
    proof: [{ label: "cleocure.com", url: "https://cleocure.com" }],
    icon: Globe,
    note: "Project and stack supplied in the current resume. Public website verified reachable in November 2026. No unpublished backend, commerce, traffic, or performance claims.",
  },
];

/** Everything publishable on the site. */
export const PUBLISHED_PROJECTS = PROJECTS.filter((p) => !p.draft);

export const FEATURED_PROJECTS = PUBLISHED_PROJECTS.filter(
  (p) => p.featured,
).sort((a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity));
