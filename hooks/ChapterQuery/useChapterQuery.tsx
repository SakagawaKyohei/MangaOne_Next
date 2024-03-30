import { useQuery } from "@tanstack/react-query";
import { GetChapter } from "@/queries/GetChapter/GetChapter";
import useSupabase from "../useSupabase";

function useChapterQuery(mangaId: number) {
  const client = useSupabase();
  const queryKey = ["chapter", mangaId];

  const queryFn = async () => {
    return GetChapter(client, mangaId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useChapterQuery;
