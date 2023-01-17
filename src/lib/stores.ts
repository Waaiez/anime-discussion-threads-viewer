import { writable } from 'svelte/store';
import type { RedditPost } from './interfaces/Reddit';
import { getLatestRedditData } from './modules/reddit/latest';

export const redditData = writable<RedditPost[]>([]);

Promise.resolve(getLatestRedditData());

setInterval(() => {
	console.log('Refreshing data from reddit');
	Promise.resolve(getLatestRedditData());
}, 300000);
