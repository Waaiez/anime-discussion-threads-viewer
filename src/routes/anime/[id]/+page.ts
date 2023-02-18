import type { PageLoad } from './$types';
import { querySearchById } from '$lib/modules/anilist/queries';
import { anilistSearch } from '$lib/modules/anilist/search';

let anilistData = {
	Media: {
		id: '1',
		coverImage: {
			extraLarge:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg==',
			large:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
		},
		title: {
			romaji: 'Loading...'
		}
	}
};

export const load = (async ({ params }) => {
	const res = await anilistSearch(querySearchById, { id: params.id });
	anilistData = res;
	return {
		anilistData
	};
}) satisfies PageLoad;
