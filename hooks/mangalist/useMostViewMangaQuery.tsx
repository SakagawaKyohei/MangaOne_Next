import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetMostViewMangaList } from "@/queries/GetMangaList/GetMostViewMangaList";

function useMostViewMangaQuery(page: number) {
  const client = useSupabase();
  const queryKey = ["mangamost", page];

  const queryFn = async () => {
    return GetMostViewMangaList(client, page).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useMostViewMangaQuery;
