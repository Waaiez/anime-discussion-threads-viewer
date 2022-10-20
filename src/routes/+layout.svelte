<script>
	import '@brainandbones/skeleton/themes/theme-skeleton.css';
	import '@brainandbones/skeleton/styles/all.css';
	import '@brainandbones/skeleton/styles/tailwind.css';
	import '@brainandbones/skeleton/styles/core.css';
	import '@brainandbones/skeleton/styles/typography.css';
	import '@brainandbones/skeleton/styles/forms.css';
	import '@brainandbones/skeleton/styles/elements.css';
	import { Toast } from '@brainandbones/skeleton';
</script>

<svelte:head>
	<title>Anime Discussion Thread Viewer</title>
</svelte:head>

<Toast background="bg-accent-500" position="tr" variant="filled" duration={250} />

<div
	class="flex flex-col items-center min-h-screen select-none w-full max-w-4xl p-7 mx-auto md:px-20 2xl:max-w-7xl justify-center gap-5"
>
	<slot />
</div>
