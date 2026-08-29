import { copyFile, writeFile } from "node:fs/promises";

// GitHub Pages serves 404.html for client-side routes such as /video.
// Keep it identical to the SPA entry and prevent Jekyll from filtering assets.
await copyFile("docs/index.html", "docs/404.html");
await writeFile("docs/.nojekyll", "", "utf8");
