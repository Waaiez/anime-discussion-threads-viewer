<script>
	import { goto } from '$app/navigation';

	import { redditData } from '$lib/stores';

	import { onMount } from 'svelte';

	// @ts-ignore -- svelte-icons-pack does not have types
	import FaSolidChevronLeft from 'svelte-icons-pack/fa/FaSolidChevronLeft';
	import FaSolidSearch from 'svelte-icons-pack/fa/FaSolidSearch';

	import Card from '$lib/components/Card.svelte';
	import SkeletonCard from '$lib/components/SkeletonCard.svelte';

	import viewport from '$lib/modules/useViewportAction';
	import Icon from 'svelte-icons-pack';
	// import type { RedditData, RedditPost } from '$lib/interfaces/RedditData';

	let loading = false;

	let resultsPerPage = 12;
	let lastPosition = 0;

	// let data: RedditPost[];
	let data;
	let allRedditData;

	$: allRedditData = $redditData;
	$: data = $redditData.slice(0, resultsPerPage);
	data && console.log('Data loaded & sliced');

	let newBatch = [];

	async function fetchData() {
		loading = true;
		// TODO: fix
		setTimeout(() => {
			newBatch = allRedditData.slice(lastPosition, lastPosition + resultsPerPage);
			newBatch && console.log('New data loaded & sliced');
			lastPosition += resultsPerPage;
			loading = false;
		}, 5000);

		// newBatch = allData.slice(lastPosition, lastPosition + resultsPerPage);
		// newBatch && console.log('New data loaded & sliced');
		// lastPosition += resultsPerPage;
		// loading = false;
	}

	$: data = [...new Set([...data, ...newBatch])];

	onMount(() => {
		fetchData();
	});
</script>

<div class="w-full flex gap-5 p-4 max-w-2xl">
	<button
		class="btn btn-lg bg-primary-500/20 ring-primary-500/50 text-white rounded-lg w-full"
		on:click={() => goto('/')}
	>
		<div class="h-full w-full justify-center flex">
			<Icon src={FaSolidChevronLeft} color="white" size="32" className="w-full" />
		</div>
	</button>
	<button
		class="btn btn-lg bg-accent-500/20 ring-accent-500/50 text-white rounded-lg w-full"
		on:click={() => goto('/search')}
	>
		<div class="h-full w-full justify-center flex">
			<Icon src={FaSolidSearch} color="white" size="32" className="w-full" />
		</div>
	</button>
</div>

<div class="w-full py-3">
	<ul class="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 xl:gap-x-8">
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

		<div use:viewport on:enterViewport={fetchData} />
	</ul>
</div>
