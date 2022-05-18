import moment from 'moment';
import { useEffect, useState } from 'react';

import media from '../../lib/anilist-api/queries/media';

export default function Data({ post }) {
	const [animeData, setAnimeData] = useState(null);
	const [anilistData, setAnilistData] = useState(null);
	useEffect(() => {
		Promise.resolve(
			window.anitomyscript(post.data.title).then((res) => {
				setAnimeData(res);
			})
		);
	}, []);

	useEffect(() => {
		async function search() {
			if (animeData) {
				const data = await media({
					search: animeData.anime_title,
				});
				console.log('anilist', data.Media);
				setAnilistData(data.Media);
			}
		}
		search();
	}, [animeData]);

	let dateCreated = new Date(post.data.created * 1000);
	return (
		<li className='relative group cursor-pointer select-none'>
			<a href={post.data.url}>
				<div className='block w-full aspect-w-2 aspect-h-3 rounded-lg bg-slate-100 group-hover:ring-2 group-hover:ring-slate-100 overflow-hidden select-none'>
					<img
						src={anilistData && anilistData.coverImage.large}
						alt=''
						className='object-cover pointer-events-none select-none'
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
