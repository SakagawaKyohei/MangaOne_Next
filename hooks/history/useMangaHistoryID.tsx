import { useQuery } from "@tanstack/react-query";
import { GetChapter } from "@/queries/GetChapter/GetChapter";
import useSupabase from "../useSupabase";
import { MangaFollowIDQuery } from "@/queries/follow/MangaFollowIDQuery";
import { GetMangaTrans } from "@/queries/GetMangaInfo/GetMangaTrans";
import { MangaHistoryID } from "@/queries/History/MangaHistoryID";

function useMangaHistoryID(userid: any) {
  const client = useSupabase();
  const queryKey = ["History", userid];

  const queryFn = async () => {
    return MangaHistoryID(client, userid).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useMangaHistoryID;
