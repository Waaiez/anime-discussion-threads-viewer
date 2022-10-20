import { writable } from 'svelte/store';

import type { RedditData, RedditPost } from './interfaces/RedditData';

export const redditData = writable<RedditPost[]>([]);

export const loadRedditData = async () => {
	try {
		console.log('Fetching data from reddit');

		const response = await fetch('https://api.reddit.com/user/AutoLovepon.json?limit=100');
		console.log('Data fetched from reddit');

		const data: RedditData = await response.json();
		console.log('Data parsed from reddit');

		const filteredData = data.data.children.filter(
			(post: RedditPost) => post.data.link_flair_text === 'Episode'
		);
		console.log('Data filtered from reddit');

		redditData.update((currentData) => [...new Set([...filteredData, ...currentData])]);
		console.log('Data updated in store');
	} catch (e) {
		if (e instanceof Error) console.error('error', e);
	}
};

loadRedditData();

setInterval(() => {
	console.log('Refreshing data from reddit');
	loadRedditData();
}, 300000);
