import { useMutation, useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { OLoginQuery } from "@/queries/AuthQuery/OLoginQuery";

function useOLogin() {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await OLoginQuery(client);
      if (result.error) {
        console.log("a");
        throw new Error(result.error.message); // throw error if there is an error message
      }
      return result.data;
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useOLogin;
