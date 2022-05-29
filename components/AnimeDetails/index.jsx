import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import useAnilist from '../../hooks/useAnilist';
import mediaQuery from '../../lib/anilist-api/queries/media';
import showToast from '../../lib/showToast';
import Data from './data';

export default function AnimeDetails({ id }) {
	const [anilistData, setAnilistData] = useState(null);

	const { data, error } = useAnilist(mediaQuery, {
		id: id,
		sort: 'TRENDING_DESC',
	});

	if (error) {
		showToast({
			errorName: 'Anilist Error',
			errorStatus: `Status Code: ${error.response.status}`,
			errorId: 'anilistError',
		});
	}

	useEffect(() => {
		if (data) {
			setAnilistData(data.Page.media[0]);
		}
	}, [data]);

	return (
		<div className='container px-6 mx-auto'>
			<Link href='/' replace>
				<div className='text-4xl font-semibold text-slate-100 my-5 flex justify-center cursor-pointer hover:bg-gray-700 rounded-xl py-3'>
					<ChevronLeftIcon className='w-10 h-11' />
					<span>Home</span>
				</div>
			</Link>

			<Data anilistData={anilistData} />
		</div>
	);
}
