import { useEffect, useReducer } from 'react';

import useAnilist from '../../hooks/useAnilist';
import mediaQuery from '../../lib/anilist-api/queries/media';
import showToast from '../../lib/showToast';
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

export default function Data({ post }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { animeData, anilistData } = state;

	useEffect(() => {
		Promise.resolve(
			window.anitomyscript(post.data.title).then((res) => {
				dispatch({ type: 'getAnimeData', payload: { animeData: res } });
			})
		);
	}, []);

	let season = animeData?.anime_season
		? ` Season ${animeData.anime_season}`
		: '';

	const { data, error } = useAnilist(
		mediaQuery,
		animeData && {
			search: animeData.anime_title + season,
		}
	);

	if (error) {
		showToast({
			errorName: 'Anilist Error',
			errorStatus: `Status Code: ${error.response.status}`,
			errorId: 'anilistError',
		});
	}

	useEffect(() => {
		if (data) {
			dispatch({
				type: 'getAnilistData',
				payload: { anilistData: data.Page.media[0] },
			});
		}
	}, [data]);

	return (
		<AnilistThreadCard
			post={post}
			anilistData={anilistData}
			animeData={animeData}
		/>
	);
}
