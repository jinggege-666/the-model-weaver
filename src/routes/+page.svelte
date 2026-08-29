<script lang="ts">

	import slickScroll from "slickscrolljs";
	import { onMount } from "svelte";
	import { beforeNavigate } from "$app/navigation";
	import { rememberReturn } from "$lib/return-navigation";
	import { loadPageResolve } from "$lib/store";
	import { devMsg } from "$lib/utils";
	import workData from "../../static/data/work-data.json";
	import siteData from "../../static/data/data.json";
	import type { WorkData } from "$lib/types";
	import HomeSection from "$lib/sections/home.svelte";
	import WorkSection from "$lib/sections/work.svelte";
	import AboutSection from "$lib/sections/about.svelte";
	import NavComponent from "$lib/components/nav.svelte"
	import Footer from "$lib/components/footer.svelte";
	import CursorDot from "$lib/components/cursor-dot.svelte"
    import { dataState, viewPortState } from "$lib/state.svelte";

	let scrollContainer: HTMLElement = $state()!;
	let navBar: HTMLElement = $state()!;

	beforeNavigate(({ from, to }) => {
		if (!from || !to || from.url.pathname === to.url.pathname || !scrollContainer) return;
		sessionStorage.setItem("jinge:home-scroll", String(scrollContainer.scrollTop));
		rememberReturn(to.url.pathname);
	});

	onMount(async () => {
		const savedScroll = Number(sessionStorage.getItem("jinge:home-scroll"));
		sessionStorage.removeItem("jinge:home-scroll");
		// Disable scrolling on initial load
		scrollContainer.style.overflowY = "hidden";
		scrollContainer.scrollTo(0, 0);
		
		// These tiny datasets are bundled so mobile startup does not wait on two
		// additional GitHub Pages requests.
		dataState.workData = workData as WorkData;
		dataState.siteData = siteData;

		loadPageResolve(); // Resolve loadPagePromise
		devMsg();

		// Resolve slickScroll promise and pass momentumScroll's value
		viewPortState.slickscrollInstance = new (slickScroll as any)({
			root: scrollContainer,
			easing: "easeOutCirc",
			duration: 1500,
			fixedOffsets: [
				navBar
			]
		});

		// Enable scrolling
		scrollContainer.style.overflowX = "hidden";
		scrollContainer.style.overflowY = "auto";

		if (Number.isFinite(savedScroll) && savedScroll > 0) {
			requestAnimationFrame(() => requestAnimationFrame(() => scrollContainer.scrollTo(0, savedScroll)));
		}
	});

</script>



<!-- Cursor dot tracking when mouse moves inside the body -->
<CursorDot></CursorDot>

<div id="scroll-frame" bind:this={scrollContainer}>
	<!-- Top nav-bar and mobile nav-bar -->
	<div id="nav-bar" bind:this={navBar}>
		<NavComponent scrollContainer={scrollContainer}></NavComponent>
	</div>
	<!-- page sections -->
	<HomeSection></HomeSection>
	<WorkSection></WorkSection>
	<AboutSection></AboutSection>
	<Footer></Footer>
</div>




<style lang="sass">

:global(canvas)
	position: absolute
	top: 0
	left: 0
	z-index: -1
	
:global(body)
	background-color: #222224
	overflow: hidden
	color: white
	margin: 0
	padding: 0
	-moz-osx-font-smoothing: grayscale
	-webkit-font-smoothing: antialiased
	font-family: "Questrial", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif

:global(*)
	margin: 0
	padding: 0
	-moz-osx-font-smoothing: grayscale
	-webkit-font-smoothing: antialiased

#scroll-frame
	top: 0
	left: 0
	width: 100%
	height: 100vh
	position: relative
	overflow: hidden auto

#nav-bar
	position: fixed
	top: 10vh
	z-index: 100

</style>
