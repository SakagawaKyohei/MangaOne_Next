import { useMutation } from "@tanstack/react-query";

import { PlusView } from "@/queries/PlusView";
import { AddHistory } from "@/queries/History/AddHistory";
import useSupabase from "../useSupabase";
import { Noti } from "@/queries/noti/Noti";

function useNoti(userid: any, message: string, type: string, link: string) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await Noti(client, userid, message, type, link);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useNoti;
