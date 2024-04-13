import { GetMangaTop } from "@/queries/GetMangaTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginQuery } from "@/queries/AuthQuery/LoginQuery";
import { UpdateUserMetadataQuery } from "@/queries/UpdateUserMetadataQuery";
import useSupabase from "./useSupabase";
import { CreateMangaQuery } from "@/queries/CreateMangaQuery";
interface Manga {
  ten: string;
  tenkhac: string;
  theloai: string[];
  detail: string;
  tacgia: string;
  biatruyen: any;
}

function useCreateManga(manga: Manga, uid: any, id: any) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await CreateMangaQuery(client, { manga }, uid, id);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useCreateManga;
