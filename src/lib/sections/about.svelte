<script lang="ts">

	import { onMount } from "svelte";
	import { loadPagePromise } from "$lib/store";
	import { letterSlideIn, maskSlideIn } from "$lib/animations";
	import { loadImage, onScrolledIntoView } from "$lib/utils";
    import { scrollAnchorState, viewPortState } from "$lib/state.svelte";
	import { base } from "$app/paths";

	let section1Element: HTMLElement;
	let section2Element: HTMLElement;
	let profilePicContainer: HTMLElement;

	// Promise which when resolved will trigger svelte animations
	let sectionOneResolve: (value?: any) => void;
	let sectionOnePromise = new Promise((resolve) => sectionOneResolve = resolve);
	let sectionTwoResolve: (value?: any) => void;
	let sectionTwoPromise = new Promise((resolve) => sectionTwoResolve = resolve);

	onMount(async () => {
		// Wait for page to load
		await loadPagePromise;
		// Set navbar about link's y location to top of aboutContainer
		scrollAnchorState.about = section1Element;

		viewPortState.slickscrollInstance.addOffset({
			element: profilePicContainer!,
			speedY: 0.8
		});

		onScrolledIntoView(section1Element, () => sectionOneResolve(true));
		onScrolledIntoView(section2Element, () => sectionTwoResolve(true));
	});

	function titleIn(node: HTMLElement) {
		const titleAnimation = letterSlideIn(node, { delay: 15 });
		titleAnimation.anime();
	}

	// Add parallax scrolling offsets to slickScroll
	function addSlickScrollOffset(node: HTMLElement) {
		viewPortState.slickscrollInstance.addOffset({
			element: node,
			speedY: 0.8
		});
	}

</script>

