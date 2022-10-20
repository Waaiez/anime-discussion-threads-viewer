<script lang="ts">
	import { goto } from '$app/navigation';
	import type { RedditData, RedditPost } from '$lib/interfaces/RedditData';
	import { redditSearch } from '$lib/modules/redditSearch';
	import { onMount } from 'svelte';
	import Icon from 'svelte-icons-pack';
	import FaSolidSearch from 'svelte-icons-pack/fa/FaSolidSearch';

	/** @type {import('./$types').PageData} */
	export let data;

	let redditData: RedditPost[] = [];

	onMount(async () => {
		const titleToSearch = data.anilistData.Media.title.romaji;
		const res = await redditSearch(titleToSearch);

		redditData = res.data.children.filter((post: RedditPost) => {
			return (
				post.data.link_flair_text === 'Episode' &&
				post.data.title.includes(titleToSearch) &&
				post.data.selftext.includes(data.anilistData.Media.id)
			);
		});

		console.log(redditData);
	});
</script>

<div class="w-full flex gap-5 p-4 max-w-2xl">
	<button
		class="btn btn-lg bg-accent-500/20 ring-accent-500/50 text-white rounded-lg w-full"
		on:click={() => goto('/search')}
	>
		<div class="h-full w-full justify-center flex">
			<Icon src={FaSolidSearch} color="white" size="32" className="w-full" />
		</div>
	</button>
</div>

<main>
	<div>
		<div
			class="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8"
		>
			<div class="lg:max-w-lg lg:self-end">
				<div class="mt-4">
					<h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl flex justify-center">
						{data.anilistData.Media.title.romaji}
					</h1>
				</div>
			</div>

			<div class="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
				<div class="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden">
					<img
						src={data.anilistData.Media.coverImage.extraLarge ||
							data.anilistData.Media.coverImage.large}
						alt={data.anilistData.Media.title.romaji}
						class="w-full h-full object-center object-cover"
					/>
				</div>
			</div>

			<div class="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
				<section aria-labelledby="options-heading">
					<h2 class="text-3xl font-bold tracking-tight sm:text-4xl flex justify-center my-3">
						Threads
					</h2>

					<!-- TODO: Fix text overflowing button -->
					{#each redditData as post}
						<div class="py-2 w-full">
							<a href={post.data.url} target="_blank" rel="noreferrer">
								<button
									class="btn btn-lg bg-primary-500/20 ring-primary-500/50 text-white rounded-lg w-full"
								>
									{post.data.title}
								</button>
							</a>
						</div>
					{/each}
				</section>
			</div>
		</div>
	</div>
</main>
