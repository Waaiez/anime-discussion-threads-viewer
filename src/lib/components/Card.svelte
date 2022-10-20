<script lang="ts">
	import { onMount } from 'svelte';

	import moment from 'moment';

	import { anilistRequest } from '$lib/modules/anilist';
	import { querySearchById } from '$lib/modules/anilist-queries';

	// TODO: type for reddit post
	export let post;

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

	async function getCoverImage(anilistId) {
		console.log('Anilist request');
		const res = await anilistRequest(querySearchById, { id: anilistId });
		if (res.error) {
			console.log('error');
		}
		anilistData = res;
	}

	onMount(async () => {
		if (anilistId) {
			await getCoverImage(anilistId);
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

<li class="relative cursor-pointer select-none">
	<a href={post.data.url} class="group card" target="_blank" rel="noopener noreferrer">
		<div class="bg-transparent">
			<div class="shadow-xl group-hover:ring-2 group-hover:ring-slate-100 rounded-lg">
				<figure class="aspect-w-2 aspect-h-3 ">
					<img
						src={anilistData.Media.coverImage.large}
						alt={animeData.anime_title}
						class="object-cover rounded-lg"
					/>
				</figure>
			</div>

			<div class="select-none card-body !p-0">
				<p class="block mt-2 truncate pointer-events-none !text-slate-100">
					{@html animeData.anime_title}
					{animeData.anime_season ? ` Season ${animeData.anime_season}` : ''}
				</p>
				<p class="block truncate pointer-events-none text-slate-300">
					Episode {animeData.episode_number} Discussion
				</p>
				<p class="block truncate pointer-events-none text-slate-300">
					{moment(dateCreated).fromNow()}
				</p>
			</div>
		</div>
	</a>
</li>
