import { request } from 'graphql-request';
import { useEffect, useRef, useState } from 'react';
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

const fetcher = (query, variables) =>
	request('https://graphql.anilist.co', query, variables);

export default function useAnilist(query, variables, deps = []) {
	const [mounted, setMounted] = useState(false);

	const { data, error } = useSWR(
		mounted && variables && [query, variables],
		fetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			use: [keepPrevData],
			onErrorRetry: (revalidate, { retryCount }) => {
				if (error?.response?.status === 404) return;

				if (error?.response?.status === 429) return;

				if (retryCount >= 10) return;

				setTimeout(() => revalidate({ retryCount }), 5000);
			},
		}
	);

	useEffect(() => {
		setMounted(true);
	}, [deps]);

	return { data, error };
}
