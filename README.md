Pardhu Karnati’s portfolio, built with Next.js, React, Tailwind CSS, and Framer Motion.

## Branding and sharing

Page titles, descriptions, canonical URLs, and the production domain live in `lib/site.ts`. Project content lives in `lib/projects.ts`. The sitemap and sharing previews include published projects automatically.

`app/share/[slug]/route.tsx` generates a distinct 1200×630 preview for each page and published project. Preview the homepage image at `/share/home` and a project image at `/share/project-mr-rider`.

Edit `app/icon.svg` to update the PK monogram, then run `npm run brand:icons` to regenerate the favicon and Apple icon. The generator uses the Sharp package installed with Next.js.

To check the production metadata, run `npm run build`, start the production server with `npm run start -- --port 3001`, then run `npm run check:metadata` in another terminal. To check another server, use `npm run check:metadata -- https://your-domain.example`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
