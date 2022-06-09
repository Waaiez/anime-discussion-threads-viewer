import { useEffect, useReducer } from 'react';

import useAnilist from '../../hooks/useAnilist';
import mediaQuery from '../../lib/anilist-api/queries/media';
import showToast from '../../lib/showToast';
import SkeletonCard from './../SkeletonCard/index';
import AnilistThreadCard from '../AnilistThreadCard';

const initialState = {
	animeData: null,
	anilistData: null,
};

function reducer(state, action) {
	switch (action.type) {
		case 'getAnimeData':
			return {
				...state,
				animeData: action.payload.animeData,
			};
		case 'getAnilistData':
			return {
				...state,
				anilistData: action.payload.anilistData,
			};
		default:
			throw new Error();
	}
}

export default function DataThreadCard({ post }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { animeData, anilistData } = state;

	useEffect(() => {
		// eslint-disable-next-line no-undef
		Promise.resolve(
			window.anitomyscript(post.data.title).then((res) => {
				dispatch({ type: 'getAnimeData', payload: { animeData: res } });
			})
		);
	}, []);

	const season = animeData?.anime_season
		? ` Season ${animeData.anime_season}`
		: '';

	const { data, isLoading, error } = useAnilist(
		mediaQuery,
		animeData && {
			search: animeData.anime_title + season,
		},
		[animeData]
	);

	useEffect(() => {
		if (data) {
			dispatch({
				type: 'getAnilistData',
				payload: { anilistData: data.Page.media[0] },
			});
		}
	}, [data]);

	if (isLoading) return <SkeletonCard animation='pulse' />;

	if (error) {
		console.warn(error);
		showToast({
			errorName: 'Anilist Error',
			errorStatus: `Status Code: ${error.response?.status}`,
			errorId: 'anilistError',
		});

		return (
			<div className='opacity-30'>
				<SkeletonCard animation='none' />
			</div>
		);
	}

	return (
		<AnilistThreadCard
			post={post}
			anilistData={anilistData}
			animeData={animeData}
		/>
	);
}
