import { useQuery } from "@tanstack/react-query";
import { GetViewManga } from "@/queries/GetMangaInfo/GetViewManga";
import useSupabase from "../useSupabase";

function useGetViewManga(mangaId: any) {
  const client = useSupabase();
  const queryKey = ["viewmanga", mangaId];

  const queryFn = async () => {
    return GetViewManga(client, mangaId);
  };

  return useQuery({ queryKey, queryFn });
}

export default useGetViewManga;
