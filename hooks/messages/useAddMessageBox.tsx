import { useMutation } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { AddHistory } from "@/queries/History/AddHistory";
import { AddMessageBox } from "@/queries/messages/AddMessageBox";

function useAddMessageBox(user1: string, user2: string) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await AddMessageBox(client, user1, user2);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useAddMessageBox;
