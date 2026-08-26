<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { base } from "$app/paths";

	let fade = $state(false);
	onMount(() => { setTimeout(() => (fade = true), 50); });

	// Album state
	let album: { index: number; cur: number } | null = $state(null);

	const projects = [
		{ slug: "p1", title: "曲线鎏金录", desc: "黑金空间 · 曲线与鎏金的现代演绎。", count: 7 },
		{ slug: "p2", title: "摩登轻奢 · 卧室", desc: "轻奢基调的卧室设计，质感与舒适并存。", count: 13 },
		{ slug: "p3", title: "摩登轻奢 · 170㎡样板间", desc: "170㎡ 样板间，摩登轻奢的整宅空间规划。", count: 10 },
		{ slug: "p4", title: "东方雅韵 · 东意四境", desc: "东方雅韵的空间四境，含蓄雅致的意境表达。", count: 23 }
	];

	function imgOf(slug: string, i: number) {
		return base + `/assets/imgs/design/interior/${slug}/img-${String(i + 1).padStart(2, "0")}.jpg`;
	}
	function countOf(index: number) { return projects[index].count; }
	function openAlbum(i: number) { album = { index: i, cur: 0 }; }
	function closeAlbum() { album = null; }
	function prev() { if (!album) return; const n = countOf(album.index); album.cur = (album.cur - 1 + n) % n; }
	function next() { if (!album) return; const n = countOf(album.index); album.cur = (album.cur + 1) % n; }
</script>

<svelte:head><title>室内设计 · The Model Weaver</title></svelte:head>

<div class="page" class:fade>
	<div class="inner">
		<button class="back" onclick={() => goto(resolve("/design"))}>← 设计作品</button>
		<div class="badge">THE MODEL WEAVER · INTERIOR</div>
		<h1>室内<span>设计</span></h1>
		<p class="tag">私宅 · 样板间 · 空间叙事 · 点开作品翻相册</p>

		<div class="grid">
			{#each projects as p, i}
				<button class="card" onclick={() => openAlbum(i)}>
					<div class="imgwrap"><img src={imgOf(p.slug, 0)} alt={p.title} loading="lazy"></div>
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
		<button class="x" onclick={closeAlbum}>×</button>
		<button class="nav prev" onclick={prev}>‹</button>
		<img class="main" src={imgOf(projects[album.index].slug, album.cur)} alt={projects[album.index].title}>
		<button class="nav next" onclick={next}>›</button>
		<div class="cap">
			<span class="name">{projects[album.index].title}</span>
			<span class="count">{album.cur + 1} / {countOf(album.index)}</span>
		</div>
		<div class="thumbs">
			{#each Array(countOf(album.index)) as _, i}
				<button class="t" class:on={i === album.cur} onclick={() => (album.cur = i)}>
					<img src={imgOf(projects[album.index].slug, i)} alt="" loading="lazy">
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
	.back { background:transparent; border:1px solid #2a2a2e; color:#a7a7ad; border-radius:999px; padding:7px 16px; cursor:pointer; font-size:14px; margin-bottom:26px; }
	.back:hover { color:#f2f2f2; border-color:#555; }
	@media only screen and (max-width: 950px) { .back { position: static; margin: 0 auto 18px; display: block; } }
	.badge { display:inline-block; border:1px solid #2a2a2e; border-radius:999px; padding:6px 16px; font-size:13px; color:#a7a7ad; letter-spacing:.12em; margin-bottom:22px; }
	h1 { font-family:"Songti SC",serif; font-size:clamp(38px,6vw,68px); font-weight:700; line-height:1.06; }
	h1 span { background:linear-gradient(90deg,#7c8cff,#ff7c9b); -webkit-background-clip:text; background-clip:text; color:transparent; }
	.tag { margin-top:16px; color:#a7a7ad; font-size:16px; }
	.grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:22px; margin-top:32px; }
	.card { background:#17171a; border:1px solid #2a2a2e; border-radius:16px; overflow:hidden; padding:0; cursor:pointer; text-align:left; color:#f2f2f2; transition:border-color .3s ease, transform .3s ease; }
	.card:hover { border-color:#4a4a55; transform:translateY(-3px); }
	.imgwrap { aspect-ratio:16/10; overflow:hidden; }
	.imgwrap img { width:100%; height:100%; object-fit:cover; }
	.body { padding:16px 18px 18px; }
	.body h3 { font-size:20px; margin:0 0 6px; }
	.body p { color:#a7a7ad; font-size:14px; margin:0 0 12px; }
	.open { color:#7c8cff; font-size:14px; }

	.album { position:fixed; inset:0; z-index:1000; background:rgba(10,10,12,.97); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px; }
	.main { max-width:88vw; max-height:76vh; border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,.6); }
	.nav { position:absolute; top:50%; transform:translateY(-50%); width:56px; height:56px; border-radius:50%; border:1px solid #2a2a2e; background:rgba(23,23,26,.6); color:#f2f2f2; font-size:28px; cursor:pointer; line-height:1; }
	.nav:hover { border-color:#4a4a55; }
	.nav.prev { left:24px; }
	.nav.next { right:24px; }
	.x { position:absolute; top:20px; right:24px; width:46px; height:46px; border-radius:50%; border:1px solid #2a2a2e; background:transparent; color:#f2f2f2; font-size:30px; cursor:pointer; line-height:1; }
	.x:hover { border-color:#4a4a55; }
	.cap { display:flex; gap:24px; align-items:baseline; margin-top:16px; }
	.name { font-family:"Songti SC",serif; font-size:20px; }
	.count { color:#a7a7ad; font-size:14px; }
	.thumbs { display:flex; gap:8px; margin-top:18px; max-width:88vw; overflow-x:auto; }
	.t { width:56px; height:42px; flex:0 0 auto; border:1px solid #2a2a2e; border-radius:6px; overflow:hidden; padding:0; cursor:pointer; opacity:.55; }
	.t img { width:100%; height:100%; object-fit:cover; }
	.t.on { opacity:1; border-color:#7c8cff; }
	.footer { text-align:center; padding-top:56px; color:#a7a7ad; font-size:14px; border-top:1px solid #2a2a2e; margin-top:50px; }
</style>
