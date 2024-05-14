import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";
import { QueryCommentManga } from "@/queries/Comment/QueryCommentManga";
import { QueryCommentMangaAll } from "@/queries/Comment/QueryCommentMangaAll";

function useCommentMangaAll(mangaid: any) {
  const client = useSupabase();
  const queryKey = ["commentlist" + mangaid];

  const queryFn = async () => {
    return QueryCommentMangaAll(client, mangaid);
  };

  return useQuery({ queryKey, queryFn });
}

export default useCommentMangaAll;
