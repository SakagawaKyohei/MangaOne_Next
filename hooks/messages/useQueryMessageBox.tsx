import { GetMangaByID } from "@/queries/GetMangaByID";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { GetAllMangaList } from "@/queries/GetMangaList/GetAllMangaList";
import { QueryMessageBox } from "@/queries/messages/QueryMessageBox";

function useQueryMessageBox(userid: string) {
  const client = useSupabase();
  const queryKey = ["messagebox"];

  const queryFn = async () => {
    return QueryMessageBox(client, userid).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useQueryMessageBox;
