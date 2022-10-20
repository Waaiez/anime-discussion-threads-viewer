<script lang="ts">
	// @ts-ignore -- svelte-icons-pack does not have types
	import FaSolidChevronRight from 'svelte-icons-pack/fa/FaSolidChevronRight';
	import FaSolidSearch from 'svelte-icons-pack/fa/FaSolidSearch';

	import Icon from 'svelte-icons-pack/Icon.svelte';

	import { goto } from '$app/navigation';

	import { redditData } from '$lib/stores.js';

	import Card from '$lib/components/Card.svelte';
	import SkeletonCard from '$lib/components/SkeletonCard.svelte';
</script>

<div class="w-full flex gap-5 p-4 max-w-2xl">
	<button
		class="btn btn-lg bg-primary-500/20 ring-primary-500/50 text-white rounded-lg w-full"
		on:click={() => goto('/threads')}
	>
		<div class="h-full w-full justify-center flex">
			<Icon src={FaSolidChevronRight} color="white" size="32" className="w-full" />
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
		{#each $redditData as post, index}
			{#if index < 4}
				<Card {post} />
			{/if}
		{:else}
			{#each Array(4) as _}
				<SkeletonCard />
			{/each}
		{/each}
	</ul>
</div>
