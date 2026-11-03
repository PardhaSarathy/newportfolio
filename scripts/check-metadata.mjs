import assert from "node:assert/strict";
import sharp from "sharp";

const base = process.argv[2] ?? "http://localhost:3001";
const canonicalOrigin = "https://pardhukarnati.vercel.app";
const decode = (value) =>
  value
    ?.replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
const attribute = (tag, name) =>
  decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1]);
const tags = (html, type) =>
  html.match(new RegExp(`<${type}\\b[^>]*>`, "gi")) ?? [];
const meta = (html, key) =>
  tags(html, "meta").find(
    (tag) =>
      attribute(tag, "property") === key || attribute(tag, "name") === key,
  );
const content = (html, key) => attribute(meta(html, key) ?? "", "content");

async function get(path) {
  const response = await fetch(new URL(path, base), {
    headers: { "User-Agent": "Twitterbot/1.0" },
  });
  assert.equal(response.status, 200, `Unexpected status for ${path}`);
  return response;
}

const sitemap = await (await get("/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
  decode(match[1]),
);
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap entries");
assert.equal(
  urls.length,
  14,
  "Expected five main pages and nine published projects",
);
for (const required of [
  "/",
  "/about",
  "/projects",
  "/certifications",
  "/contact",
  "/projects/mr-rider",
  "/projects/mr-sales",
]) {
  assert(
    urls.includes(new URL(required, canonicalOrigin).href),
    `Sitemap missing ${required}`,
  );
}
assert(
  !urls.some((url) => url.includes("production-rag")),
  "Draft project leaked into sitemap",
);

const previews = new Set();
for (const url of urls) {
  assert.equal(new URL(url).origin, canonicalOrigin, "Wrong sitemap origin");
  const path = new URL(url).pathname;
  const response = await get(path);
  const html = await response.text();
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1]);
  assert(title?.includes("Pardhu"), `Missing branded title: ${path}`);
  assert(
    content(html, "description")?.length > 30,
    `Missing description: ${path}`,
  );
  const canonical = tags(html, "link").find(
    (tag) => attribute(tag, "rel") === "canonical",
  );
  assert.equal(
    new URL(attribute(canonical ?? "", "href")).href,
    new URL(url).href,
    `Incorrect canonical: ${path}`,
  );
  assert.equal(
    new URL(content(html, "og:url")).href,
    new URL(url).href,
    `Incorrect Open Graph URL: ${path}`,
  );
  assert.equal(
    content(html, "og:title"),
    title,
    `Inherited/wrong Open Graph title: ${path}`,
  );
  assert.equal(
    content(html, "twitter:title"),
    title,
    `Inherited/wrong Twitter title: ${path}`,
  );
  assert.equal(content(html, "twitter:card"), "summary_large_image");
  assert.equal(content(html, "og:image:width"), "1200");
  assert.equal(content(html, "og:image:height"), "630");
  const image = content(html, "og:image");
  assert.equal(
    new URL(image).origin,
    canonicalOrigin,
    `Wrong image origin: ${path}`,
  );
  assert.equal(
    content(html, "twitter:image"),
    image,
    `Sharing image mismatch: ${path}`,
  );
  assert(!previews.has(image), `Page inherited another page's image: ${path}`);
  previews.add(image);
  const imageResponse = await get(new URL(image).pathname);
  assert(imageResponse.headers.get("content-type")?.includes("image/png"));
  const dimensions = await sharp(
    Buffer.from(await imageResponse.arrayBuffer()),
  ).metadata();
  assert.equal(dimensions.width, 1200);
  assert.equal(dimensions.height, 630);
  console.log(`PASS ${path} — canonical, metadata, and 1200×630 sharing image`);
}

const robots = await (await get("/robots.txt")).text();
assert(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
const favicon = Buffer.from(await (await get("/favicon.ico")).arrayBuffer());
assert.equal(favicon.readUInt16LE(2), 1);
assert.equal(favicon.readUInt16LE(4), 3);
const apple = await sharp(
  Buffer.from(await (await get("/apple-icon.png")).arrayBuffer()),
).metadata();
assert.equal(apple.width, 180);
assert.equal(apple.height, 180);
const svg = await (await get("/icon.svg")).text();
assert(svg.includes("#0A1C16") && svg.includes("#2CC082"));
console.log(
  `PASS sitemap, robots, and PK icons. ${urls.length} pages and ${previews.size} unique sharing images checked.`,
);
