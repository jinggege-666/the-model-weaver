<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	let fade = $state(false);
	onMount(() => { setTimeout(() => (fade = true), 50); });
</script>

<svelte:head><title>工业设计 · The Model Weaver</title></svelte:head>

<div class="page" class:fade>
	<div class="inner">
		<button class="back" onclick={() => goto(resolve("/design"))}>← 设计作品</button>
		<div class="badge">THE MODEL WEAVER · INDUSTRIAL</div>
		<h1>工业<span>设计</span></h1>
		<p class="tag">产品 · 工业设计作品</p>

		<div class="empty">
			<div class="emoji">⏳</div>
			<p>工业设计作品整理中…</p>
			<p class="hint">素材完善后会补充到这里。</p>
		</div>

		<div class="footer"><p>by <b>The Model Weaver</b> · jinggege-666</p></div>
	</div>
</div>

<style>
	:global(body) { background:#0e0e10; }
	.page { font-family:"Questrial","PingFang SC","Microsoft YaHei",sans-serif; color:#f2f2f2; min-height:100vh; background:#0e0e10; opacity:0; transform:translateY(14px); transition:opacity .7s ease, transform .7s ease; }
	.page.fade { opacity:1; transform:none; }
	.inner { max-width:1080px; margin:0 auto; padding:48px 24px 70px; }
	.back { background:transparent; border:1px solid #2a2a2e; color:#a7a7ad; border-radius:999px; padding:7px 16px; cursor:pointer; font-size:14px; margin-bottom:26px; }
	.back:hover { color:#f2f2f2; border-color:#555; }
	@media only screen and (max-width: 950px) { .back { position: static; margin: 0 auto 18px; display: block; } }
	.badge { display:inline-block; border:1px solid #2a2a2e; border-radius:999px; padding:6px 16px; font-size:13px; color:#a7a7ad; letter-spacing:.12em; margin-bottom:22px; }
	h1 { font-family:"Songti SC",serif; font-size:clamp(38px,6vw,68px); font-weight:700; line-height:1.06; }
	h1 span { background:linear-gradient(90deg,#7c8cff,#ff7c9b); -webkit-background-clip:text; background-clip:text; color:transparent; }
	.tag { margin-top:16px; color:#a7a7ad; font-size:17px; }
	.empty { margin-top:40px; padding:64px 24px; text-align:center; border:1px dashed #2a2a2e; border-radius:16px; }
	.emoji { font-size:44px; margin-bottom:16px; }
	.empty p { color:#a7a7ad; font-size:18px; }
	.hint { font-size:14px !important; margin-top:10px; opacity:.8; }
	.footer { text-align:center; padding-top:56px; color:#a7a7ad; font-size:14px; border-top:1px solid #2a2a2e; margin-top:50px; }
</style>
