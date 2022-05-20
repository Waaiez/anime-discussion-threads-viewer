import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

import { Threads } from '../components';

export default function Home() {
	return (
		<>
			<Head>
				<title>Anime Discussion Threads</title>
				<link rel='icon' href='/favicon.png' />
			</Head>

			<ToastContainer autoClose={2000} />
			<div className='bg-gray-800 min-h-screen flex flex-col items-center justify-around select-none'>
				<div className='max-w-4xl mx-auto w-full px-8 md:px-20 2xl:max-w-7xl h-full justify-evenly flex flex-col'>
					<Threads />
				</div>
			</div>
		</>
	);
}
