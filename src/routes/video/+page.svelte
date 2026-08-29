<script lang="ts">
	import { base } from "$app/paths";
	import { returnTo } from "$lib/return-navigation";
	import videoData from "../../../static/data/video-works.json";

	type VideoWork = {
		id: string;
		title: string;
		model: string;
		score: number;
		featured: boolean;
		duration_seconds: number;
		video: string;
		poster: string;
	};

	const videos = videoData as VideoWork[];
	let showAll = $state(false);
	let activeVideo = $state<VideoWork | null>(null);
	let visibleVideos = $derived(showAll ? videos : videos.filter((item) => item.featured));

	function closePlayer() {
		activeVideo = null;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") closePlayer();
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) closePlayer();
	}
</script>

<svelte:head>
	<title>短视频作品 · JINGE</title>
	<meta name="description" content="JINGE 的 AI 短视频创作与模型评测精选作品。" />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="video-page">
	<header class="site-header">
		<button class="back-button" onclick={() => returnTo("/")}>← 返回我的主页</button>
		<span>JINGE · SHORT FILMS</span>
	</header>

	<main>
		<section class="hero">
			<div class="hero-copy">
				<p class="eyebrow">AI MOTION STUDIES · 2026</p>
				<h1>短视频<br /><em>作品集</em></h1>
				<p class="intro">从产品广告到叙事镜头，用不同生成模型验证运动、时序与视觉表达。这里收录每个测试主题中表现最好的作品。</p>
			</div>
			<div class="hero-stats" aria-label="作品数据">
				<div><strong>23</strong><span>测试主题</span></div>
				<div><strong>26</strong><span>入选作品</span></div>
				<div><strong>16</strong><span>首页精选</span></div>
			</div>
		</section>

		<section class="collection" aria-labelledby="collection-title">
			<div class="collection-head">
				<div>
					<p class="section-index">01 / COLLECTION</p>
					<h2 id="collection-title">高分作品</h2>
				</div>
				<div class="filters" aria-label="筛选作品">
					<button class:active={!showAll} onclick={() => showAll = false}>精选 16</button>
					<button class:active={showAll} onclick={() => showAll = true}>全部 26</button>
				</div>
			</div>

			<div class="video-grid">
				{#each visibleVideos as item, index (item.id)}
					<article class="video-card">
						<button class="poster-button" onclick={() => activeVideo = item} aria-label={`播放：${item.title}`}>
							<img src={base + item.poster} alt={item.title} loading="lazy" decoding="async" />
							<span class="play" aria-hidden="true">▶</span>
							<span class="duration">{item.duration_seconds.toFixed(1)}s</span>
						</button>
						<div class="card-meta">
							<span class="number">{String(index + 1).padStart(2, "0")}</span>
							<div>
								<h3>{item.title}</h3>
								<p>{item.model}</p>
							</div>
							<span class="score">{item.score.toFixed(2)}</span>
						</div>
					</article>
				{/each}
			</div>

			<p class="score-note">分数为本轮 AI 视频模型评测结果，仅用于说明本次测试表现。</p>
		</section>
	</main>
</div>

{#if activeVideo}
	<div class="player-backdrop" role="presentation" onclick={handleBackdropClick} onkeydown={handleKeydown}>
		<div class="player-dialog" role="dialog" aria-modal="true" aria-label={activeVideo.title} tabindex="-1">
			<button class="close-player" onclick={closePlayer} aria-label="关闭播放器">×</button>
			<video controls autoplay playsinline poster={base + activeVideo.poster}>
				<source src={base + activeVideo.video} type="video/mp4" />
			</video>
			<div class="player-meta">
				<div><p>NOW PLAYING</p><h2>{activeVideo.title}</h2></div>
				<div class="player-score"><span>本轮得分</span><strong>{activeVideo.score.toFixed(2)}</strong></div>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(html), :global(body) { margin: 0; min-height: 100%; background: #0b0b0d; color: #f5f1e9; }
	:global(body) { overflow: auto; font-family: "PingFang SC", "Microsoft YaHei", sans-serif; }
	:global(*) { box-sizing: border-box; }
	.video-page { min-height: 100vh; background: radial-gradient(circle at 80% 5%, rgba(176,120,65,.16), transparent 28rem), #0b0b0d; }
	.site-header { position: sticky; top: 0; z-index: 30; height: 62px; display: flex; align-items: center; justify-content: space-between; padding: 0 clamp(18px, 4vw, 64px); border-bottom: 1px solid rgba(255,255,255,.09); background: rgba(11,11,13,.84); backdrop-filter: blur(18px); }
	.site-header span { color: #a89d8d; font-size: 12px; letter-spacing: .18em; }
	.back-button { border: 0; padding: 10px 0; color: #d9b98a; background: none; font-size: 13px; cursor: pointer; }
	main { width: min(1480px, 100%); margin: 0 auto; padding: 0 clamp(18px, 5vw, 76px) 120px; }
	.hero { min-height: 76vh; display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(260px, .7fr); align-items: end; gap: 8vw; padding: 15vh 0 11vh; border-bottom: 1px solid rgba(255,255,255,.12); }
	.eyebrow, .section-index { margin: 0 0 24px; color: #c6a678; font-size: 11px; letter-spacing: .2em; }
	h1 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(70px, 10vw, 150px); font-weight: 400; line-height: .77; letter-spacing: -.065em; }
	h1 em { color: #d6b37e; font-weight: 400; }
	.intro { width: min(590px, 100%); margin: 45px 0 0; color: #aaa59c; font-size: clamp(15px, 1.4vw, 19px); line-height: 1.9; }
	.hero-stats { display: grid; gap: 0; border-top: 1px solid rgba(255,255,255,.14); }
	.hero-stats div { display: flex; align-items: baseline; justify-content: space-between; padding: 20px 4px; border-bottom: 1px solid rgba(255,255,255,.14); }
	.hero-stats strong { font-family: Georgia, serif; color: #ede5d7; font-size: clamp(38px, 4vw, 64px); font-weight: 400; }
	.hero-stats span { color: #89857e; font-size: 12px; letter-spacing: .12em; }
	.collection { padding-top: 110px; }
	.collection-head { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 48px; }
	.collection-head h2 { margin: 0; font-family: Georgia, serif; font-size: clamp(44px, 6vw, 84px); font-weight: 400; letter-spacing: -.045em; }
	.filters { display: flex; gap: 8px; }
	.filters button { border: 1px solid rgba(255,255,255,.16); border-radius: 999px; padding: 10px 17px; color: #aaa59c; background: transparent; cursor: pointer; }
	.filters button.active { border-color: #d6b37e; color: #16120e; background: #d6b37e; }
	.video-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 54px 22px; }
	.video-card { min-width: 0; }
	.poster-button { position: relative; display: block; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border: 0; padding: 0; background: #18181b; cursor: pointer; }
	.poster-button img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(.2,.7,.2,1), filter .5s ease; }
	.poster-button:hover img { transform: scale(1.035); filter: brightness(.7); }
	.play { position: absolute; inset: 50% auto auto 50%; display: grid; width: 58px; height: 58px; place-items: center; border: 1px solid rgba(255,255,255,.55); border-radius: 50%; color: white; background: rgba(10,10,12,.32); transform: translate(-50%,-50%); opacity: 0; transition: opacity .35s ease, transform .35s ease; backdrop-filter: blur(8px); }
	.poster-button:hover .play, .poster-button:focus-visible .play { opacity: 1; transform: translate(-50%,-50%) scale(1.05); }
	.duration { position: absolute; right: 10px; bottom: 10px; padding: 5px 7px; border-radius: 2px; color: white; background: rgba(0,0,0,.65); font-size: 11px; }
	.card-meta { display: grid; grid-template-columns: 32px 1fr auto; gap: 12px; align-items: start; padding-top: 16px; }
	.number { color: #706d67; font-family: Georgia, serif; font-size: 13px; }
	.card-meta h3 { margin: 0 0 7px; color: #eee9df; font-size: 16px; font-weight: 500; }
	.card-meta p { margin: 0; color: #7f7b74; font-size: 12px; }
	.score { color: #d6b37e; font-family: Georgia, serif; font-size: 21px; }
	.score-note { margin: 64px 0 0; color: #64615d; font-size: 12px; }
	.player-backdrop { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 24px; background: rgba(0,0,0,.88); backdrop-filter: blur(16px); }
	.player-dialog { position: relative; width: min(1100px, 100%); background: #111114; box-shadow: 0 25px 100px rgba(0,0,0,.6); }
	.player-dialog video { display: block; width: 100%; max-height: 72vh; background: black; }
	.close-player { position: absolute; z-index: 2; top: -46px; right: 0; border: 0; color: white; background: transparent; font-size: 34px; font-weight: 200; cursor: pointer; }
	.player-meta { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 22px 26px; }
	.player-meta p { margin: 0 0 6px; color: #817b72; font-size: 9px; letter-spacing: .2em; }
	.player-meta h2 { margin: 0; font-size: 20px; font-weight: 500; }
	.player-score { display: flex; align-items: baseline; gap: 12px; color: #8b857c; font-size: 11px; }
	.player-score strong { color: #d6b37e; font-family: Georgia, serif; font-size: 30px; font-weight: 400; }
	@media (max-width: 950px) {
		.hero { min-height: auto; grid-template-columns: 1fr; padding-top: 15vh; }
		.hero-stats { margin-top: 30px; }
		.video-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
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
