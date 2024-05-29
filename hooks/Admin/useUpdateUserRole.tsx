import { useMutation, useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { AddFollow } from "@/queries/follow/AddFollow";
import { UpdateUserRole } from "@/queries/Admin/UpdateUserRole";

function useUpdateUserRole(role: string, userid: any) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await UpdateUserRole(client, role, userid);
      if (result.error) {
        throw new Error(result.error.message); // throw error if there is an error message
      }
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useUpdateUserRole;
