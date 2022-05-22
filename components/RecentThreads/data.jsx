import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import media from '../../lib/anilist-api/queries/media';
import showToast from '../../lib/showToast';

export default function Data({ post }) {
	const [animeData, setAnimeData] = useState(null);
	const [anilistData, setAnilistData] = useState(null);

	useEffect(() => {
		Promise.resolve(
			window.anitomyscript(post.data.title).then((res) => {
				setAnimeData(res);
			})
		);
	}, [post.data.title]);

	useEffect(() => {
		async function search() {
			if (animeData) {
				let season = animeData.anime_season || '';
				const data = await media({
					search: animeData.anime_title + season,
				});

				data.error
					? showToast(
							'Anilist Error',
							`Status Code: ${data.error.response.status}`,
							'anilistError'
					  )
					: setAnilistData(data.Page.media[0]);
			}
		}
		search();
	}, [animeData]);

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
							(anilistData && anilistData.coverImage.large) ||
							'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
						}
						alt={animeData && animeData.anime_title + ' Image'}
						layout='fill'
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
					/>
				</div>
				<p className='mt-2 block text-sm font-medium text-slate-100 truncate pointer-events-none select-none'>
					{animeData && animeData.anime_title}
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					Episode {animeData && animeData.episode_number} Discussion
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					{moment(dateCreated).fromNow()}
				</p>
			</a>
		</li>
	);
}
