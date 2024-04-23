import { useQuery } from "@tanstack/react-query";
import { GetChapter } from "@/queries/GetChapter/GetChapter";
import useSupabase from "../useSupabase";
import { GetChapterCID } from "@/queries/GetChapter/GetChapterCID";

function useChapterQueryCID(ChapterID: any) {
  const client = useSupabase();
  const queryKey = ["chapter", ChapterID];

  const queryFn = async () => {
    return GetChapterCID(client, ChapterID).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useChapterQueryCID;
