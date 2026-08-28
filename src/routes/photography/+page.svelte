<script lang="ts">
	import { goto } from "$app/navigation";
	import { base, resolve } from "$app/paths";

	let loaded = $state(false);
</script>

<svelte:head><title>摄影作品 · JINGE</title></svelte:head>

<div class="photography-page">
	<header>
		<button onclick={() => goto(resolve("/"))}>← 返回我的主页</button>
		<span>JINGE · 摄影作品</span>
	</header>
	{#if !loaded}
		<div class="loading" aria-live="polite">
			<div class="pulse"></div>
			<p>正在打开摄影作品…</p>
		</div>
	{/if}
	<iframe
		class:ready={loaded}
		src={base + "/photography-gallery/index.html"}
		title="JINGE 摄影作品集"
		loading="eager"
		onload={() => (loaded = true)}
	></iframe>
</div>

<style>
	:global(html), :global(body) { margin:0; overflow:hidden; background:#0b0b0d; }
	.photography-page { height:100dvh; display:flex; flex-direction:column; background:#0b0b0d; color:#f5eee1; font-family:"PingFang SC","Microsoft YaHei",sans-serif; }
	header { height:54px; flex:0 0 54px; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:0 14px; border-bottom:1px solid rgba(255,255,255,.1); background:#131316; box-sizing:border-box; }
	header button { border:1px solid rgba(217,185,138,.4); border-radius:999px; padding:8px 13px; background:rgba(217,185,138,.08); color:#d9b98a; font-size:13px; cursor:pointer; }
	header span { font-size:13px; letter-spacing:1px; color:#9a9284; white-space:nowrap; }
	.loading { position:absolute; inset:54px 0 0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; background:#0b0b0d; color:#9a9284; font-size:13px; letter-spacing:.08em; }
	.pulse { width:42px; height:42px; border-radius:50%; border:2px solid rgba(217,185,138,.18); border-top-color:#d9b98a; animation:spin .8s linear infinite; }
	iframe { width:100%; flex:1 1 auto; border:0; background:#0b0b0d; opacity:0; transition:opacity .18s ease; }
	iframe.ready { opacity:1; }
	@keyframes spin { to { transform:rotate(360deg); } }
	@media (max-width:480px) {
		header { height:50px; flex-basis:50px; padding:0 10px; }
		header button { padding:7px 11px; font-size:12px; }
		header span { font-size:11px; }
		.loading { inset:50px 0 0; }
	}
</style>
