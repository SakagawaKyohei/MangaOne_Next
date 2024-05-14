import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";
import { QueryMessageBox } from "@/queries/messages/QueryMessageBox";
import { QueryUserInfo } from "@/queries/messages/QueryUserInfo";

function useQueryUserInfo(userid: string) {
  const client = useSupabase();
  const queryKey = ["UserInfo" + userid];

  const queryFn = async () => {
    return QueryUserInfo(client, userid).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useQueryUserInfo;
