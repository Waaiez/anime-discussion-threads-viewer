import moment from 'moment';
import Image from 'next/image';
import React from 'react';

export default function AnilistThreadCard({ post, anilistData, animeData }) {
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
							'https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/default.jpg'
						}
						alt={
							`${animeData?.anime_title} Image` ||
							`${post.data.title} Image`
						}
						layout='fill'
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
					/>
				</div>
				<p className='mt-2 block text-sm font-medium text-slate-100 truncate pointer-events-none select-none'>
					{animeData?.anime_title}{' '}
					{animeData?.anime_season
						? ` Season ${animeData.anime_season}`
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
