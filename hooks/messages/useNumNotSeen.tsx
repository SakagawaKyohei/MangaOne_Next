import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";
import { QueryMessageBox } from "@/queries/messages/QueryMessageBox";
import { QueryMessage } from "@/queries/messages/QueryMessage";
import { NumNotSeen } from "@/queries/messages/NumNotSeen";

function useNumNotSeen(user: string) {
  const client = useSupabase();
  const queryKey = ["notseen" + user];

  const queryFn = async () => {
    return NumNotSeen(client, user).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useNumNotSeen;
