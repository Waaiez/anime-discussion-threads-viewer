import Head from 'next/head';

import { RecentThreads, Search, TrendingAnime } from '../components';

export default function Home() {
	return (
		<>
			<Head>
				<title>Anime Discussion Threads</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='bg-gray-800 min-h-screen flex flex-col items-center justify-around select-none'>
				<div className='max-w-4xl mx-auto w-full px-20 2xl:max-w-7xl h-full justify-evenly flex flex-col'>
					<Search />
					<RecentThreads />
					<TrendingAnime />
				</div>
			</div>
		</>
	);
}
