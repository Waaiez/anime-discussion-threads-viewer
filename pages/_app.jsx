import 'react-toastify/dist/ReactToastify.css';

import '../styles/globals.css';

import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';

import { SearchProvider } from '../context/SearchContext';

function MyApp({ Component, pageProps }) {
	return (
		<SearchProvider>
			<Head>
				<title>Anime Discussion Threads</title>
				<link rel='icon' href='/favicon.png' />
			</Head>

			<ToastContainer autoClose={2000} />
			<Script src='/anitomyscript/anitomyscript.bundle.min.js' />
			<div className='bg-gray-800 min-h-screen flex flex-col items-center justify-around select-none'>
				<div className='max-w-4xl mx-auto w-full p-8 md:px-20 2xl:max-w-7xl h-full justify-evenly flex flex-col'>
					<Component {...pageProps} />
				</div>
			</div>
		</SearchProvider>
	);
}

export default MyApp;
