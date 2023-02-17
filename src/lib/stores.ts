import { writable, type Writable } from 'svelte/store';
import type { RedditPost } from './interfaces/Reddit';
import { getLatestRedditData } from './modules/reddit/latest';
import { localStorageStore } from '@skeletonlabs/skeleton';

interface anilistData {
	Media: {
		coverImage: {
			extraLarge: string;
			large: string;
		};
	};
}

export const redditData = writable<RedditPost[]>([]);
export const cachedAnilistData: Writable<Record<string, anilistData>[]> = localStorageStore(
	'anilistData',
	[]
);

Promise.resolve(getLatestRedditData());

setInterval(() => {
	console.log('Refreshing data from reddit');
	Promise.resolve(getLatestRedditData());
}, 300000);
