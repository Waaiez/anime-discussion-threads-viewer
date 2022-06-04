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
			<Link href='/' replace passHref>
				<div className='flex justify-center py-3 my-5 text-4xl font-semibold cursor-pointer text-slate-100 hover:bg-gray-700 rounded-xl'>
					<ChevronLeftIcon className='w-10 h-11' />
					<span>Home</span>
				</div>
			</Link>

			<Data anilistData={anilistData} />
		</div>
	);
}
