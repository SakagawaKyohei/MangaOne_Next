import { GetMangaTop } from "@/queries/GetMangaTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { LoginQuery } from "@/queries/AuthQuery/LoginQuery";
import { CreateUser } from "@/queries/CreateUser";
interface User {
  email: string;
  username: string;
  password: string;
}
function useLogin(user: User) {
  const client = useSupabase();

  const mutationFn = async () => {
    try {
      const result = await CreateUser(client, { user });
      return result.data;
    } catch (error) {
      throw error; // re-throw the error to be caught by the caller
    }
  };

  return useMutation({ mutationFn });
}

export default useLogin;
