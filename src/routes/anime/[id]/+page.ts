/** @type {import('./$types').PageLoad} */

import { anilistRequest } from '$lib/modules/anilist';
import { querySearchById } from '$lib/modules/anilist-queries';

let anilistData = {
	Media: {
		coverImage: {
			large:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
		},
		title: {
			romaji: 'Loading...'
		}
	}
};

export async function load({ params }) {
	const res = await anilistRequest(querySearchById, { id: params.id });
	anilistData = res;
	return {
		anilistData
	};
}
