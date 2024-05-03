import { GetMangaTop } from "@/queries/GetMangaTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginQuery } from "@/queries/AuthQuery/LoginQuery";
import { UpdateUserMetadataQuery } from "@/queries/UpdateUserMetadataQuery";
import useSupabase from "./useSupabase";
import { CreateMangaQuery } from "@/queries/CreateMangaQuery";
import { CreateChapter } from "@/queries/CreateChapter";
interface Chapter {
  ten: string;
  content: any[] | null;
  filelist: any[] | null;
  view: number;
  manga_id: any;
}

function useCreateChapter(chapter: Chapter, id: any) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await CreateChapter(client, { chapter }, id);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useCreateChapter;
