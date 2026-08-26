<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	let fade = $state(false);
	onMount(() => { setTimeout(() => (fade = true), 50); });

	const skills = [
		{
			icon: "🚀",
			title: "微调提效",
			desc: "基于 unsloth 做参数高效微调（LoRA / QLoRA），训练速度显著提升，本地即可微调 LLM 与扩散模型。",
			label: "查看",
			link: "https://github.com/jinggege-666/model-weaver-skill",
			repo: "https://github.com/jinggege-666/model-weaver-skill"
		},
		{
			icon: "📊",
			title: "评测 & 可观测",
			desc: "基于 langfuse 做 prompt / 模型评测、回归与追踪调优，数据驱动、质量不回退。",
			label: "查看",
			link: "https://github.com/jinggege-666/llm-eval-lab",
			repo: "https://github.com/jinggege-666/llm-eval-lab"
		},
		{
			icon: "🗂️",
			title: "数据工程",
			desc: "数据集构建与质量：清洗、标注、合成数据、分布诊断，让训练数据又干净又足量。",
			label: "查看",
			link: "https://github.com/jinggege-666/ai-trainer-data-craft",
			repo: "https://github.com/jinggege-666/ai-trainer-data-craft"
		},
		{
			icon: "🤖",
			title: "AI 智能体",
			desc: "RAG 与 AI 智能体：检索、重排、引用、工具调用、MCP 与多智能体编排。",
			label: "查看",
			link: "https://github.com/jinggege-666/mcp-agent-stack",
			repo: "https://github.com/jinggege-666/mcp-agent-stack"
		}
	];
</script>

<svelte:head><title>AI 技能 · The Model Weaver</title></svelte:head>

<div class="page" class:fade>
	<div class="inner">
		<div class="head">
			<button class="back" onclick={() => goto(resolve("/"))}>← 返回首页</button>
			<div class="badge">THE MODEL WEAVER · SKILLS</div>
			<h1>AI 训练<span>提效技能</span></h1>
			<p class="tag">为算法注入艺术基因 · 让模型训得更快、更稳、可回归</p>
		</div>

		<div class="grid">
			{#each skills as s}
				<div class="card">
					<div class="ico">{s.icon}</div>
					<h3>{s.title}</h3>
					<p>{s.desc}</p>
					<a class="link" href={s.link} target={s.link.startsWith("http") ? "_blank" : "_self"}>{s.label} →</a>
				</div>
			{/each}
		</div>

		<div class="footer">
			<p>by <b>The Model Weaver</b> · jinggege-666</p>
		</div>
	</div>
</div>

<style>
	:global(body) { background:#0e0e10; }
	.page { font-family:"Questrial","PingFang SC","Microsoft YaHei",sans-serif; color:#f2f2f2; min-height:100vh; background:#0e0e10; opacity:0; transform:translateY(14px); transition:opacity .7s ease, transform .7s ease; }
	.page.fade { opacity:1; transform:none; }
	.inner { max-width:1040px; margin:0 auto; padding:48px 24px 70px; }
	.head { text-align:center; padding:20px 0 34px; position:relative; }
	.back { position:absolute; left:0; top:24px; background:transparent; border:1px solid #2a2a2e; color:#a7a7ad; border-radius:999px; padding:7px 16px; cursor:pointer; font-size:14px; }
	.back:hover { color:#f2f2f2; border-color:#555; }
	.badge { display:inline-block; border:1px solid #2a2a2e; border-radius:999px; padding:6px 16px; font-size:13px; color:#a7a7ad; letter-spacing:.12em; margin-bottom:22px; }
	h1 { font-family:"Songti SC",serif; font-size:clamp(34px,6vw,64px); font-weight:700; line-height:1.08; }
	h1 span { background:linear-gradient(90deg,#7c8cff,#ff7c9b); -webkit-background-clip:text; background-clip:text; color:transparent; }
	.tag { margin-top:16px; color:#a7a7ad; font-size:17px; }
	.grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; margin-top:24px; }
	.card { background:#17171a; border:1px solid #2a2a2e; border-radius:16px; padding:28px; }
	.ico { font-size:30px; margin-bottom:14px; }
	h3 { font-size:20px; margin-bottom:10px; }
	p { color:#a7a7ad; font-size:15px; }
	.link { display:inline-block; margin-top:16px; color:#7c8cff; text-decoration:none; font-size:14px; }
	.footer { text-align:center; padding-top:56px; color:#a7a7ad; font-size:14px; border-top:1px solid #2a2a2e; margin-top:50px; }
</style>
