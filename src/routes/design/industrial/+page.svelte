<script lang="ts">
	import { onMount, tick } from "svelte";
	import { goto } from "$app/navigation";
	import { resolve, base } from "$app/paths";

	let fade = $state(false);
	let album: { index: number; cur: number } | null = $state(null);
	let touchStartX = 0;
	let touchStartY = 0;
	let dragX = $state(0);
	let dragging = $state(false);
	let animating = $state(false);
	onMount(() => { setTimeout(() => (fade = true), 50); });

	const projects = [
		{ slug: "pump", title: "充气泵", desc: "便携充气设备的产品造型与细节设计。", count: 5 },
		{ slug: "gaming-chair", title: "电竞椅 ID", desc: "面向沉浸式娱乐体验的电竞座椅设计。", count: 5 },
		{ slug: "water-dispenser", title: "智能饮水机 · 台面解决方案", desc: "智能台面饮水设备的产品与场景解决方案。", count: 9 }
	];

	type ImageVariant = "web" | "mobile" | "card" | "thumb";
	function imgOf(slug: string, i: number, variant: ImageVariant = "web") {
		return base + `/assets/imgs/design/industrial/${slug}/${variant}/img-${String(i + 1).padStart(2, "0")}.jpg`;
	}
	function countOf(index: number) { return projects[index].count; }
	function openAlbum(i: number) { album = { index: i, cur: 0 }; }
	function closeAlbum() { album = null; }
	function prev() { if (!album) return; const n = countOf(album.index); album.cur = (album.cur - 1 + n) % n; }
	function next() { if (!album) return; const n = countOf(album.index); album.cur = (album.cur + 1) % n; }
	function touchStart(event: TouchEvent) {
		if (animating) return;
		touchStartX = event.changedTouches[0].clientX;
		touchStartY = event.changedTouches[0].clientY;
		dragging = true;
	}
	function touchMove(event: TouchEvent) {
		if (!dragging || animating) return;
		const dx = event.changedTouches[0].clientX - touchStartX;
		const dy = event.changedTouches[0].clientY - touchStartY;
		if (Math.abs(dx) <= Math.abs(dy)) return;
		event.preventDefault();
		dragX = dx * 0.88;
	}
	async function finishSwipe(dx: number, dy: number) {
		if (Math.abs(dx) < 55 || Math.abs(dx) <= Math.abs(dy)) { dragX = 0; return; }
		animating = true;
		const direction = dx < 0 ? 1 : -1;
		dragX = direction * -Math.min(window.innerWidth, 520);
		await new Promise((resolve) => setTimeout(resolve, 190));
		direction > 0 ? next() : prev();
		await tick();
		dragging = true;
		dragX = direction * Math.min(window.innerWidth, 520) * 0.22;
		await tick();
		requestAnimationFrame(() => { dragging = false; dragX = 0; });
		await new Promise((resolve) => setTimeout(resolve, 260));
		animating = false;
	}
	function touchEnd(event: TouchEvent) {
		if (!dragging || animating) return;
		dragging = false;
		void finishSwipe(event.changedTouches[0].clientX - touchStartX, event.changedTouches[0].clientY - touchStartY);
	}
	function touchCancel() { dragging = false; dragX = 0; }
	function pointerStart(event: PointerEvent) {
		if (event.pointerType === "touch" || animating) return;
		touchStartX = event.clientX;
		touchStartY = event.clientY;
		dragging = true;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}
	function pointerMove(event: PointerEvent) {
		if (event.pointerType === "touch" || !dragging || animating) return;
		const dx = event.clientX - touchStartX;
		const dy = event.clientY - touchStartY;
		if (Math.abs(dx) <= Math.abs(dy)) return;
		event.preventDefault();
		dragX = dx * 0.88;
	}
	function pointerEnd(event: PointerEvent) {
		if (event.pointerType === "touch" || !dragging || animating) return;
		dragging = false;
		void finishSwipe(event.clientX - touchStartX, event.clientY - touchStartY);
	}
</script>

