import { useQuery } from "@tanstack/react-query";
import { GetChapter } from "@/queries/GetChapter/GetChapter";
import useSupabase from "../useSupabase";
import { GetChapterLast } from "@/queries/GetChapter/GetChapterLast";

function useChapterQueryLast(mangaId: any) {
  const client = useSupabase();
  const queryKey = ["chapterlast", mangaId];

  const queryFn = async () => {
    return GetChapterLast(client, mangaId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useChapterQueryLast;
