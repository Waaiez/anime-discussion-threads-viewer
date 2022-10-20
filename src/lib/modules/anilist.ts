import { GraphQLClient } from 'graphql-request';
import type { ToastMessage } from '@brainandbones/skeleton';
import { toastStore } from '@brainandbones/skeleton';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({ maxConcurrent: 1, minTime: 5000 });
const limit = limiter.wrap(anilistRequest);

const client = new GraphQLClient('https://graphql.anilist.co', {
	redirect: 'follow'
});

// TODO: better types
export async function anilistRequest(query: string, variables: object) {
	try {
		const data = await client.request(query, variables);
		return data;
	} catch (error) {
		console.log('Anilist Error', error);

		const toastDetails: ToastMessage = {
			message: 'There was an error retrieving data from Anilist',
			autohide: true,
			timeout: 5000
		};
		toastStore.trigger(toastDetails);

		return await limit(query, variables);
	}
}
