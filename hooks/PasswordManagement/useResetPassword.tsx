import { GetMangaTop } from "@/queries/GetMangaTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginQuery } from "@/queries/AuthQuery/LoginQuery";
import { UpdateUserMetadataQuery } from "@/queries/UpdateUserMetadataQuery";
import { CreateMangaQuery } from "@/queries/CreateMangaQuery";
import useSupabase from "../useSupabase";
import { DeleteManga } from "@/queries/MangaManagement/DeleteManga";
import { ResetPassword } from "@/queries/PasswordManagement/ResetPassword";
function useResetPassword(password: string) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await ResetPassword(client, password);
      if (result.error) {
        throw new Error(result.error.message); // throw error if there is an error message
      }
      return result.data;
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useResetPassword;
