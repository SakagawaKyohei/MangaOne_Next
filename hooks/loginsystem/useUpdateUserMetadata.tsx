import { GetMangaTop } from "@/queries/GetMangaTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { LoginQuery } from "@/queries/AuthQuery/LoginQuery";
import { UpdateUserMetadataQuery } from "@/queries/UpdateUserMetadataQuery";
interface User {
  avt: string;
  ten: string;
  ho: string;
  sdt: string;
  stk: string;
  coin: number;
}

function useUpdateUserMetadata(metadata: User) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await UpdateUserMetadataQuery(client, { metadata });
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useUpdateUserMetadata;
