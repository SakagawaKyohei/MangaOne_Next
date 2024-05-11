import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";
import { QueryMessage } from "@/queries/message/QueryMessage";
import { QueryCommentManga } from "@/queries/Comment/QueryCommentManga";

function useQueryCommentManga(page: number) {
  const client = useSupabase();
  const queryKey = ["comment" + page];

  const queryFn = async () => {
    return QueryCommentManga(client, page);
  };

  return useQuery({ queryKey, queryFn });
}

export default useQueryCommentManga;
