export default function SkeletonCard() {
	return (
		<div className='relative animate-pulse cursor-auto'>
			<div className='h-48 rounded-lg dark:bg-gray-700 aspect-w-2 aspect-h-3'></div>
			<div className='flex-1 mt-2 space-y-1'>
				<div className='w-3/4 h-3 rounded dark:bg-gray-700'></div>
				<div className='w-2/4 h-3 rounded dark:bg-gray-700'></div>
				<div className='w-1/4 h-3 rounded dark:bg-gray-700'></div>
			</div>
		</div>
	);
}
