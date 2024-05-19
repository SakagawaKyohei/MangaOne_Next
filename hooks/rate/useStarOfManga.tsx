import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { QueryRate } from "@/queries/rate/QueryRate";
import { StarOfManga } from "@/queries/rate/StarOfManga";

function useStarOfManga(mangaId: any) {
  const client = useSupabase();
  const queryKey = ["Star" + mangaId, mangaId];

  const queryFn = async () => {
    return StarOfManga(client, mangaId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn, staleTime: 0 });
}

export default useStarOfManga;
