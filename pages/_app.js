import 'react-toastify/dist/ReactToastify.css';

import '../styles/globals.css';

import Script from 'next/script';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Script src='/anitomyscript/anitomyscript.bundle.min.js' />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
