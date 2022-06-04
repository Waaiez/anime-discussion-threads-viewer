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
			<div className='flex flex-col items-center justify-around min-h-screen bg-gray-800 select-none'>
				<div className='flex flex-col w-full h-full max-w-4xl p-8 mx-auto md:px-20 2xl:max-w-7xl justify-evenly'>
					<Component {...pageProps} />
				</div>
			</div>
		</SearchProvider>
	);
}

export default MyApp;
