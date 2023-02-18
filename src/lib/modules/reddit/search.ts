import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

export async function redditSearch(query: string) {
	try {
		const response = await fetch(
			`https://www.reddit.com/r/anime/search.json?q=${query} author%3AAutoLovepon&restrict_sr=1&limit=100&sort=relevance&t=all`
		);
		const data = await response.json();
		return data;
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
