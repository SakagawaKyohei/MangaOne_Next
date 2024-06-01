import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";
import { QueryCommentManga } from "@/queries/Comment/QueryCommentManga";

function useQueryCommentManga(page: number, mangaid: any) {
  const client = useSupabase();
  const queryKey = ["comment6" + page];

  const queryFn = async () => {
    return QueryCommentManga(client, page, mangaid);
  };

  return useQuery({ queryKey, queryFn });
}

export default useQueryCommentManga;
