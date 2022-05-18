import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import SkeletonCard from './../SkeletonCard';
import Data from './data';

export default function RecentThreads() {
	const [data, setData] = useState(null);
	const [filteredData, setFilteredData] = useState([]);
	const [allData, setAllData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const emptyArray = new Array(8).fill(0);

	useEffect(() => {
		fetch('https://www.reddit.com/user/AutoLovepon.json?limit=100')
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
			setAllData(filteredData.slice(0, 8));
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	}, [data]);

	const perPage = 8;
	const [lastPosition, setLastPosition] = useState(perPage);
	const loadProducts = () => {
		setAllData((prev) => [
			...prev,
			...filteredData.slice(lastPosition, lastPosition + perPage),
		]);
		setLastPosition(lastPosition + perPage);
	};

	return (
		<>
			{isLoading && (
				<div className='w-full py-5'>
					<Link href='/'>
						<div className='text-4xl font-semibold text-slate-100 my-5 flex py-3 cursor-pointer hover:bg-gray-700 rounded-xl justify-center'>
							<ChevronLeftIcon className='w-10 h-11' />
							<span>Recent Threads</span>
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
					<Link href='/'>
						<div className='text-4xl font-semibold text-slate-100 my-5 flex py-3 cursor-pointer hover:bg-gray-700 rounded-xl justify-center'>
							<ChevronLeftIcon className='w-10 h-11' />
							<span>Recent Threads</span>
						</div>
					</Link>
					{allData && (
						<InfiniteScroll
							dataLength={allData.length}
							next={loadProducts}
							hasMore='true'>
							<ul
								role='list'
								className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 p-1'>
								{allData.map((post) => (
									<Data post={post} key={post.data.title} />
								))}
							</ul>
						</InfiniteScroll>
					)}
				</div>
			)}
		</>
	);
}
