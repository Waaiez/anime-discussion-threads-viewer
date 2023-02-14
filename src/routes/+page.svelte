<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import SkeletonCard from '$lib/components/SkeletonCard.svelte';
	import { redditData } from '$lib/stores.js';
</script>

<div class="m-auto w-full h-full items-center flex flex-col">
	<div class="flex items-center justify-evenly mb-12 max-w-xl mx-auto gap-5 w-full">
		<Button icon="rightChevron" colour="primary" link="/threads" />
		<Button icon="search" colour="secondary" link="/search" />
	</div>

	<div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 h-full w-full">
		{#each $redditData as post, index}
			{#if index < 4}
				<Card {post} />
			{/if}
		{:else}
			{#each Array(4) as _}
				<SkeletonCard />
			{/each}
		{/each}
	</div>
</div>
