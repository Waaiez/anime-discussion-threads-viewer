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

export default function useReddit() {
	const { data, error } = useSWR(
		'https://www.reddit.com/user/AutoLovepon.json?limit=100',
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
