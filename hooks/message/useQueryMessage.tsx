import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";
import { QueryMessage } from "@/queries/message/QueryMessage";

function useQueryMessage() {
  const client = useSupabase();
  const queryKey = ["messagek"];

  const queryFn = async () => {
    return QueryMessage(client).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useQueryMessage;
