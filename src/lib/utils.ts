import { imgPromises } from "./store";
import { base } from "$app/paths";

// Prefix asset/data paths with the base path (for GitHub Pages subpath deployment)
function withBase(p: string) {
	const clean = p.startsWith("/") ? p : "/" + p;
	return base + clean; // base is '' locally, '/the-model-weaver' in prod
}

// Load images asynchronously during page loading animation
export async function loadImage(src: string) {
    const promise =  new Promise(async (resolve: (src: string) => void, reject) => {
        const blob = await (await fetch(withBase(src))).blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

    imgPromises.update(val => [...val, promise]);
    return promise;
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