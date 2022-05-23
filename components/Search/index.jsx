import { SearchIcon } from "@heroicons/react/solid";
import { useEffect, useReducer } from "react";
import { useDebounce } from "use-debounce";

import { useSearch } from "../../context/SearchContext";
import useAnilist from "../../hooks/useAnilist";
import mediaQuery from "../../lib/anilist-api/queries/media";
import showToast from "../../lib/showToast";
import SkeletonCard from "../SkeletonCard";
import Data from "./data";

const initialState = {
  searchQuery: "",
  isLoading: false,
  anilistData: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "updateSearchQuery":
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
      };
    case "updateValues":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "getAnilistData":
      return {
        ...state,
        anilistData: action.payload.anilistData,
      };
    default:
      throw new Error();
  }
}

export default function Search() {
  const { isSearching, setIsSearching } = useSearch();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchQuery, isLoading, anilistData } = state;

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const emptyArray = new Array(4).fill(0);

  const { data, error } = useAnilist(
    mediaQuery,
    {
      search: debouncedSearchQuery[0] || "",
    },
    [debouncedSearchQuery]
  );

  if (error) {
    showToast({
      errorName: "Anilist Error",
      errorStatus: `Status Code: ${error.response.status}`,
      errorId: "anilistError",
    });
  }

  useEffect(() => {
    if (data) {
      dispatch({
        type: "updateValues",
        payload: { key: "anilistData", value: data.Page.media },
      });
      dispatch({
        type: "updateValues",
        payload: { key: "isLoading", value: false },
      });
    }
  }, [data]);

  useEffect(() => {
    dispatch({
      type: "updateValues",
      payload: { key: "searchQuery", value: "" },
    });
    dispatch({
      type: "updateValues",
      payload: { key: "anilistData", value: null },
    });
  }, []);

  useEffect(() => {
    if (!searchQuery)
      dispatch({
        type: "updateValues",
        payload: { key: "anilistData", value: null },
      });

    let isSearchingLocal = isSearching;

    searchQuery.length === 0
      ? (setIsSearching(false), (isSearchingLocal = false))
      : (setIsSearching(true), (isSearchingLocal = true));

    !isSearchingLocal
      ? dispatch({
          type: "updateValues",
          payload: { key: "isLoading", value: false },
        })
      : dispatch({
          type: "updateValues",
          payload: { key: "isLoading", value: true },
        });
  }, [searchQuery]);

  return (
    <>
      <fieldset className="w-full space-y-1 text-slate-100 justify-center flex">
        <label htmlFor="Search" className="hidden">
          Search
        </label>
        <div className="relative h-14 lg:w-1/2 w-3/4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
            <SearchIcon className="w-5 h-5 text-slate-100" />
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            className="w-full h-full py-2 pl-10 text-base rounded-md sm:w-full text-slate-100 bg-transparent focus:text-white focus:border-blue-600 focus:outline-none border border-solid border-slate-600 transition ease-in-out"
            value={searchQuery}
            onChange={(e) => {
              e.persist();
              dispatch({
                type: "updateSearchQuery",
                payload: { searchQuery: e.target.value },
              });
            }}
            autoComplete="off"
          />
        </div>
      </fieldset>

      {searchQuery && (
        <>
          <div className="py-3"></div>
          <div className="text-4xl font-semibold text-slate-100 my-5 flex justify-center py-3">
            <span>Search Results</span>
          </div>
        </>
      )}
      <div className="w-full py-3">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {isLoading && emptyArray.map((_, i) => <SkeletonCard key={i} />)}
          {!isLoading &&
            anilistData?.map((item) => {
              return <Data key={item.title.romaji} data={item} />;
            })}
        </ul>
      </div>
    </>
  );
}
