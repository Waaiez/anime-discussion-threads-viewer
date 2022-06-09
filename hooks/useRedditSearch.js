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

		return { ...swr, data: dataOrPrevData };
	};
}

const fetcher = async (url, search) => {
	const response = await fetch(url);

	if (!response.ok) {
		const error = new Error('An error occurred while fetching the data.');
		error.info = await response.json();
		error.status = response.status;
		throw error;
	}

	let data = await response.json();

	data = data.data.children.filter((post) => {
		return (
			post.data.link_flair_text === 'Episode' &&
			post.data.title.includes(search)
		);
	});

	return data;
};

export default function useRedditSearch(search) {
	const { data, error } = useSWR(
		[
			`https://www.reddit.com/r/anime/search.json?q="${search}"&restrict_sr=1&sr_nsfw=&sort=new&limit=100`,
			search,
		],
		fetcher,
		{
			refreshInterval: 600000,
			use: [keepPrevData],
			onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
				if (error.status === 404) return;

				if (retryCount >= 10) return;

				setTimeout(() => revalidate({ retryCount }), 5000);
			},
		}
	);

	return { data, isLoading: !error && !data, error };
}
