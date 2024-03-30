import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetPageMangaList } from "@/queries/GetMangaList/GetPageMangaList";

function usePageMangaQuery(page: number) {
  const client = useSupabase();
  const queryKey = ["mangapage", page];

  const queryFn = async () => {
    return GetPageMangaList(client, page).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default usePageMangaQuery;
