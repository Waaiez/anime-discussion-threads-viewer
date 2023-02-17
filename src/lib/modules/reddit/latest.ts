import type { RedditData, RedditPost } from '$lib/interfaces/Reddit';
import { redditData } from '$lib/stores';
import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

export async function getLatestRedditData() {
	try {
		console.log('Fetching data from reddit');

		const response = await fetch('https://api.reddit.com/user/AutoLovepon.json?limit=100', {
			mode: 'cors'
		});
		console.log('Data fetched from reddit');

		const data: RedditData = await response.json();
		console.log('Data parsed from reddit');

		let filteredData = data.data.children.filter(
			(post: RedditPost) =>
				post.data.link_flair_text === 'Episode' &&
				post.data.selftext !== '[removed]' &&
				!post.data.title.includes('Megathread')
		);
		console.log('Data filtered from reddit');

		redditData.update((currentData) => [...new Set([...filteredData, ...currentData])]);
		console.log('Data updated in store');
	} catch (error) {
		console.error('Reddit Error', error);

		const redditError: ToastSettings = {
			message: 'There was an error getting data from Reddit',
			preset: 'error',
			autohide: true,
			timeout: 5000
		};
		toastStore.trigger(redditError);
	}
}
