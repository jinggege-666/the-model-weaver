import { base } from "$app/paths";

// Prefix asset/data paths with the base path (for GitHub Pages subpath deployment)
function withBase(p: string) {
	const clean = p.startsWith("/") ? p : "/" + p;
	return base + clean; // base is '' locally, '/the-model-weaver' in prod
}

// Let the browser stream, decode, cache and lazily load images natively.
// Converting every image to a base64 blob delayed mobile first paint and
// duplicated the image data in memory.
export function loadImage(src: string) {
    return withBase(src);
}

export function fetchJsonData(sourceFile: string) {
    return new Promise(async (resolve: (data: any) => void) => {
        const request = await fetch(withBase(sourceFile));
        const data = await request.json();
        resolve(data);
    });
}

export function onScrolledIntoView(node: HTMLElement, entryInView: (entry: IntersectionObserverEntry) => void) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entryInView(entry);
                observer.disconnect();
            }
        });
    }, {
        root: null,
        threshold: 0.4
    });

    observer.observe(node);
}

export function devMsg() {
    const css = "font-size: 1.2rem; font-weight: bold;";
    console.log("%cInterested in how this site works?", css + "color: #22c55e;")
    console.log("%cCheck out the source code: https://github.com/Musab-Hassan/musabhassan.com", css);
}
