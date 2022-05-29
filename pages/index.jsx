import { RecentThreads, Search } from '../components';
import { useSearch } from '../context/SearchContext';

export default function Home() {
	const { isSearching } = useSearch();
	return (
		<>
			{/* <Search /> */}
			{isSearching ? '' : <RecentThreads />}
		</>
	);
}
