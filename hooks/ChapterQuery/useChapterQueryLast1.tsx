import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetChapterLast1 } from "@/queries/GetChapter/GetChapterLast1";

function useChapterQueryLast1(mangaId: any) {
  const client = useSupabase();
  const queryKey = ["chapterlast1", mangaId];

  const queryFn = async () => {
    return GetChapterLast1(client, mangaId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useChapterQueryLast1;
