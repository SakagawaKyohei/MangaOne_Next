import { useQuery } from "@tanstack/react-query";
import { GetChapter } from "@/queries/GetChapter/GetChapter";
import useSupabase from "../useSupabase";
import { GetUserList } from "@/queries/Admin/GetUserList";

function useGetUserList() {
  const client = useSupabase();
  const queryKey = ["Banned"];

  const queryFn = async () => {
    return GetUserList(client).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useGetUserList;
