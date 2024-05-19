import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { QueryRate } from "@/queries/rate/QueryRate";

function useQueryRate(userid: string, mangaId: string) {
  const client = useSupabase();
  const queryKey = ["rate" + userid + mangaId, mangaId];

  const queryFn = async () => {
    return QueryRate(client, userid, mangaId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn, staleTime: 0 });
}

export default useQueryRate;
