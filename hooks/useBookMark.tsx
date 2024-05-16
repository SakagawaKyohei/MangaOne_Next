import { useMutation } from "@tanstack/react-query";

import { PlusView } from "@/queries/PlusView";
import { AddHistory } from "@/queries/History/AddHistory";
import { SendCommentManga } from "@/queries/Comment/SendCommentManga";
import { SendMessage } from "@/queries/messages/SendMessage";
import { Seen } from "@/queries/messages/Seen";
import { BookMark } from "@/queries/BookMark";
import useSupabase from "./useSupabase";

function useBookMark(chapterid: any, userid: any) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await BookMark(client, chapterid, userid);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useBookMark;
