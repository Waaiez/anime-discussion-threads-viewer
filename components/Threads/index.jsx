import { useEffect, useReducer } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import showToast from './../../lib/showToast';
import useReddit from '../../hooks/useReddit';
import DataThreadCard from './../DataThreadCard/index';
import SkeletonLoader from '../SkeletonLoader';

const initialState = {
	redditData: [],
	slicedData: [],
	isLoadingMoreData: false,
	resultsPerPage: 12,
	lastPosition: 12,
};

function reducer(state, action) {
	switch (action.type) {
		case 'getDataSuccess':
			return {
				...state,
				redditData: action.payload.redditData,
				slicedData: action.payload.slicedData,
			};
		case 'loadPosts':
			return {
				...state,
				slicedData: [
					...state.slicedData,
					...state.redditData.slice(
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
	const { slicedData, isLoadingMoreData, resultsPerPage } = state;

	const { data, isLoading, error } = useReddit();

	useEffect(() => {
		if (data) {
			dispatch({
				type: 'getDataSuccess',
				payload: {
					redditData: data,
					slicedData: data.slice(0, resultsPerPage),
				},
			});
			dispatch({
				type: 'loadPosts',
			});
		}
	}, [data]);

	if (isLoading) return <SkeletonLoader limit={4} animation='pulse' />;

	if (error) {
		showToast({
			errorName: 'Reddit Error',
			errorStatus: 'There was an error getting data from Reddit',
			errorId: 'redditError',
		});

		return (
			<div className='opacity-30'>
				<SkeletonLoader limit={4} animation='none' />
			</div>
		);
	}

	return (
		<div className='w-full py-3'>
			{
				<InfiniteScroll
					dataLength={slicedData.length}
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
					hasMore>
					<ul className='grid grid-cols-2 p-1 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
						{slicedData.map((post) => (
							<li key={`${post.data.title}/${post.data.created}`}>
								<DataThreadCard post={post} />
							</li>
						))}
					</ul>

					{isLoadingMoreData && (
						<SkeletonLoader limit={8} animation='pulse' />
					)}
				</InfiniteScroll>
			}
		</div>
	);
}
