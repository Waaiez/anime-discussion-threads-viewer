import { BeakerIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import SkeletonCard from './../SkeletonCard';
import Data from './data';

export default function RecentThreads() {
	const [data, setData] = useState(null);
	const [filteredData, setFilteredData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const emptyArray = new Array(4).fill(0);

	useEffect(() => {
		fetch('https://www.reddit.com/user/AutoLovepon.json')
			.then((res) => res.json())
			.then((data) => {
				setData(data);
			});
	}, []);

	useEffect(() => {
		if (data) {
			let fData = data.data.children.filter(
				(post) => post.data.link_flair_text === 'Episode'
			);
			setFilteredData(fData);
			setLoading(false);
		}
	}, [data]);

	return (
		<>
			{isLoading && (
				<div className='w-full py-5'>
					<Link href='/threads'>
						<div className='text-4xl font-semibold text-slate-100 my-5 flex justify-between cursor-pointer'>
							<span>Recent Threads</span>
							<ChevronRightIcon className='w-10' />
						</div>
					</Link>
					<ul
						role='list'
						className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
						{emptyArray.map((_, i) => (
							<SkeletonCard key={i} />
						))}
					</ul>
				</div>
			)}

			{!isLoading && (
				<div className='w-full my-5'>
					<Link href='/threads'>
						<div className='text-4xl font-semibold text-slate-100 my-5 flex justify-between cursor-pointer hover:bg-gray-700 py-3'>
							<span>Recent Threads</span>
							<ChevronRightIcon className='w-10' />
						</div>
					</Link>
					<ul
						role='list'
						className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
						{filteredData.slice(0, 4).map((post) => (
							<Data post={post} key={post.data.title} />
						))}
					</ul>
				</div>
			)}
		</>
	);
}
