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

const fetcher = async (...args) => {
	const response = await fetch(...args);

	if (!response.ok) {
		const error = new Error('An error occurred while fetching the data.');
		error.info = await response.json();
		error.status = response.status;
		throw error;
	}

	let data = await response.json();

	data = data.data.children.filter(
		(post) => post.data.link_flair_text === 'Episode'
	);

	return data;
};

const urlBuilder = (query, limit) => {
	let url;

	switch (query.type) {
		case 'all':
			url = `https://www.reddit.com/user/AutoLovepon.json?limit=${limit}`;
			break;
		case 'allAnime': {
			let search = query.search
				? encodeURIComponent(query.search.trim())
				: '';
			url = `https://www.reddit.com/r/anime/search.json?q=${search}&restrict_sr=1&sr_nsfw=&sort=new`;
			break;
		}
		default:
			url = `https://www.reddit.com/user/AutoLovepon.json?limit=${limit}`;
	}

	return url;
};

export default function useReddit(
	query = { type: 'all', search: '' },
	limit = 1,
	resultsPerPage = 1
) {
	const redditURL = urlBuilder(query, limit);

	const { data, error } = useSWR(redditURL, fetcher, {
		refreshInterval: 600000,
		use: [keepPrevData],
		onErrorRetry: (error, revalidate, { retryCount }) => {
			if (error.status === 404) return;

			if (retryCount >= 10) return;

			setTimeout(() => revalidate({ retryCount }), 5000);
		},
	});

	let aData;
	if (data) aData = data.slice(0, resultsPerPage);

	return { data, aData, error };
}
