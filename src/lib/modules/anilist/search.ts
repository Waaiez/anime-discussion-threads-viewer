import { GraphQLClient } from 'graphql-request';
import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({ maxConcurrent: 1, minTime: 5000 });
// @ts-ignore
const limit = limiter.wrap(anilistSearch);

const client = new GraphQLClient('https://graphql.anilist.co', {
	redirect: 'follow'
});

// TODO: better types
// @ts-ignore
export async function anilistSearch(query: string, variables: object) {
	try {
		const data = await client.request(query, variables);
		return data;
	} catch (error) {
		console.log('Anilist Error', error);

		const toastDetails: ToastSettings = {
			message: 'There was an error retrieving data from Anilist',
			autohide: true,
			timeout: 5000,
			preset: 'error'
		};
		toastStore.trigger(toastDetails);

		return await limit(query, variables);
	}
}
