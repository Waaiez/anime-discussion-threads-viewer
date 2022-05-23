import { useEffect, useRef } from 'react';
import useSWR from 'swr';

function keepPrevData(useSWRNext) {
	return (key, fetcher, config) => {
		const prevDataRef = useRef();

		const swr = useSWRNext(key, fetcher, config);

		useEffect(() => {
			if (swr.data !== undefined) {
				prevDataRef.current = swr.data;
			}
		}, [swr.data]);

		const dataOrPrevData =
			swr.data === undefined ? prevDataRef.current : swr.data;

		return Object.assign({}, swr, {
			data: dataOrPrevData,
		});
	};
}

export default function useReddit(
	query = { type: 'all', search: '' },
	limit = 1,
	resultsPerPage = 1
) {
	let url;

	switch (query.type) {
		case 'all':
			url = `https://www.reddit.com/user/AutoLovepon.json?limit=${limit}`;
			break;
		case 'allAnime':
			let search = query.search
				? encodeURIComponent(query.search.trim())
				: '';
			url = `https://www.reddit.com/r/anime/search.json?q=${search}&restrict_sr=1&sr_nsfw=&sort=new`;
			console.log('reddit url', url);
			break;
		default:
			url = `https://www.reddit.com/user/AutoLovepon.json?limit=${limit}`;
	}

	const fetcher = (...args) =>
		fetch(...args)
			.then((res) => res.json())
			.then((data) =>
				data.data.children.filter(
					(post) => post.data.link_flair_text === 'Episode'
				)
			);

	const { data, error } = useSWR(url, fetcher, {
		refreshInterval: 600000,
		use: [keepPrevData],
	});

	let aData;
	if (data) aData = data.slice(0, resultsPerPage);

	return { data, aData, error };
}
