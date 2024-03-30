import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";

function useMangaListQuery() {
  const client = useSupabase();
  const queryKey = ["mangalist"];

  const queryFn = async () => {
    return GetAllMangaList(client).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useMangaListQuery;
