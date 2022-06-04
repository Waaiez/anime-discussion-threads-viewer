import Image from 'next/image';
import Link from 'next/link';

export default function Data({ data }) {
	return (
		<Link href={`/anime/${data.id}`} passHref>
			<li className='relative cursor-pointer select-none group'>
				<div className='block w-full overflow-hidden rounded-lg select-none aspect-w-2 aspect-h-3 bg-slate-100 group-hover:ring-2 group-hover:ring-slate-100'>
					<Image
						src={
							data.coverImage.large ||
							'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
						}
						alt={`${data.title.romaji} Image`}
						layout='fill'
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=='
					/>
				</div>
				<p className='block mt-2 text-sm font-medium truncate pointer-events-none select-none text-slate-100'>
					{data.title.romaji}
				</p>
			</li>
		</Link>
	);
}
