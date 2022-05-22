import 'react-toastify/dist/ReactToastify.css';

import '../styles/globals.css';

import Script from 'next/script';

import { SearchProvider } from '../context/SearchContext';

function MyApp({ Component, pageProps }) {
	return (
		<SearchProvider>
			<Script src='/anitomyscript/anitomyscript.bundle.min.js' />
			<Component {...pageProps} />
		</SearchProvider>
	);
}

export default MyApp;