<div id="content-container" class="about" bind:this={section1Element}>
	{#await sectionOnePromise then _}
		<div class="content-wrapper">
			<h1 class="title" use:titleIn>
				你好，我是<br>JINGE
			</h1>
			<div in:maskSlideIn={{ duration: 1200, reverse: true, delay: 150 }}>
				<p class="paragraph">
					我是一名 AI 训练师 & 产品设计师，带艺术家的眼睛。我把艺术织进算法——教模型像人一样去看、去感受、去创造。<br><br>我的作品涵盖生成式艺术、开源 skill 与自媒体艺术，在数据变成诗的地方生长。觉得我们能一起做出美好的东西？来聊聊吧。
				</p>
			</div>
			<div class="social-button-wrapper">
				<div in:maskSlideIn={{ delay: 400, reverse: true }}>
					<span class="button no-underline"><a href={base + "/contact"} class="clickable sublink link">邮箱</a></span>
				</div>
				<div in:maskSlideIn={{ delay: 700, reverse: true }}>
					<span class="button clickable sublink link no-underline">微信 · w18260301305</span>
				</div>
			</div>
		</div>
		<div class="profile-image" use:addSlickScrollOffset>
			{#await loadImage("assets/imgs/profile-photo.jpg") then src}
				<img src="{src}" loading="lazy" decoding="async" in:maskSlideIn={{ duration: 1200,
					delay: 100,
					reverse: true,
					maskStyles: [
						{ property: "width", value: "100%"},
						{ property: "height", value: "100%"}
					]
				}} alt="JINGE profile" class="profile-pic">
			{/await}
		</div>
	{/await}
</div>

<div class="horizontal-flex" bind:this={section2Element}>
	{#await sectionTwoPromise then _}
		<ul class="list first">
			<li class="list-title">
				<div in:letterSlideIn={{ initDelay: 400 }}>
					我的领域
				</div>
			</li>
			<li>
				<div in:letterSlideIn={{ initDelay: 550 }}>
					AI 训练与微调
				</div>
				<div class="flex-item" in:maskSlideIn={{ delay: 600 }}>
					扩散模型 · lora · 嵌入
				</div>
			</li>
			<li>
				<div in:letterSlideIn={{ initDelay: 650 }}>
					生成式艺术
				</div>
				<div class="flex-item" in:maskSlideIn={{ delay: 700 }}>
					AI 画作 · 视觉之诗
				</div>
			</li>
			<li>
				<div in:letterSlideIn={{ initDelay: 750 }}>
					产品与交互设计
				</div>
				<div class="flex-item" in:maskSlideIn={{ delay: 800 }}>
					从数据到体验
				</div>
			</li>
			<li>
				<div in:letterSlideIn={{ initDelay: 850 }}>
					提示词与艺术指导
				</div>
				<div class="flex-item" in:maskSlideIn={{ delay: 900 }}>
					为算法注入艺术基因
				</div>
			</li>
		</ul>
		<ul class="list">
			<li class="list-title">
				<div in:letterSlideIn={{ initDelay: 400 }}>
					理念
				</div>
			</li>
			<li>
				<div in:letterSlideIn={{ initDelay: 550 }}>
					艺术是模型的灵魂
				</div>
			</li>
		</ul>
	{/await}
</div>


<style lang="sass">

@use "../consts.sass" as consts

@include consts.textStyles()

.button.no-underline::after, .button.no-underline::before
	display: none

#content-container.about
	display: flex
	flex-direction: row
	justify-content: space-between
	overflow: hidden
	padding: 0 5vw
	margin-top: 40vh
	position: relative
	padding-bottom: 5vh

	.profile-image
		width: 55%
		overflow: hidden
		margin-top: -40vh
		position: relative

		img
			height: 80%
			width: 90%
			border-radius: 0.5vh
			object-fit: cover

	.content-wrapper
		box-sizing: border-box
		width: 50%
		height: 100%
		margin: 0 2vw
		padding-right: 4vw
		display: flex
		flex-direction: column
		justify-content: center
		margin-top: 5vh
		box-sizing: border-box
		z-index: 2

		@media only screen and (max-width: 950px)
			&
				width: 80%

				h1
					font-size: 8vh !important
					line-height: 1.15

		h1
			font-size: 11vh
			line-height: 1.15
			font-weight: 400

		.paragraph
			margin-top: 10vh
			margin-left: 13vw
			position: relative
			width: 60%
			line-height: 1.5rem

			@media only screen and (max-width: 750px)
				&
					width: 100%
					margin-left: 5vw

			&::before
				content: ""
				position: absolute
				height: 1px
				width: 10vw
				right: 115%
				top: 15%
				background-color: white
				

		.social-button-wrapper
			font-size: 3vh
			margin-left: 13vw
			margin-top: 4vh
			display: inline-block

			& :global(*:not(:last-child))
				margin-right: 2vw

			@media only screen and (max-width: 750px)
				&
					margin-left: 5vw



// On phones, keep the biography readable and place the complete portrait below it.
// This media query must stay at the root level; nesting it inside .content-wrapper
// would prevent the selectors from matching #content-container.about.
@media only screen and (max-width: 950px)
	#content-container.about
		flex-direction: column
		justify-content: flex-start
		padding: 0 6vw 6vh
		overflow: visible

		.content-wrapper
			width: 100%
			height: auto
			margin: 0
			padding: 0

			h1
				font-size: clamp(52px, 16vw, 72px) !important
				line-height: 1.02

			.paragraph
				width: 100%
				margin: 6vh 0 0
				font-size: clamp(14px, 3.8vw, 18px) !important

				&::before
					display: none

			.social-button-wrapper
				margin: 4vh 0 0

		.profile-image
			display: block
			width: 100%
			margin: 6vh 0 0
			position: relative
			transform: none !important
			overflow: hidden

			img
				display: block
				width: 100%
				height: auto
				object-fit: contain
				border-radius: 1vh

.horizontal-flex
	display: flex
	flex-direction: row
	justify-content: space-between
	padding: 0 13vw
	margin-top: 12vh
	width: 100%
	box-sizing: border-box

	@media only screen and (max-width: 1080px)
		flex-direction: column
		padding: 0 8vw

	.list
		list-style-type: none
		text-align: left

		@media only screen and (max-width: 1080px)
			margin-top: 10vh

		li.list-title
			letter-spacing: 0.6vh
			font-size: 1.3vh
			font-weight: bold

		li
			font-family: consts.$font
			text-transform: uppercase
			font-size: 2vh
			letter-spacing: 0.5vh
			padding: 2vh 0
			border-bottom: 1px solid #444
			display: flex
			flex-wrap: wrap
			flex-direction: row
			justify-content: space-between
			align-items: center
			column-gap: 10vw
			row-gap: 3vh

			img
				height: 2.3vh

</style>
