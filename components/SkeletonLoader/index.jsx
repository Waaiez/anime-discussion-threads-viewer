import React from 'react';

import SkeletonCard from './../SkeletonCard/index';

export default function SkeletonLoader({ limit }) {
	const emptyArray = new Array(limit).fill(0);
	return (
		<ul className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 p-1'>
			{emptyArray.map((_, i) => (
				<SkeletonCard key={i} />
			))}
		</ul>
	);
}
