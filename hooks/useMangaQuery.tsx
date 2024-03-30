import { GetMangaByID } from "@/queries/GetMangaByID";
import useSupabase from "./useSupabase";
import { useQuery } from "@tanstack/react-query";

function useOrganizationQuery(mangaId: number) {
  const client = useSupabase();
  const queryKey = ["manga", mangaId];

  const queryFn = async () => {
    return GetMangaByID(client, mangaId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useOrganizationQuery;
