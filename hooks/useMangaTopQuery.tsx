import { GetMangaTop } from "@/queries/GetMangaTop";
import useSupabase from "./useSupabase";
import { useQuery } from "@tanstack/react-query";

function useMangaTopQuery() {
  const client = useSupabase();
  const queryKey = ["mangatop"];

  const queryFn = async () => {
    return GetMangaTop(client).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useMangaTopQuery;
