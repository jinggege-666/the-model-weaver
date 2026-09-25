<script lang="ts">
	import { base } from "$app/paths";
	import { onMount } from "svelte";
	import { returnTo } from "$lib/return-navigation";
	import videoData from "../../../static/data/video-works.json";

	type VideoWork = {
		id: string;
		title: string;
		subtitle: string;
		duration_seconds: number;
		video: string;
		mobile_video: string;
		poster: string;
	};

	const videos = videoData as VideoWork[];
	let fade = $state(false);
	let activeVideo = $state<VideoWork | null>(null);
	let activeVideoSource = $state("");

	function openPlayer(item: VideoWork) {
		const useLightweightSource = window.matchMedia("(max-width: 900px)").matches
			|| /Android|iPhone|iPad|iPod|Mobile|MicroMessenger/i.test(navigator.userAgent);
		activeVideoSource = useLightweightSource ? item.mobile_video : item.video;
		activeVideo = item;
	}

	function closePlayer() {
		activeVideo = null;
		activeVideoSource = "";
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") closePlayer();
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) closePlayer();
	}

	onMount(() => { setTimeout(() => (fade = true), 50); });

</script>

<svelte:head>
	<title>视频作品 · JINGE</title>
	<meta name="description" content="JINGE 视频作品集：五部精选视频，以十个独立播放单元呈现。" />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="video-page" class:fade>
	<main>
		<section class="head">
			<button class="back" onclick={() => returnTo("/")}>← 返回首页</button>
			<div class="badge">THE MODEL WEAVER · VIDEO</div>
			<h1>视频<span>作品</span></h1>
			<p class="tag">五部精选视频 · 长视频按自然转场分章 · 点击即可播放</p>
		</section>

		<section class="collection" aria-labelledby="collection-title">
			<div class="collection-head">
				<div>
					<p class="section-index">SELECTED FILMS · 2026</p>
					<h2 id="collection-title">精选视频</h2>
				</div>
				<p class="chapter-count">05 部作品 · 10 个播放单元 · 19'</p>
			</div>

			<div class="video-grid">
				{#each videos as item, index (item.id)}
					<article class="video-card">
						<button class="poster-button" onclick={() => openPlayer(item)} aria-label={`播放：${item.title}`}>
							<img src={base + item.poster} alt={item.title} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
							<span class="play" aria-hidden="true">▶</span>
						</button>
						<div class="card-meta">
							<span class="number">{String(index + 1).padStart(2, "0")}</span>
							<div>
								<h3>{item.title}</h3>
								<p>{item.subtitle}</p>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<div class="credits" aria-label="视频来源与许可">
				<p class="credit-title">CREDITS / LICENSES</p>
				<p>OWL AND BADGER · Google DeepMind · Public Domain（按源文件标注）· 网页转码与 JINGE 水印</p>
				<p>VEO3 CHERNOBYL DECAYING ROOM · Global Donald · <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noreferrer">CC0</a> · 网页转码与 JINGE 水印</p>
				<p>EXECUTE · Vincent Chang Deng · <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY 3.0</a> · 分章、网页转码与 JINGE 水印</p>
				<p>WITCHES WOOD · Vortex Project Studios · <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY 3.0</a> · 网页转码与 JINGE 水印</p>
				<p>FIRST CANVAS · Moncho Concha · <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY 3.0</a> · 分章、网页转码与 JINGE 水印</p>
			</div>
		</section>
	</main>
</div>

{#if activeVideo}
	<div class="player-backdrop" role="presentation" onclick={handleBackdropClick} onkeydown={handleKeydown}>
		<div class="player-dialog" role="dialog" aria-modal="true" aria-label={activeVideo.title} tabindex="-1">
			<button class="close-player" onclick={closePlayer} aria-label="关闭播放器">×</button>
			<video controls autoplay playsinline preload="auto" poster={base + activeVideo.poster}>
				<source src={base + activeVideoSource} type="video/mp4" />
			</video>
			<div class="player-meta">
				<div><p>NOW PLAYING</p><h2>{activeVideo.title}</h2></div>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(html), :global(body) { margin: 0; min-height: 100%; background: #0b0b0d; color: #f5f1e9; }
	:global(body) { overflow: hidden; font-family: "PingFang SC", "Microsoft YaHei", sans-serif; }
	:global(*) { box-sizing: border-box; }
	.video-page { height: 100vh; height: 100dvh; overflow-x: hidden; overflow-y: auto; overscroll-behavior-y: contain; scrollbar-gutter: stable; -webkit-overflow-scrolling: touch; background: #0e0e10; opacity: 0; transform: translateY(14px); transition: opacity .7s ease, transform .7s ease; }
	.video-page.fade { opacity: 1; transform: none; }
	main { width: min(1180px, 100%); margin: 0 auto; padding: 48px 24px 80px; }
	.head { position: relative; padding: 20px 0 34px; text-align: center; }
	.back { position: absolute; left: 0; top: 24px; border: 1px solid #2a2a2e; border-radius: 999px; padding: 7px 16px; color: #a7a7ad; background: transparent; font-size: 14px; cursor: pointer; }
	.back:hover { color: #f2f2f2; border-color: #555; }
	.badge { display: inline-block; margin-bottom: 22px; border: 1px solid #2a2a2e; border-radius: 999px; padding: 6px 16px; color: #a7a7ad; font-size: 13px; letter-spacing: .12em; }
	h1 { margin: 0; color: #f2f2f2; font-family: "Songti SC", "Noto Serif SC", "STSong", "SimSun", serif; font-size: clamp(38px, 6vw, 68px); font-weight: 700; line-height: 1.06; }
	h1 span { color: transparent; background: linear-gradient(90deg, #7c8cff, #ff7c9b); background-clip: text; -webkit-background-clip: text; }
	.tag { margin: 16px 0 0; color: #a7a7ad; font-size: 17px; }
	.collection { margin-top: 24px; padding-top: 34px; border-top: 1px solid #2a2a2e; }
	.collection-head { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 48px; }
	.section-index { margin: 0 0 10px; color: #7c8cff; font-size: 11px; letter-spacing: .18em; }
	.collection-head h2 { margin: 0; color: #f2f2f2; font-size: 28px; font-weight: 600; }
	.chapter-count { margin: 0; color: #777169; font-size: 12px; letter-spacing: .08em; }
	.video-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 54px 22px; }
	.video-card { min-width: 0; }
	.poster-button { position: relative; display: block; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border: 0; padding: 0; background: #18181b; cursor: pointer; }
	.poster-button img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(.2,.7,.2,1), filter .5s ease; }
	.poster-button:hover img { transform: scale(1.035); filter: brightness(.7); }
	.play { position: absolute; inset: 50% auto auto 50%; display: grid; width: 58px; height: 58px; place-items: center; border: 1px solid rgba(255,255,255,.55); border-radius: 50%; color: white; background: rgba(10,10,12,.32); transform: translate(-50%,-50%); opacity: 0; transition: opacity .35s ease, transform .35s ease; backdrop-filter: blur(8px); }
	.poster-button:hover .play, .poster-button:focus-visible .play { opacity: 1; transform: translate(-50%,-50%) scale(1.05); }
	.card-meta { display: grid; grid-template-columns: 32px 1fr; gap: 12px; align-items: start; padding-top: 16px; }
	.number { color: #706d67; font-family: Georgia, serif; font-size: 13px; }
	.card-meta h3 { margin: 0 0 7px; color: #eee9df; font-size: 16px; font-weight: 500; }
	.card-meta p { margin: 0; color: #7f7b74; font-size: 12px; }
	.credits { margin: 64px 0 0; color: #64615d; font-size: 12px; line-height: 1.7; }
	.credits p { margin: 5px 0; }
	.credits .credit-title { margin-bottom: 14px; color: #91897f; font-size: 10px; letter-spacing: .18em; }
	.credits a { color: #8b857c; text-underline-offset: 3px; }
	.player-backdrop { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 24px; background: rgba(0,0,0,.88); backdrop-filter: blur(16px); }
	.player-dialog { position: relative; width: min(1100px, 100%); background: #111114; box-shadow: 0 25px 100px rgba(0,0,0,.6); }
	.player-dialog video { display: block; width: 100%; max-height: 72vh; background: black; }
	.close-player { position: absolute; z-index: 2; top: -46px; right: 0; border: 0; color: white; background: transparent; font-size: 34px; font-weight: 200; cursor: pointer; }
	.player-meta { display: flex; align-items: center; justify-content: flex-start; gap: 24px; padding: 22px 26px; }
	.player-meta p { margin: 0 0 6px; color: #817b72; font-size: 9px; letter-spacing: .2em; }
	.player-meta h2 { margin: 0; font-size: 20px; font-weight: 500; }
	@media (max-width: 950px) {
		.back { position: static; display: block; width: fit-content; margin: 0 0 18px; }
	}
	@media (max-width: 620px) {
		main { padding: 30px 16px 64px; }
		.head { padding-top: 0; }
		h1 { font-size: clamp(38px, 13vw, 58px); }
		.tag { font-size: 15px; line-height: 1.6; }
		.collection { margin-top: 12px; padding-top: 28px; }
		.collection-head { align-items: flex-start; flex-direction: column; }
		.video-grid { grid-template-columns: 1fr; gap: 42px; }
		.play { opacity: 1; width: 50px; height: 50px; }
		.player-backdrop { padding: 12px; }
		.player-meta { padding: 16px; }
		.player-meta h2 { font-size: 16px; }
	}
</style>
