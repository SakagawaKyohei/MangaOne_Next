import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetWarning } from "@/queries/noti/GetNoti";
import { TotalView } from "@/queries/O-coin/TotalView";
import { TotalWith } from "@/queries/O-coin/TotalWith";

function useTotalWith(userid: string) {
  const client = useSupabase();
  const queryKey = ["totalwith" + userid];

  const queryFn = async () => {
    return TotalWith(client, userid).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn, staleTime: 0 });
}

export default useTotalWith;
