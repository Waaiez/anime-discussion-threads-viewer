import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { RecentThreads, Search } from '../components';
import { useSearch } from '../context/SearchContext';

export default function HomePage() {
	const { isSearching } = useSearch();
	return (
		<>
			<Search />

			{!isSearching && (
				<>
					<Link href='/threads' replace passHref>
						<div className='flex justify-center py-3 my-5 text-4xl font-semibold cursor-pointer text-slate-100 hover:bg-gray-700 rounded-xl'>
							<span>Recent Threads</span>
							<div className='w-10 h-full'>
								<ChevronRightIcon />
							</div>
						</div>
					</Link>

					<RecentThreads />
				</>
			)}
		</>
	);
}
