import { useMutation } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { PlusView } from "@/queries/PlusView";

function useUpdateUserMetadata(chapterid: any, currentview: number) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await PlusView(client, chapterid, currentview);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useUpdateUserMetadata;
