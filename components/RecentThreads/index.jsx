import useReddit from '../../hooks/useReddit';
import showToast from '../../lib/showToast';
import DataThreadCard from './../DataThreadCard/index';
import SkeletonLoader from './../SkeletonLoader/index';

export default function RecentThreads() {
	const { data, isLoading, error } = useReddit();

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
			<ul className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
				{data.slice(0, 4).map((post) => (
					<DataThreadCard
						post={post}
						key={`${post.data.title}/${post.data.created}`}
					/>
				))}
			</ul>
		</div>
	);
}
