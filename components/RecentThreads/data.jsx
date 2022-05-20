import moment from 'moment';
import Image from 'next/image';
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
				if (data.error)
					toast.error(
						<>
							<div className='text-lg font-semibold text-black'>
								Anilist Error
							</div>
							<div className='text-lg font-semibold text-black'>
								Status Code: {data.error.response.status}
							</div>
							<div className='text-lg font-semibold text-black'>
								Try again in a few minutes
							</div>
						</>,
						{
							position: 'top-right',
							autoClose: 5000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: false,
							toastId: 'anilistError',
						}
					);
				setAnilistData(data.Media);
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
