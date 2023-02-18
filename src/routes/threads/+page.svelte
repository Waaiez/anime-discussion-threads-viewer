<script lang="ts">
	import { inview } from 'svelte-inview';
	import Button from '$lib/components/Button.svelte';
	import { redditData } from '$lib/stores';
	import { onMount } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import SkeletonCard from '$lib/components/SkeletonCard.svelte';
	import type { RedditPost } from '$lib/interfaces/Reddit';

	let loading = false;

	let resultsPerPage = 12;
	let lastPosition = 0;

	let data: RedditPost[];
	let allRedditData: RedditPost[];

	$: allRedditData = $redditData;
	$: data = $redditData.slice(0, resultsPerPage);
	data && console.log('Data loaded & sliced');

	let newBatch: RedditPost[] = [];

	async function fetchData() {
		loading = true;
		setTimeout(() => {
			newBatch = allRedditData.slice(lastPosition, lastPosition + resultsPerPage);
			newBatch && console.log('New data loaded & sliced');
			lastPosition += resultsPerPage;
			loading = false;
		}, 5000);
	}

	$: data = [...new Set([...data, ...newBatch])];

	onMount(() => {
		fetchData();
	});
</script>

<div class="m-auto w-full h-full items-center flex flex-col">
	<div class="flex flex-col md:flex-row items-center justify-evenly mb-12 max-w-xl mx-auto gap-5 w-full">
		<Button icon="leftChevron" colour="primary" link="/" />
		<Button icon="search" colour="secondary" link="/search" />
	</div>

	<div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 h-full w-full">
		{#each data as post}
			<Card {post} />
		{:else}
			{#each Array(8) as _, index (index)}
				<SkeletonCard />
			{/each}
		{/each}
		{#if loading}
			{#each Array(8) as _, index (index)}
				<SkeletonCard />
			{/each}
		{/if}
	</div>

	<div use:inview on:enter={fetchData} />
</div>
