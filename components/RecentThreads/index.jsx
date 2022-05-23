import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import useReddit from '../../hooks/useReddit';
import showToast from '../../lib/showToast';
import SkeletonCard from '../SkeletonCard';
import Data from './data';

export default function RecentThreads() {
	const [filteredData, setFilteredData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const emptyArray = new Array(4).fill(0);

	const { data, error } = useReddit({ type: 'all' }, 5);

	if (error)
		showToast({
			errorName: 'Reddit Error',
			errorStatus: 'There was an error getting data from Reddit',
			errorId: 'redditError',
		});

	useEffect(() => {
		if (data) {
			setFilteredData(data);
			setLoading(false);
		}
	}, [data]);

	return (
		<>
			<Link href='/threads' replace>
				<div className='text-4xl font-semibold text-slate-100 my-5 flex justify-center cursor-pointer hover:bg-gray-700 rounded-xl py-3'>
					<span>Recent Threads</span>
					<ChevronRightIcon className='w-10 h-11' />
				</div>
			</Link>
			<div className='w-full py-3'>
				<ul
					role='list'
					className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
					{isLoading &&
						emptyArray.map((_, i) => <SkeletonCard key={i} />)}

					{!isLoading &&
						filteredData.map((post) => (
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
