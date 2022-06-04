import moment from 'moment';
import Image from 'next/image';
import React from 'react';

export default function AnilistThreadCard({ post, anilistData, animeData }) {
	const dateCreated = new Date(post.data.created * 1000);

	return (
		<li className='relative cursor-pointer select-none'>
			<a
				href={post.data.url}
				className='group'
				target='_blank'
				rel='noreferrer'>
				<div className='block w-full overflow-hidden rounded-lg select-none aspect-w-2 aspect-h-3 bg-slate-100 group-hover:ring-2 group-hover:ring-slate-100'>
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
				<p className='block mt-2 text-sm font-medium truncate pointer-events-none select-none text-slate-100'>
					{animeData?.anime_title}{' '}
					{animeData?.anime_season
						? ` Season ${animeData.anime_season}`
						: ''}
				</p>
				<p className='block text-sm font-medium truncate pointer-events-none select-none text-slate-300'>
					Episode {animeData?.episode_number} Discussion
				</p>
				<p className='block text-sm font-medium truncate pointer-events-none select-none text-slate-300'>
					{moment(dateCreated).fromNow()}
				</p>
			</a>
		</li>
	);
}
