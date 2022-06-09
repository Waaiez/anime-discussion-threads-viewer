import React from 'react';

import SkeletonCard from './../SkeletonCard/index';

export default function SkeletonLoader({ limit, animation }) {
	const emptyArray = new Array(limit).fill(0);
	return (
		<ul className='grid grid-cols-2 p-1 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
			{emptyArray.map((_, i) => (
				<SkeletonCard key={i} animation={animation} />
			))}
		</ul>
	);
}
