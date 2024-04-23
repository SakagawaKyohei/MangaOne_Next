import { useMutation } from "@tanstack/react-query";

import { PlusView } from "@/queries/PlusView";
import useSupabase from "../useSupabase";
import { AddHistory } from "@/queries/History/AddHistory";

function useUpdateUserMetadata(userid: any, mangaid: string) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await AddHistory(client, userid, mangaid);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useUpdateUserMetadata;
