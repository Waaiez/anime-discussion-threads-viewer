import moment from 'moment';
import Image from 'next/image';
import { useEffect, useReducer } from 'react';

import useAnilist from '../../hooks/useAnilist';
import mediaQuery from '../../lib/anilist-api/queries/media';
import showToast from '../../lib/showToast';

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
		? ' Season ' + animeData.anime_season
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

	let dateCreated = new Date(post.data.created * 1000);

	return (
		<li className='relative cursor-pointer select-none'>
			<a
				href={post.data.url}
				className='group'
				target='_blank'
				rel='noreferrer'>
				<div className='block w-full aspect-w-2 aspect-h-3 rounded-lg bg-slate-100 group-hover:ring-2 group-hover:ring-slate-100 overflow-hidden select-none'>
					<Image
						src={
							anilistData?.coverImage.large ||
							'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
						}
						alt={
							animeData?.anime_title || post.data.title + ' Image'
						}
						layout='fill'
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
					/>
				</div>
				<p className='mt-2 block text-sm font-medium text-slate-100 truncate pointer-events-none select-none'>
					{animeData?.anime_title}{' '}
					{animeData?.anime_season
						? ' Season ' + animeData.anime_season
						: ''}
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					Episode {animeData?.episode_number} Discussion
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					{moment(dateCreated).fromNow()}
				</p>
			</a>
		</li>
	);
}
