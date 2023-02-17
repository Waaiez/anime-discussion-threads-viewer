<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MagnifyingGlass } from '@steeze-ui/heroicons';
	import { onMount } from 'svelte';
	import { anilistSearch } from '$lib/modules/anilist/search';
	import { querySearchByString, queryTrending } from '$lib/modules/anilist/queries';
	import AnilistCard from '$lib/components/AnilistCard.svelte';
	import SkeletonCard from '$lib/components/SkeletonCard.svelte';

	let inputSearch: HTMLInputElement;

	let debounceInput = '';

	let isSearching = false;
	$: isSearching = debounceInput.length > 0;

	let timer: NodeJS.Timeout;

	const debounce = (e: any): void => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			debounceInput = (e.target as HTMLInputElement).value;
		}, 1000);
	};

	type AnilistData = {
		id: number;
		title: {
			romaji: string;
		};
		coverImage: {
			large: string;
		};
	};

	let trendingData: AnilistData[] = [];
	let searchData: AnilistData[] = [];

	onMount(async () => {
		inputSearch.focus();

		const res = await anilistSearch(queryTrending, {});
		if (res.error) {
			console.log('error');
		}
		trendingData = res.Page.media;
	});

	$: {
		if (isSearching) {
			async function search() {
				const res = await anilistSearch(querySearchByString, { search: debounceInput });
				if (res.error) {
					console.log('error');
				}
				searchData = res.Page.media;

				isSearching = false;
			}
			search();
		}
	}
</script>

<div class="m-auto w-full h-full items-center flex flex-col">
	<div
		class="flex flex-col md:flex-row items-center justify-evenly mb-12 max-w-xl mx-auto gap-5 w-full"
	>
		<Button icon="leftChevron" colour="primary" link="/" />

		<div
			class="input-group input-group-divider grid-cols-[auto_1fr_auto] !rounded-lg !bg-transparent p-2"
		>
			<Icon src={MagnifyingGlass} size="35" className="w-full" />
			<input
				type="search"
				placeholder="Search..."
				autoComplete="off"
				bind:this={inputSearch}
				on:input={debounce}
			/>
		</div>
	</div>

	<!-- <div class="w-full py-3">
		<ul class="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 xl:gap-x-8">
			{#if !searchData.length}
				{#each trendingData as result}
					<AnilistCard {result} />
				{:else}
					{#each Array(4) as _}
						<SkeletonCard />
					{/each}
				{/each}
			{:else}
				{#each searchData as result}
					<AnilistCard {result} />
				{:else}
					{#each Array(4) as _}
						<SkeletonCard />
					{/each}
				{/each}
			{/if}
		</ul>
	</div> -->

	<div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 h-full w-full">
		{#if !searchData.length}
			{#each trendingData as result}
				<AnilistCard {result} />
			{:else}
				{#each Array(4) as _}
					<SkeletonCard />
				{/each}
			{/each}
		{:else}
			{#each searchData as result}
				<AnilistCard {result} />
			{:else}
				{#each Array(4) as _}
					<SkeletonCard />
				{/each}
			{/each}
		{/if}
	</div>
</div>
