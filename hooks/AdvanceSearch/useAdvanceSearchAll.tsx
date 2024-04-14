import { useQuery } from "@tanstack/react-query";
import { GetChapter } from "@/queries/GetChapter/GetChapter";
import useSupabase from "../useSupabase";
import { MangaFollowIDQuery } from "@/queries/follow/MangaFollowIDQuery";
import { AdvanceSearchAll } from "@/queries/AdvanceSearch/AdvanceSearchAll";

function useAdvanceSearchAll(
  page: number,
  name: string,
  author: any,
  genre: any[]
) {
  const client = useSupabase();
  const queryKey = ["advanceSearchAll", page, name, author, genre];

  const queryFn = async () => {
    return AdvanceSearchAll(client, page, name, author, genre).then(
      (result) => result.data
    );
  };

  return useQuery({ queryKey, queryFn });
}

export default useAdvanceSearchAll;
