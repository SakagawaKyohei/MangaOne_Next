import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";
import { QueryMessageBox } from "@/queries/messages/QueryMessageBox";
import { QueryMessage } from "@/queries/messages/QueryMessage";
import { NumNotSeen } from "@/queries/messages/NumNotSeen";
import { NumNotiNotSeen } from "@/queries/noti/NumNotiNotSeen";

function useNumNotiNotSeen(user: string) {
  const client = useSupabase();
  const queryKey = ["Notinotseen" + user];

  const queryFn = async () => {
    return NumNotiNotSeen(client, user).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn, staleTime: 0 });
}

export default useNumNotiNotSeen;
