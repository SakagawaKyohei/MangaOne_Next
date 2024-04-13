import { useQuery } from "@tanstack/react-query";
import { GetChapter } from "@/queries/GetChapter/GetChapter";
import useSupabase from "../useSupabase";
import { MangaFollowIDQuery } from "@/queries/follow/MangaFollowIDQuery";

function useMangaFollowID(userid: any) {
  const client = useSupabase();
  const queryKey = ["follow", userid];

  const queryFn = async () => {
    return MangaFollowIDQuery(client, userid).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useMangaFollowID;
