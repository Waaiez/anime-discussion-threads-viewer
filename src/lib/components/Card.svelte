<script lang="ts">
	import type { RedditPost } from '$lib/interfaces/Reddit';
	import { formatTimeAgo } from '$lib/utils/formatTime';

	import { onMount } from 'svelte';

	export let post: RedditPost;

	let postSelfText: string = post.data.selftext;
	let postTitle: string = post.data.title;

	let anilistUrl = '';
	let anilistId = '';

	let anilistData = {
		Media: {
			coverImage: {
				large:
					'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
			}
		}
	};

	let animeData = {
		anime_title: '',
		anime_season: '',
		episode_number: ''
	};

	if (postSelfText !== '[removed]') {
		if (!postTitle.includes('Megathread')) {
			let resultsUrl = postSelfText.match(/https:\/\/anilist\.co\/anime\/.*/);
			if (resultsUrl) anilistUrl = resultsUrl[0] as string;

			let resultsId = anilistUrl.match(/\d+/);
			if (resultsId) anilistId = resultsId[0] || '';
		}
	}

	// async function getCoverImage(anilistId) {
	// 	console.log('Anilist request');
	// 	const res = await anilistRequest(querySearchById, { id: anilistId });
	// 	if (res.error) {
	// 		console.log('error');
	// 	}
	// 	anilistData = res;
	// }

	onMount(async () => {
		if (anilistId) {
			// await getCoverImage(anilistId);
		} else {
			anilistData.Media.coverImage.large =
				'https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/default.jpg';
		}
	});

	if (typeof window !== 'undefined') {
		Promise.resolve(
			// @ts-ignore
			window.anitomyscript(post.data.title).then((res) => {
				animeData = res;
			})
		);
	}

	const dateCreated = new Date(post.data.created * 1000);
</script>

<div class="relative cursor-pointer group">
	<a href={post.data.url} class="group !no-underline" target="_blank" rel="noopener noreferrer">
		<img
			src={anilistData.Media.coverImage.large}
			alt={animeData.anime_title}
			class="object-cover h-96 w-full rounded-lg shadow-xl group-hover:ring-2 group-hover:ring-slate-100"
		/>
		<div class="space-y-2">
			<div class="mt-4 truncate text-slate-100">
				{@html animeData.anime_title}
				{animeData.anime_season ? ` Season ${animeData.anime_season}` : ''}
			</div>
			<div class="truncate text-slate-300">Episode {animeData.episode_number} Discussion</div>

			<div class="truncate text-slate-300">{formatTimeAgo(dateCreated)}</div>
		</div>
	</a>
</div>
