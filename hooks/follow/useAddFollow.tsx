import { useMutation, useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { LogoutQuery } from "@/queries/AuthQuery/LogoutQuery";
import { AddFollow } from "@/queries/follow/AddFollow";

function useAddFollow(userid: any, mangaid: any) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await AddFollow(client, userid, mangaid);
      if (result.error) {
        throw new Error(result.error.message); // throw error if there is an error message
      }
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useAddFollow;
