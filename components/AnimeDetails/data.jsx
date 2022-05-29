import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import useReddit from '../../hooks/useReddit';

export default function Data({ anilistData }) {
	const [redditData, setRedditData] = useState(null);

	const { data, error } = useReddit(
		{ type: 'allAnime', search: anilistData?.title.romaji },
		5
	);

	if (error)
		showToast({
			errorName: 'Reddit Error',
			errorStatus: 'There was an error getting data from Reddit',
			errorId: 'redditError',
		});

	useEffect(() => {
		if (data) {
			console.log(data);
			setRedditData(data);
		}
	}, [data]);

	return (
		<div className='flex flex-wrap'>
			<div className='grow-0 shrink-0 basis-auto w-full md:w-4/12 mb-12 lg:mb-0 md:px-6'>
				<div className='relative overflow-hidden bg-no-repeat bg-cover rounded-lg shadow-lg aspect-w-2 aspect-h-3'>
					<Image
						src={
							anilistData?.coverImage.extraLarge ||
							anilistData?.coverImage.large ||
							'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
						}
						alt={anilistData?.anime_title + ' Image'}
						layout='fill'
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
					/>
				</div>
			</div>

			<div className='grow-0 shrink-0 basis-auto w-full md:w-8/12 md:px-6'>
				<div className='flex mb-12'>
					<div className='grow ml-4'>
						<p className='font-bold mb-1 text-white text-2xl'>
							{anilistData?.title.romaji}
						</p>
					</div>
				</div>

				<div className='flex mb-12'>
					<div className='grow ml-4'>
						<p className='font-bold mb-1 text-white text-2xl'>
							Threads
						</p>
						<p className='text-slate-200'>
							{redditData?.map((thread) => (
								<a href={thread.data.url}>
									{thread.data.title}
								</a>
							))}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
