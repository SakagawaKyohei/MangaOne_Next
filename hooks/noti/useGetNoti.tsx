import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetWarning } from "@/queries/noti/GetNoti";

function useGetNoti(userid: string) {
  const client = useSupabase();
  const queryKey = ["warning" + userid];

  const queryFn = async () => {
    return GetWarning(client, userid).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn, staleTime: 0 });
}

export default useGetNoti;
