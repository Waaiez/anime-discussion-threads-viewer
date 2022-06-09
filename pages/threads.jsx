import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { Threads } from '../components';

export default function ThreadsPage() {
	return (
		<>
			<Link href='/' replace passHref>
				<div className='flex justify-center py-3 my-5 text-4xl font-semibold cursor-pointer text-slate-100 hover:bg-gray-700 rounded-xl'>
					<div className='w-10 h-full'>
						<ChevronLeftIcon />
					</div>
					<span>Recent Threads</span>
				</div>
			</Link>

			<Threads />
		</>
	);
}
