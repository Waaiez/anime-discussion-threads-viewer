<script lang="ts">
	import { onMount } from 'svelte';

	import FaSolidSearch from 'svelte-icons-pack/fa/FaSolidSearch';
	import FaSolidChevronLeft from 'svelte-icons-pack/fa/FaSolidChevronLeft';
	import Icon from 'svelte-icons-pack/Icon.svelte';

	import { goto } from '$app/navigation';
	import SkeletonCard from '$lib/components/SkeletonCard.svelte';
	import { anilistRequest } from '$lib/modules/anilist';
	import { querySearchByString, queryTrending } from '$lib/modules/anilist-queries';
	import AnilistCard from '$lib/components/AnilistCard.svelte';

	let inputSearch: HTMLInputElement;

	let debounceInput = '';

	let isSearching = false;
	$: isSearching = debounceInput.length > 0;

	let timer: NodeJS.Timeout;
	// @ts-ignore
	const debounce = (e) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			debounceInput = e.target.value;
		}, 1000);
	};

	// TODO: better types for anilist data
	let trendingData = [];
	let searchData = [];

	onMount(async () => {
		inputSearch.focus();

		const res = await anilistRequest(queryTrending, {});
		if (res.error) {
			console.log('error');
		}
		trendingData = res.Page.media;
	});

	$: {
		if (isSearching) {
			async function search() {
				const res = await anilistRequest(querySearchByString, { search: debounceInput });
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

<div class="w-full flex gap-5 p-4 max-w-2xl">
	<button
		class="btn btn-lg bg-primary-500/20 ring-primary-500/50 text-white rounded-lg"
		on:click={() => goto('/')}
	>
		<div class="h-full w-full justify-center flex">
			<Icon src={FaSolidChevronLeft} color="white" size="32" className="w-full" />
		</div>
	</button>

	<fieldset class="flex justify-center w-full text-slate-100">
		<label for="Search" class="hidden"> Search </label>
		<div class="relative w-full h-14">
			<span class="absolute inset-y-0 left-0 flex items-center pl-2 mx-1">
				<Icon src={FaSolidSearch} color="white" size="20" className="w-full" />
			</span>
			<input
				type="search"
				name="Search"
				placeholder="Search..."
				class="w-full h-full py-2 pl-10 text-base transition ease-in-out !bg-transparent border border-solid rounded-md sm:w-full focus:outline-none border-slate-600"
				autoComplete="off"
				bind:this={inputSearch}
				on:input={debounce}
			/>
		</div>
	</fieldset>
</div>

<div class="w-full py-3">
	<ul class="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 xl:gap-x-8">
		{#if !searchData.length}
			{#each trendingData as result}
				<AnilistCard {result} />
			{:else}
				{#each Array(4) as _, index (index)}
					<SkeletonCard />
				{/each}
			{/each}
		{:else}
			{#each searchData as result}
				<AnilistCard {result} />
			{:else}
				{#each Array(4) as _, index (index)}
					<SkeletonCard />
				{/each}
			{/each}
		{/if}
	</ul>
</div>
