import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import useRedditSearch from '../../hooks/useRedditSearch';
import showToast from '../../lib/showToast';

export default function Data({ anilistData }) {
	const [redditData, setRedditData] = useState(null);

	const { data, error } = useRedditSearch(anilistData?.title.romaji);

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
			<div className='w-full mb-12 grow-0 shrink-0 basis-auto md:w-4/12 lg:mb-0 md:px-6'>
				<div className='relative overflow-hidden bg-no-repeat bg-cover rounded-lg shadow-lg aspect-w-2 aspect-h-3'>
					<Image
						src={
							anilistData?.coverImage.extraLarge ||
							anilistData?.coverImage.large ||
							'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
						}
						alt={`${anilistData?.anime_title} Image`}
						layout='fill'
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
					/>
				</div>
			</div>

			<div className='w-full grow-0 shrink-0 basis-auto md:w-8/12 md:px-6'>
				<div className='flex mb-12'>
					<div className='ml-4 grow'>
						<p className='mb-1 text-2xl font-bold text-white'>
							{anilistData?.title.romaji}
						</p>
					</div>
				</div>

				<div className='flex mb-12'>
					<div className='ml-4 grow'>
						<p className='mb-1 text-2xl font-bold text-white'>
							Threads
						</p>
						<p className='text-slate-200'>
							{redditData?.map((thread) => (
								<a key={thread.data.url} href={thread.data.url}>
									{thread.data.title} <br />
								</a>
							))}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
