import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetWarning } from "@/queries/noti/GetNoti";
import { TotalView } from "@/queries/O-coin/TotalView";

function useTotalView(userid: string) {
  const client = useSupabase();
  const queryKey = ["totalview" + userid];

  const queryFn = async () => {
    return TotalView(client, userid).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn, staleTime: 0 });
}

export default useTotalView;