<svelte:head><title>工业设计 · The Model Weaver</title></svelte:head>
<svelte:window onkeydown={(event) => {
	if (!album) return;
	if (event.key === "ArrowLeft") prev();
	if (event.key === "ArrowRight") next();
	if (event.key === "Escape") closeAlbum();
}} />

<div class="page" class:fade>
	<div class="inner">
		<button class="back" onclick={() => goto(resolve("/design"))}>← 设计作品</button>
		<div class="badge">THE MODEL WEAVER · INDUSTRIAL</div>
		<h1>工业<span>设计</span></h1>
		<p class="tag">左右滑动浏览项目 · 点开作品后继续滑动翻页</p>

		<div class="grid">
			{#each projects as p, i}
				<button class="card" onclick={() => openAlbum(i)}>
					<div class="imgwrap">
						<picture>
							<source media="(max-width: 700px)" srcset={imgOf(p.slug, 0, "thumb")}>
							<img src={imgOf(p.slug, 0, "card")} alt={p.title} loading="lazy" decoding="async">
						</picture>
					</div>
					<div class="body">
						<h3>{p.title}</h3>
						<p>{p.desc}</p>
						<span class="open">打开相册 →</span>
					</div>
				</button>
			{/each}
		</div>

		<div class="footer"><p>by <b>The Model Weaver</b> · jinggege-666</p></div>
	</div>
</div>

{#if album}
	<div class="album">
		<button class="x" onclick={closeAlbum} aria-label="关闭相册">×</button>
		<button class="nav prev" onclick={prev} aria-label="上一张">‹</button>
		<div class="stage" role="group" aria-label="拖动或滑动切换作品图片" ontouchstart={touchStart} ontouchmove={touchMove} ontouchend={touchEnd} ontouchcancel={touchCancel} onpointerdown={pointerStart} onpointermove={pointerMove} onpointerup={pointerEnd} onpointercancel={touchCancel}>
			<picture class:dragging style:transform={`translate3d(${dragX}px, 0, 0) scale(${1 - Math.min(Math.abs(dragX) / 9000, 0.035)})`} style:opacity={1 - Math.min(Math.abs(dragX) / 1600, 0.22)}>
				<source media="(max-width: 700px)" srcset={imgOf(projects[album.index].slug, album.cur, "mobile")}>
				<img class="main" src={imgOf(projects[album.index].slug, album.cur)} alt={projects[album.index].title} decoding="async" fetchpriority="high" draggable="false">
			</picture>
		</div>
		<button class="nav next" onclick={next} aria-label="下一张">›</button>
		<div class="cap">
			<span class="name">{projects[album.index].title}</span>
			<span class="count">{album.cur + 1} / {countOf(album.index)}</span>
		</div>
		<div class="swipe-hint">← 左右滑动 →</div>
		<div class="thumbs">
			{#each Array(countOf(album.index)) as _, i}
				<button class="t" class:on={i === album.cur} onclick={() => { if (album) album.cur = i; }} aria-label={`查看第 ${i + 1} 张`}>
					<img src={imgOf(projects[album.index].slug, i, "thumb")} alt="" loading="lazy" decoding="async">
				</button>
			{/each}
		</div>
	</div>
{/if}

<style>
	:global(body) { background:#0e0e10; }
	.page { font-family:"Questrial","PingFang SC","Microsoft YaHei",sans-serif; color:#f2f2f2; min-height:100vh; background:#0e0e10; opacity:0; transform:translateY(14px); transition:opacity .7s ease, transform .7s ease; }
	.page.fade { opacity:1; transform:none; }
	.inner { max-width:1100px; margin:0 auto; padding:48px 24px 70px; }
	.back { display:block; width:fit-content; background:transparent; border:1px solid #2a2a2e; color:#a7a7ad; border-radius:999px; padding:7px 16px; cursor:pointer; font-size:14px; margin:0 0 26px; }
	.back:hover { color:#f2f2f2; border-color:#555; }
	.badge { display:inline-block; border:1px solid #2a2a2e; border-radius:999px; padding:6px 16px; font-size:13px; color:#a7a7ad; letter-spacing:.12em; margin-bottom:22px; }
	h1 { font-family:"Songti SC",serif; font-size:clamp(38px,6vw,68px); font-weight:700; line-height:1.06; }
	h1 span { background:linear-gradient(90deg,#7c8cff,#ff7c9b); -webkit-background-clip:text; background-clip:text; color:transparent; }
	.tag { margin-top:16px; color:#a7a7ad; font-size:16px; }
	.grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:22px; margin-top:32px; }
	.card { background:#17171a; border:1px solid #2a2a2e; border-radius:16px; overflow:hidden; padding:0; cursor:pointer; text-align:left; color:#f2f2f2; transition:border-color .3s ease, transform .3s ease; }
	.card:hover { border-color:#4a4a55; transform:translateY(-3px); }
	.imgwrap { aspect-ratio:16/10; overflow:hidden; background:#202024; }
	.imgwrap picture, .imgwrap img { display:block; width:100%; height:100%; }
	.imgwrap img { object-fit:cover; }
	.body { padding:16px 18px 18px; }
	.body h3 { font-size:20px; margin:0 0 6px; }
	.body p { color:#a7a7ad; font-size:14px; margin:0 0 12px; min-height:40px; }
	.open { color:#7c8cff; font-size:14px; }
	.album { position:fixed; inset:0; z-index:1000; background:rgba(10,10,12,.98); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:18px; }
	.stage { width:88vw; height:72vh; display:flex; align-items:center; justify-content:center; touch-action:pan-y; cursor:grab; }
	.stage:active { cursor:grabbing; }
	.stage picture { display:flex; width:100%; height:100%; align-items:center; justify-content:center; transition:transform .24s cubic-bezier(.22,.8,.28,1), opacity .2s ease; will-change:transform,opacity; }
	.stage picture.dragging { transition:none; }
	.main { max-width:100%; max-height:100%; border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,.6); user-select:none; }
	.nav { position:absolute; top:50%; transform:translateY(-50%); width:56px; height:56px; border-radius:50%; border:1px solid #2a2a2e; background:rgba(23,23,26,.65); color:#f2f2f2; font-size:28px; cursor:pointer; line-height:1; }
	.nav.prev { left:24px; }
	.nav.next { right:24px; }
	.x { position:absolute; top:20px; right:24px; width:46px; height:46px; border-radius:50%; border:1px solid #2a2a2e; background:rgba(10,10,12,.55); color:#f2f2f2; font-size:30px; cursor:pointer; line-height:1; z-index:2; }
	.cap { display:flex; gap:24px; align-items:baseline; margin-top:10px; }
	.name { font-family:"Songti SC",serif; font-size:20px; }
	.count { color:#a7a7ad; font-size:14px; }
	.swipe-hint { display:none; color:#777782; font-size:12px; margin-top:5px; }
	.thumbs { display:flex; gap:8px; margin-top:12px; max-width:88vw; overflow-x:auto; }
	.t { width:56px; height:42px; flex:0 0 auto; border:1px solid #2a2a2e; border-radius:6px; overflow:hidden; padding:0; cursor:pointer; opacity:.55; }
	.t img { width:100%; height:100%; object-fit:cover; }
	.t.on { opacity:1; border-color:#7c8cff; }
	.footer { text-align:center; padding-top:56px; color:#a7a7ad; font-size:14px; border-top:1px solid #2a2a2e; margin-top:50px; }

	@media only screen and (max-width: 700px) {
		.inner { padding:30px 16px 54px; }
		.back { position:static; margin:0 0 18px; }
		.grid { display:flex; overflow-x:auto; gap:14px; scroll-snap-type:x mandatory; scrollbar-width:none; margin-left:-16px; margin-right:-16px; padding:0 16px 10px; }
		.grid::-webkit-scrollbar { display:none; }
		.card { flex:0 0 84vw; scroll-snap-align:center; }
		.album { padding:12px; }
		.stage { width:100vw; height:68vh; }
		.main { max-width:94vw; max-height:68vh; border-radius:8px; }
		.nav { display:none; }
		.x { top:12px; right:12px; background:rgba(10,10,12,.75); }
		.cap { margin-top:8px; }
		.swipe-hint { display:block; }
		.thumbs { max-width:94vw; margin-top:9px; }
	}
</style>
