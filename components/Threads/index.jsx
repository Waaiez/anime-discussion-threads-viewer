import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import showToast from './../../lib/showToast';
import useReddit from '../../hooks/useReddit';
import SkeletonCard from './../SkeletonCard';
import Data from './data';

const initialState = {
	filteredData: [],
	allPostData: [],
	isLoading: true,
	isLoadingMoreData: false,
	resultsPerPage: 12,
	lastPosition: 12,
};

function reducer(state, action) {
	switch (action.type) {
		case 'getDataSuccess':
			return {
				...state,
				filteredData: action.payload.filteredData,
				allPostData: action.payload.allPostData,
				isLoading: false,
				lastPosition: 12,
			};
		case 'loadPosts':
			return {
				...state,
				allPostData: [
					...state.allPostData,
					...state.filteredData.slice(
						state.lastPosition,
						state.lastPosition + state.resultsPerPage
					),
				],
				lastPosition: state.lastPosition + state.resultsPerPage,
			};
		case 'loadMorePosts':
			return {
				...state,
				isLoadingMoreData: action.payload.status,
			};
		default:
			throw new Error();
	}
}

export default function RecentThreads() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { allPostData, isLoading, isLoadingMoreData, resultsPerPage } = state;

	const emptyArray = new Array(8).fill(0);

	const { data, aData, error } = useReddit(
		{ type: 'all' },
		100,
		resultsPerPage
	);

	if (error) {
		showToast({
			errorName: 'Reddit Error',
			errorStatus: 'There was an error getting data from Reddit',
			errorId: 'redditError',
		});
		console.error('threads page (index) reddit error', error);
	}

	useEffect(() => {
		if (data && aData) {
			dispatch({
				type: 'getDataSuccess',
				payload: { filteredData: data, allPostData: aData },
			});
			dispatch({
				type: 'loadPosts',
			});
		}
	}, [data]);

	return (
		<>
			<Link href='/' replace>
				<div className='text-4xl font-semibold text-slate-100 my-5 flex py-3 cursor-pointer hover:bg-gray-700 rounded-xl justify-center'>
					<ChevronLeftIcon className='w-10 h-11' />
					<span>Recent Threads</span>
				</div>
			</Link>
			<div className='w-full py-3'>
				<ul
					role='list'
					className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
					{isLoading &&
						emptyArray.map((_, i) => <SkeletonCard key={i} />)}
				</ul>
				{!isLoading && (
					<InfiniteScroll
						dataLength={allPostData.length}
						next={() => {
							dispatch({
								type: 'loadMorePosts',
								payload: { status: true },
							});

							setTimeout(() => {
								dispatch({
									type: 'loadPosts',
								});
								dispatch({
									type: 'loadMorePosts',
									payload: { status: false },
								});
							}, 3000);
						}}
						hasMore='true'>
						<ul
							role='list'
							className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 p-1'>
							{allPostData.map((post) => (
								<Data
									post={post}
									key={post.data.title + post.data.created}
								/>
							))}

							{isLoadingMoreData &&
								emptyArray.map((_, i) => (
									<SkeletonCard key={i} />
								))}
						</ul>
					</InfiniteScroll>
				)}
			</div>
		</>
	);
}
