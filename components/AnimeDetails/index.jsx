import Image from 'next/image';
import React from 'react';

export default function AnimeDetails() {
	return (
		<ul
			role='list'
			className='grid md:grid-cols-2 gap-x-10 gap-y-5 p-1 grid-rows-2 md:grid-rows-1'>
			<li className='relative select-none'>
				<div className='block w-full aspect-w-2 aspect-h-3 lg:aspect-h-5 lg:aspect-w-4 rounded-lg overflow-hidden'>
					<Image
						src={
							'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-Yl5M3AiLZAMq.png' ||
							'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
						}
						alt='Image'
						layout='fill'
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
					/>
				</div>
			</li>
			<li className='relative select-none'>
				<p className='mt-2 block text-sm font-medium text-slate-100 truncate pointer-events-none'>
					title
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					Episode Discussion
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					date
				</p>
				<p className='mt-2 block text-sm font-medium text-slate-100 truncate pointer-events-none select-none'>
					title
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					Episode Discussion
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					date
				</p>
				<p className='mt-2 block text-sm font-medium text-slate-100 truncate pointer-events-none select-none'>
					title
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					Episode Discussion
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					date
				</p>
				<p className='mt-2 block text-sm font-medium text-slate-100 truncate pointer-events-none select-none'>
					title
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					Episode Discussion
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					date
				</p>
				<p className='mt-2 block text-sm font-medium text-slate-100 truncate pointer-events-none select-none'>
					title
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					Episode Discussion
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					date
				</p>
				<p className='mt-2 block text-sm font-medium text-slate-100 truncate pointer-events-none select-none'>
					title
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					Episode Discussion
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					date
				</p>
			</li>
		</ul>
	);
}
