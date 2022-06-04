import React, { useContext, useState } from 'react';

const SearchContext = React.createContext();

export function useSearch() {
	return useContext(SearchContext);
}

export function SearchProvider({ children }) {
	const [isSearching, setIsSearching] = useState(false);

	const value = {
		isSearching,
		setIsSearching,
	};

	return (
		<SearchContext.Provider value={value}>
			{children}
		</SearchContext.Provider>
	);
}
