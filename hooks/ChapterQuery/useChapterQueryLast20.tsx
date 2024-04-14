import { useQuery } from "@tanstack/react-query";
import { GetChapter } from "@/queries/GetChapter/GetChapter";
import useSupabase from "../useSupabase";
import { GetChapterLast20 } from "@/queries/GetChapter/GetChapterLast20";

function useChapterQueryLast20(mangaId: string) {
  const client = useSupabase();
  const queryKey = ["chapterlast20", mangaId];

  const queryFn = async () => {
    return GetChapterLast20(client, mangaId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useChapterQueryLast20;
