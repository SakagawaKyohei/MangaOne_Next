import { useMutation } from "@tanstack/react-query";

import { PlusView } from "@/queries/PlusView";
import { AddHistory } from "@/queries/History/AddHistory";
import { SendMessage } from "@/queries/message/SendMessage";
import useSupabase from "../useSupabase";

function useSendMessage(userid: any, text: string) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await SendMessage(client, userid, text);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useSendMessage;
