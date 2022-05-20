import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import SkeletonCard from './../SkeletonCard';
import Data from './data';

export default function RecentThreads() {
	const [filteredData, setFilteredData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const emptyArray = new Array(4).fill(0);

	const fetcher = (...args) => fetch(...args).then((res) => res.json());

	const { data, error } = useSWR(
		'https://www.reddit.com/user/AutoLovepon.json',
		fetcher
	);

	if (error)
		toast.error(
			<>
				<div className='text-lg font-semibold text-black'>
					Reddit Error
				</div>
				<div className='text-lg font-semibold text-black'>
					There was an error getting data from Reddit
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
				toastId: 'redditError',
			}
		);

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
			<Link href='/threads'>
				<div className='text-4xl font-semibold text-slate-100 my-5 flex justify-center cursor-pointer hover:bg-gray-700 rounded-xl py-3'>
					<span>Recent Threads</span>
					<ChevronRightIcon className='w-10 h-11' />
				</div>
			</Link>
			<div className='w-full py-5'>
				<ul
					role='list'
					className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
					{isLoading &&
						emptyArray.map((_, i) => <SkeletonCard key={i} />)}

					{!isLoading &&
						filteredData
							.slice(0, 4)
							.map((post) => (
								<Data
									post={post}
									key={
										post.data.title +
										'/' +
										post.data.created +
										'/recent'
									}
								/>
							))}
				</ul>
			</div>
		</>
	);
}
