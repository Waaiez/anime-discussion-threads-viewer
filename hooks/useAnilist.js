import { request } from "graphql-request";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (query, variables) => {
  return request("https://graphql.anilist.co", query, variables);
};

export default function useAnilist(query, variables, deps = []) {
  const [mounted, setMounted] = useState(false);

  const { data, isPrev, error } = useSWR(
    mounted && variables && [query, variables],
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    setMounted(true);
  }, [deps]);

  return { data, isPrev, error };
}
