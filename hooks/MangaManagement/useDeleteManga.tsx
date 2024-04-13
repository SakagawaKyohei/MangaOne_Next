import { GetMangaTop } from "@/queries/GetMangaTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginQuery } from "@/queries/AuthQuery/LoginQuery";
import { UpdateUserMetadataQuery } from "@/queries/UpdateUserMetadataQuery";
import { CreateMangaQuery } from "@/queries/CreateMangaQuery";
import useSupabase from "../useSupabase";
import { DeleteManga } from "@/queries/MangaManagement/DeleteManga";
function useDeleteManga(id: string[]) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await DeleteManga(client, id);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useDeleteManga;
