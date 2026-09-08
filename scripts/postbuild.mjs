import { copyFile, mkdir, writeFile } from "node:fs/promises";

// GitHub Pages serves 404.html for client-side routes such as /video.
// Keep it identical to the SPA entry and prevent Jekyll from filtering assets.
await copyFile("docs/index.html", "docs/404.html");
await writeFile("docs/.nojekyll", "", "utf8");

// Some in-app browsers (notably WeChat) stop on an HTTP 404 before the SPA
// fallback can run. Give every public route a real index.html with HTTP 200.
const publicRoutes = [
	"home",
	"design",
	"design/interior",
	"design/industrial",
	"photography",
	"skills",
	"contact",
	"video"
];

for (const route of publicRoutes) {
	const outputDir = `docs/${route}`;
	await mkdir(outputDir, { recursive: true });
	await copyFile("docs/index.html", `${outputDir}/index.html`);
}
