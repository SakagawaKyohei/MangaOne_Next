import { GetMangaByID } from "@/queries/GetMangaByID";
import { useMutation, useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";
import { QueryCommentManga } from "@/queries/Comment/QueryCommentManga";
import { QueryCommentMangaAll } from "@/queries/Comment/QueryCommentMangaAll";
import { EditCommentManga } from "@/queries/Comment/EditComment";

function useEditComment(id: any, userid: any, mangaid: any, text: string) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await EditCommentManga(client, id, userid, mangaid, text);
      if (result.error) {
        throw new Error(result.error.message); // throw error if there is an error message
      }
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useEditComment;
