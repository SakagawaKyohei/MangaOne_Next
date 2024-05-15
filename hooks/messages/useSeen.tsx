import { useMutation } from "@tanstack/react-query";

import { PlusView } from "@/queries/PlusView";
import { AddHistory } from "@/queries/History/AddHistory";
import useSupabase from "../useSupabase";
import { SendCommentManga } from "@/queries/Comment/SendCommentManga";
import { SendMessage } from "@/queries/messages/SendMessage";
import { Seen } from "@/queries/messages/Seen";

function useSeen(user1: any, user2: any) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await Seen(client, user1, user2);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useSeen;
