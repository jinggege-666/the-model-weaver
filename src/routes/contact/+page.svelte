<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	let fade = $state(false);
	onMount(() => { setTimeout(() => (fade = true), 50); });
</script>

<svelte:head><title>联系我 · The Model Weaver</title></svelte:head>

<div class="page" class:fade>
	<div class="inner">
		<button class="back" onclick={() => goto(resolve("/"))}>← 返回首页</button>
		<div class="badge">THE MODEL WEAVER · CONTACT</div>
		<h1>联系<span>我</span></h1>
		<p class="tag">随时来找我聊聊 · 算法与艺术</p>

		<div class="rows">
			<div class="row">
				<div class="label">邮箱</div>
				<div class="value">1776244949@qq.com</div>
			</div>
			<div class="row">
				<div class="label">微信</div>
				<div class="value">w18260301305</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) { background:#0e0e10; }
	.page { font-family:"Questrial","PingFang SC","Microsoft YaHei",sans-serif; color:#f2f2f2; min-height:100vh; background:#0e0e10; opacity:0; transform:translateY(14px); transition:opacity .7s ease, transform .7s ease; }
	.page.fade { opacity:1; transform:none; }
	.inner { max-width:820px; margin:0 auto; padding:64px 24px 70px; text-align:center; }
	.back { position:absolute; left:24px; top:24px; background:transparent; border:1px solid #2a2a2e; color:#a7a7ad; border-radius:999px; padding:7px 16px; cursor:pointer; font-size:14px; }
	.back:hover { color:#f2f2f2; border-color:#555; }
	@media only screen and (max-width: 950px) { .back { position: static; margin: 0 auto 18px; display: block; } }
	.badge { display:inline-block; border:1px solid #2a2a2e; border-radius:999px; padding:6px 16px; font-size:13px; color:#a7a7ad; letter-spacing:.12em; margin-bottom:22px; }
	h1 { font-family:"Songti SC",serif; font-size:clamp(40px,7vw,68px); font-weight:700; line-height:1.06; }
	h1 span { background:linear-gradient(90deg,#7c8cff,#ff7c9b); -webkit-background-clip:text; background-clip:text; color:transparent; }
	.tag { margin-top:16px; color:#a7a7ad; font-size:16px; }
	.rows { margin-top:48px; display:flex; flex-direction:column; gap:16px; }
	.row { display:flex; align-items:center; justify-content:space-between; background:#17171a; border:1px solid #2a2a2e; border-radius:14px; padding:22px 28px; }
	.label { color:#a7a7ad; font-size:15px; letter-spacing:.1em; }
	.value { font-family:"Songti SC",serif; font-size:clamp(20px,3vw,28px); color:#f2f2f2; letter-spacing:.02em; user-select:all; }
</style>
