<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { RedditPost } from '$lib/interfaces/Reddit';
	import { redditSearch } from '$lib/modules/reddit/search';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let loading = true;

	let redditData: RedditPost[] = [];

	const titleToSearch = data.anilistData.Media.title.romaji;
	onMount(async () => {
		loading = true;

		const res = await redditSearch(titleToSearch + ' discussion');

		redditData = res.data.children.filter((post: RedditPost) => {
			return (
				post.data.link_flair_text === 'Episode' &&
				post.data.title.toLowerCase().indexOf(titleToSearch.toLowerCase()) !== -1 &&
				post.data.selftext.includes(data.anilistData.Media.id)
			);
		});

		redditData.sort((a, b) => {
			const options = { numeric: true };
			return b.data.title.localeCompare(a.data.title, undefined, options);
		});

		console.log(redditData);
		loading = false;
	});
</script>

<div class="m-auto w-full h-full items-center flex flex-col">
	<div
		class="flex flex-col md:flex-row items-center justify-evenly mb-12 max-w-xl mx-auto gap-5 w-full"
	>
		<Button icon="search" colour="secondary" link="/search" />
	</div>

	<h1 class="text-md md:text-lg font-extrabold tracking-tight text-center mb-12">
		{data.anilistData.Media.title.romaji}
	</h1>

	<div class="grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-12 gap-x-6">
		<div class="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
			<div class=" aspect-auto bg-gray-50 rounded-lg overflow-hidden sticky top-10">
				<img
					src={data.anilistData.Media.coverImage.extraLarge ||
						data.anilistData.Media.coverImage.large}
					alt={data.anilistData.Media.title.romaji + ' Poster'}
					class="object-cover"
				/>
			</div>
		</div>
		<div class="mt-6 sm:col-span-7 md:row-end-1">
			<h3 class="text-xl font-bold tracking-tight text-center">Threads</h3>
			{#each redditData as post}
				<a
					href={post.data.url}
					target="_blank"
					rel="noreferrer"
					class="btn variant-ghost-primary text-white rounded-lg w-full mt-3 !whitespace-normal break-words"
				>
					{post.data.title}
				</a>
			{:else}
				{#if loading}
					{#each Array(4) as _}
						<button
							class="btn variant-soft-secondary animate-pulse text-white rounded-lg w-full mt-3 !whitespace-normal break-words"
							disabled
						>
							Loading
						</button>
					{/each}
				{:else}
					<div class="text-center text-lg">No threads found for this anime</div>
					<div class="text-center">
						<a
							href={`https://www.reddit.com/r/anime/search?q=${titleToSearch} discussion author%3AAutoLovepon&restrict_sr=1&sort=relevance&t=all`}
							target="_blank"
							rel="noreferrer"
							class="btn variant-filled-tertiary text-white rounded-lg w-full mt-3 !whitespace-normal break-words"
						>
							Search Reddit
						</a>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
