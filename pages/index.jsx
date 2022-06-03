import { RecentThreads, Search } from '../components';
import { useSearch } from '../context/SearchContext';

export default function HomePage() {
	const { isSearching } = useSearch();
	return (
		<>
			{/* <Search /> */}
			{isSearching ? '' : <RecentThreads />}
		</>
	);
}
