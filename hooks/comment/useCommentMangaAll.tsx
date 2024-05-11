import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";
import { QueryMessage } from "@/queries/message/QueryMessage";
import { QueryCommentManga } from "@/queries/Comment/QueryCommentManga";
import { QueryCommentMangaAll } from "@/queries/Comment/QueryCommentMangaAll";

function useCommentMangaAll() {
  const client = useSupabase();
  const queryKey = ["commentlist"];

  const queryFn = async () => {
    return QueryCommentMangaAll(client);
  };

  return useQuery({ queryKey, queryFn });
}

export default useCommentMangaAll;
