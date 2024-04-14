import { useQuery } from "@tanstack/react-query";
import { GetChapter } from "@/queries/GetChapter/GetChapter";
import useSupabase from "../useSupabase";
import { IsFollow } from "@/queries/follow/IsFollow";

function useIsFollow(userid: any, mangaId: any) {
  const client = useSupabase();
  const queryKey = ["isFollow", mangaId];

  const queryFn = async () => {
    return IsFollow(client, mangaId, userid).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useIsFollow;
