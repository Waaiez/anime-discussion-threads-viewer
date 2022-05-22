import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

import { RecentThreads, Search } from '../components';
import { useSearch } from '../context/SearchContext';

export default function Home() {
	const { isSearching } = useSearch();
	return (
		<>
			<Head>
				<title>Anime Discussion Threads</title>
				<link rel='icon' href='/favicon.png' />
			</Head>

			<ToastContainer autoClose={2000} />
			<div className='bg-gray-800 min-h-screen flex flex-col items-center justify-around select-none'>
				<div className='max-w-4xl mx-auto w-full p-8 md:px-20 2xl:max-w-7xl h-full justify-evenly flex flex-col'>
					<Search />
					{isSearching ? '' : <RecentThreads />}
				</div>
			</div>
		</>
	);
}
