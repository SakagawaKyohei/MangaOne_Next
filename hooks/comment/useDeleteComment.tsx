import { useMutation } from "@tanstack/react-query";
import { DeleteFollow } from "@/queries/follow/DeleteFollow";
import useSupabase from "@/hooks/useSupabase";
import { DeleteComment } from "@/queries/Comment/DeleteComment";

function useDeleteComment(id: any) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await DeleteComment(client, id);
      if (result.error) {
        throw new Error(result.error.message); // throw error if there is an error message
      }
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useDeleteComment;
