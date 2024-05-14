import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";
import { QueryMessageBox } from "@/queries/messages/QueryMessageBox";
import { QueryMessage } from "@/queries/messages/QueryMessage";

function useQueryMessage(user1: string, user2: string) {
  const client = useSupabase();
  const queryKey = ["message" + user1 + user2];

  const queryFn = async () => {
    return QueryMessage(client, user1, user2).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useQueryMessage;
