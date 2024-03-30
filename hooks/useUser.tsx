import { GetMangaTop } from "@/queries/GetMangaTop";
import useSupabase from "./useSupabase";
import { useQuery } from "@tanstack/react-query";
import { UserQuery } from "@/queries/UserQuery";

function useUser() {
  const client = useSupabase();
  const queryKey = ["user"];

  const queryFn = async () => {
    return UserQuery(client).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useUser;
