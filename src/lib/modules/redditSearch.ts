import { toastStore, type ToastMessage } from '@brainandbones/skeleton';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({ maxConcurrent: 1, minTime: 5000 });
const limit = limiter.wrap(redditSearch);

// TODO: better types
export async function redditSearch(query: string) {
	try {
		const response = await fetch(
			`https://www.reddit.com/r/anime/search.json?q="${query}"&restrict_sr=1&sr_nsfw=&sort=new&limit=100`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log('Anilist Error', error);

		const toastDetails: ToastMessage = {
			message: 'There was an error retrieving data from Reddit',
			autohide: true,
			timeout: 5000
		};
		toastStore.trigger(toastDetails);

		return await limit(query);
	}
}
