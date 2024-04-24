import { useMutation, useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { SendMail } from "@/queries/PasswordManagement/SendMail";

function useSendMail(mail: string) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await SendMail(client, mail);
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useSendMail;
