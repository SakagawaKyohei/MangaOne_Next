import { useMutation } from "@tanstack/react-query";

import { PlusView } from "@/queries/PlusView";
import { AddHistory } from "@/queries/History/AddHistory";
import useSupabase from "../useSupabase";
import { SendCommentManga } from "@/queries/Comment/SendCommentManga";
import { SendMessage } from "@/queries/messages/SendMessage";
import { Seen } from "@/queries/messages/Seen";
import { RateManga } from "@/queries/rate/RateManga";

function useRateManga(user1: any, mangaid: any, rate: any) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await RateManga(client, user1, mangaid, rate);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useRateManga;
