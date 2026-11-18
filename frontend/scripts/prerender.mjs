
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const envFile = fs.readFileSync(
  path.resolve(".env"),
  "utf-8"
);

const envValues = Object.fromEntries(
  envFile
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const separatorIndex = line.indexOf("=");
      return [
        line.slice(0, separatorIndex).trim(),
        line.slice(separatorIndex + 1).trim(),
      ];
    })
);

const SITE_URL = (
  process.env.VITE_FRONT_END_ULR ||
  envValues.VITE_FRONT_END_ULR ||
  "https://wcmrp.confworld.org"
).replace(/\/+$/, "");

const dist = path.resolve("dist");
const ssrDir = path.resolve("dist-ssr");

const routes = [
  "/",
  "/contact",
  "/venue",
  "/frequently-asked-questions",
  "/Publication",
  "/Committee-Members",
  "/Session-Tracks-&-Call-For-Papers",
  "/About-WCMRP",
  "/About-Organizer",
  "/Submission-Guidelines",
  "/Available-payment-methods",
  "/Registration-Instructions",
  "/Terms-and-Conditions",
  "/Essential-Downloads",
  "/Speakers",
  "/Registration-Fee",
  "/Academic-Partnership",
  "/abstract-full-paper-submission",
  "/organizing-committee-member-form",
];

const escapeAttr = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const escapeXml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

if (!fs.existsSync(path.join(dist, "index.html"))) {
  throw new Error("dist/index.html not found. Run the client build first.");
}

if (!fs.existsSync(ssrDir)) {
  throw new Error("dist-ssr folder not found. Run the SSR build first.");
}

const template = fs.readFileSync(
  path.join(dist, "index.html"),
  "utf-8"
);

const ROOT_MARKER = '<div id="root"><!--app-html--></div>';
const HEAD_MARKER = "<!--app-head-->";

if (
  !template.includes(ROOT_MARKER) ||
  !template.includes(HEAD_MARKER)
) {
  throw new Error(
    "index.html is missing the app-head or root placeholder."
  );
}

const serverFile = fs
  .readdirSync(ssrDir)
  .find((file) => file.startsWith("entry-server.") && file.endsWith(".js"));

if (!serverFile) {
  throw new Error("Could not find entry-server.js in dist-ssr.");
}

const { render } = await import(
  pathToFileURL(path.join(ssrDir, serverFile)).href
);

fs.writeFileSync(
  path.join(dist, "200.html"),
  template
);

const failed = [];

for (const url of routes) {
  try {
    const { html, head = "" } = render(url);

    const page = template
      .replace(HEAD_MARKER, () => head)
      .replace(
        ROOT_MARKER,
        () =>
          `<div id="root" data-path="${escapeAttr(url)}">${html}</div>`
      );

    const outputFile =
      url === "/"
        ? path.join(dist, "index.html")
        : path.join(dist, url.replace(/^\/+/, ""), "index.html");

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, page);

    console.log("Prerendered:", url);
  } catch (error) {
    failed.push(url);
    console.error("FAILED:", url, error);
  }
}

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map(
      (url) =>
        `  <url><loc>${escapeXml(SITE_URL + url)}</loc></url>`
    )
    .join("\n") +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

if (failed.length) {
  console.error(`${failed.length} route(s) failed to prerender.`);
  process.exit(1);
}

console.log(`\nSuccessfully prerendered ${routes.length} routes.`);
