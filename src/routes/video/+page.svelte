<script lang="ts">
	import { base } from "$app/paths";
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

</script>

<svelte:head>
	<title>视频作品 · JINGE</title>
	<meta name="description" content="JINGE 视频作品集：五部精选视频，以十个独立播放单元呈现。" />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="video-page">
	<header class="site-header">
		<button class="back-button" onclick={() => returnTo("/")}>← 返回我的主页</button>
		<span>JINGE · VIDEO WORKS</span>
	</header>

	<main>
		<section class="hero">
			<div class="hero-copy">
				<p class="eyebrow">SELECTED VIDEO WORKS · 2026</p>
				<h1>视频<br /><em>作品集</em></h1>
				<p class="intro">五部精选视频，长视频按自然转场分章，可从任意片段开始观看。</p>
			</div>
			<div class="hero-stats" aria-label="作品数据">
				<div><strong>05</strong><span>视频作品</span></div>
				<div><strong>10</strong><span>播放单元</span></div>
				<div><strong>19'</strong><span>总片长</span></div>
				<div><strong>AUTO</strong><span>画质适配</span></div>
			</div>
		</section>

		<section class="collection" aria-labelledby="collection-title">
			<div class="collection-head">
				<div>
					<p class="section-index">01 / FILM</p>
					<h2 id="collection-title">SELECTED FILMS</h2>
				</div>
				<p class="chapter-count">10 CLIPS</p>
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
	.video-page { height: 100vh; height: 100dvh; overflow-x: hidden; overflow-y: auto; overscroll-behavior-y: contain; scrollbar-gutter: stable; -webkit-overflow-scrolling: touch; background: radial-gradient(circle at 80% 5%, rgba(176,120,65,.16), transparent 28rem), #0b0b0d; }
	.site-header { position: sticky; top: 0; z-index: 30; height: 62px; display: flex; align-items: center; justify-content: space-between; padding: 0 clamp(18px, 4vw, 64px); border-bottom: 1px solid rgba(255,255,255,.09); background: rgba(11,11,13,.84); backdrop-filter: blur(18px); }
	.site-header span { color: #a89d8d; font-size: 12px; letter-spacing: .18em; }
	.back-button { border: 0; padding: 10px 0; color: #d9b98a; background: none; font-size: 13px; cursor: pointer; }
	main { width: min(1480px, 100%); margin: 0 auto; padding: 0 clamp(18px, 5vw, 76px) 120px; }
	.hero { min-height: 60dvh; display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(260px, .7fr); align-items: end; gap: 8vw; padding: 10dvh 0 7dvh; border-bottom: 1px solid rgba(255,255,255,.12); }
	.eyebrow, .section-index { margin: 0 0 24px; color: #c6a678; font-size: 11px; letter-spacing: .2em; }
	h1 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(70px, 10vw, 150px); font-weight: 400; line-height: 1; letter-spacing: -.065em; }
	h1 em { color: #d6b37e; font-weight: 400; }
	.intro { width: min(590px, 100%); margin: 45px 0 0; color: #aaa59c; font-size: clamp(15px, 1.4vw, 19px); line-height: 1.9; }
	.hero-stats { display: grid; gap: 0; border-top: 1px solid rgba(255,255,255,.14); }
	.hero-stats div { display: flex; align-items: baseline; justify-content: space-between; padding: 20px 4px; border-bottom: 1px solid rgba(255,255,255,.14); }
	.hero-stats strong { font-family: Georgia, serif; color: #ede5d7; font-size: clamp(38px, 4vw, 64px); font-weight: 400; }
	.hero-stats span { color: #89857e; font-size: 12px; letter-spacing: .12em; }
	.collection { padding-top: clamp(56px, 7dvh, 82px); }
	.collection-head { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 48px; }
	.collection-head h2 { margin: 0; font-family: Georgia, serif; font-size: clamp(44px, 6vw, 84px); font-weight: 400; letter-spacing: -.045em; }
	.chapter-count { margin: 0; color: #777169; font-size: 11px; letter-spacing: .18em; }
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
		.hero { min-height: auto; grid-template-columns: 1fr; padding-top: 15vh; }
		.hero-stats { margin-top: 30px; }
	}
	@media (min-width: 951px) and (max-height: 650px) {
		.hero { min-height: auto; padding: 70px 0 42px; }
		h1 { font-size: clamp(54px, 15vh, 82px); }
		.intro { margin-top: 18px; font-size: 14px; line-height: 1.55; }
		.hero-stats div { padding: 10px 4px; }
		.hero-stats strong { font-size: clamp(28px, 8vh, 44px); }
		.collection { padding-top: 36px; }
		.collection-head { margin-bottom: 28px; }
		.collection-head h2 { font-size: 42px; }
	}
	@media (max-width: 620px) {
		.site-header { height: 54px; }
		.site-header span { font-size: 10px; }
		main { padding-bottom: 80px; }
		.hero { padding-bottom: 70px; }
		h1 { font-size: clamp(64px, 22vw, 100px); }
		.intro { margin-top: 32px; font-size: 15px; }
		.collection { padding-top: 72px; }
		.collection-head { align-items: flex-start; flex-direction: column; }
		.video-grid { grid-template-columns: 1fr; gap: 42px; }
		.play { opacity: 1; width: 50px; height: 50px; }
		.player-backdrop { padding: 12px; }
		.player-meta { padding: 16px; }
		.player-meta h2 { font-size: 16px; }
	}
</style>
