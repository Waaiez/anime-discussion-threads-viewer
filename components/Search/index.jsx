import { SearchIcon } from '@heroicons/react/solid';
import { useEffect, useRef, useState } from 'react';

import { useSearch } from '../../context/SearchContext';
import media from '../../lib/anilist-api/queries/media';
import showToast from '../../lib/showToast';
import SkeletonCard from '../SkeletonCard';
import Data from './data';

const debounce = (fn, delay) => {
	let timerId;
	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(fn, delay, [...args]);
	};
};

export default function Search() {
	const { isSearching, setIsSearching } = useSearch();

	const prevSearchQuery = useRef();

	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [anilistData, setAnilistData] = useState(null);

	const emptyArray = new Array(4).fill(0);

	async function search(query) {
		const data = await media({
			search: query,
		});

		data.error
			? showToast(
					'Anilist Error',
					`Status Code: ${data.error.response.status}`,
					'anilistError'
			  )
			: setAnilistData(data.Page.media[0]);
		setIsLoading(false);
	}

	useEffect(() => {
		setSearchQuery('');
		setAnilistData(null);
	}, []);

	useEffect(() => {
		let isSearchingLocal = isSearching;

		searchQuery.length === 0
			? (setIsSearching(false), (isSearchingLocal = false))
			: (setIsSearching(true), (isSearchingLocal = true));

		!isSearchingLocal ? setIsLoading(false) : setIsLoading(true);

		if (prevSearchQuery.current !== searchQuery) {
			if (anilistData) {
				setAnilistData(null);
			}

			const fetchData = debounce(() => {
				search(searchQuery);
			}, 1000);
			searchQuery.length !== 0 && fetchData(searchQuery);
		}
	}, [searchQuery]);

	return (
		<>
			<fieldset className='w-full space-y-1 text-slate-100 justify-center flex'>
				<label htmlFor='Search' className='hidden'>
					Search
				</label>
				<div className='relative h-14 lg:w-1/2 w-3/4'>
					<span className='absolute inset-y-0 left-0 flex items-center pl-2 '>
						<SearchIcon className='w-5 h-5 text-slate-100' />
					</span>
					<input
						type='search'
						name='Search'
						placeholder='Search...'
						className='w-full h-full py-2 pl-10 text-base rounded-md sm:w-full text-slate-100 bg-transparent focus:text-white focus:border-blue-600 focus:outline-none border border-solid border-slate-600 transition ease-in-out'
						value={searchQuery}
						onChange={(e) => {
							e.persist();
							prevSearchQuery.current = searchQuery;
							setSearchQuery(e.target.value);
						}}
					/>
				</div>
			</fieldset>

			{searchQuery && (
				<div className='text-4xl font-semibold text-slate-100 my-5 flex justify-center py-3'>
					<span>Search Results</span>
				</div>
			)}
			<div className='w-full py-3'>
				<ul
					role='list'
					className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
					{isLoading &&
						emptyArray.map((_, i) => <SkeletonCard key={i} />)}

					{!isLoading &&
						anilistData &&
						anilistData.map((item) => {
							return <Data key={item.title.romaji} data={item} />;
						})}
				</ul>
			</div>
		</>
	);
}
