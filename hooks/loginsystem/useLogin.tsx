import { GetMangaTop } from "@/queries/GetMangaTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { LoginQuery } from "@/queries/AuthQuery/LoginQuery";

function useMangaTopQuery({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await LoginQuery(client, { email, password });
      if (result.error) {
        throw new Error(result.error.message); // throw error if there is an error message
      }
      return result.data;
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useMangaTopQuery;
