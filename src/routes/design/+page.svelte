<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	let fade = $state(false);
	onMount(() => { setTimeout(() => (fade = true), 50); });
</script>

<svelte:head><title>设计作品 · The Model Weaver</title></svelte:head>

<div class="page" class:fade>
	<div class="inner">
		<button class="back" onclick={() => goto(resolve("/"))}>← 返回首页</button>
		<div class="badge">THE MODEL WEAVER · DESIGN</div>
		<h1>设计<span>作品</span></h1>
		<p class="tag">选择一个方向，进入你的作品</p>

		<div class="grid">
			<button class="chain" onclick={() => goto(resolve("/design/interior"))}>
				<div class="emoji">🛋️</div>
				<h3>室内设计</h3>
				<p>私宅 · 样板间 · 空间叙事</p>
				<span class="go">进入 →</span>
			</button>

			<button class="chain" onclick={() => goto(resolve("/design/industrial"))}>
				<div class="emoji">⚙️</div>
				<h3>工业设计</h3>
				<p>产品 · 工业设计作品</p>
				<span class="go">进入 →</span>
			</button>
		</div>

		<div class="footer"><p>by <b>The Model Weaver</b> · jinggege-666</p></div>
	</div>
</div>

<style>
	:global(body) { background:#0e0e10; }
	.page { font-family:"Questrial","PingFang SC","Microsoft YaHei",sans-serif; color:#f2f2f2; min-height:100vh; background:#0e0e10; opacity:0; transform:translateY(14px); transition:opacity .7s ease, transform .7s ease; }
	.page.fade { opacity:1; transform:none; }
	.inner { max-width:900px; margin:0 auto; padding:48px 24px 70px; text-align:center; }
	.back { background:transparent; border:1px solid #2a2a2e; color:#a7a7ad; border-radius:999px; padding:7px 16px; cursor:pointer; font-size:14px; margin-bottom:26px; }
	.back:hover { color:#f2f2f2; border-color:#555; }
	@media only screen and (max-width: 950px) { .back { position: static; margin: 0 auto 18px; display: block; } }
	.badge { display:inline-block; border:1px solid #2a2a2e; border-radius:999px; padding:6px 16px; font-size:13px; color:#a7a7ad; letter-spacing:.12em; margin-bottom:22px; }
	h1 { font-family:"Songti SC",serif; font-size:clamp(38px,6vw,68px); font-weight:700; line-height:1.06; }
	h1 span { background:linear-gradient(90deg,#7c8cff,#ff7c9b); -webkit-background-clip:text; background-clip:text; color:transparent; }
	.tag { margin-top:16px; color:#a7a7ad; font-size:17px; }
	.grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:22px; margin-top:40px; text-align:left; }
	.chain { background:#17171a; border:1px solid #2a2a2e; border-radius:16px; padding:32px 28px; cursor:pointer; color:#f2f2f2; text-align:left; transition:border-color .3s ease, transform .3s ease; }
	.chain:hover { border-color:#4a4a55; transform:translateY(-3px); }
	.emoji { font-size:38px; margin-bottom:14px; }
	h3 { font-size:24px; margin:0 0 8px; }
	.chain p { color:#a7a7ad; font-size:15px; margin:0 0 18px; }
	.go { color:#7c8cff; font-size:15px; }
	.footer { text-align:center; padding-top:56px; color:#a7a7ad; font-size:14px; border-top:1px solid #2a2a2e; margin-top:50px; }
	@media only screen and (max-width: 700px) {
		.inner { padding:30px 16px 54px; }
		.grid { display:flex; overflow-x:auto; gap:14px; scroll-snap-type:x mandatory; scrollbar-width:none; margin-left:-16px; margin-right:-16px; padding:0 16px 10px; }
		.grid::-webkit-scrollbar { display:none; }
		.chain { flex:0 0 84vw; scroll-snap-align:center; }
	}
</style>
