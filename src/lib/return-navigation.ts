import { goto } from "$app/navigation";
import { resolve } from "$app/paths";

const keyFor = (pathname: string) => `jinge:return:${pathname}`;

export function rememberReturn(pathname: string) {
	sessionStorage.setItem(keyFor(pathname), location.pathname + location.search);
}

export function returnTo(fallback: "/" | "/design") {
	const key = keyFor(location.pathname);
	if (sessionStorage.getItem(key)) {
		sessionStorage.removeItem(key);
		history.back();
		return;
	}
	void goto(resolve(fallback));
}
