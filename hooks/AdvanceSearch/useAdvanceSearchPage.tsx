import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { AdvanceSearchPage } from "@/queries/AdvanceSearch/AdvanceSearchPage";

function useAdvanceSearchPage(
  page: number,
  name: string,
  author: any,
  genre: any[]
) {
  const client = useSupabase();
  const queryKey = ["advanceSearchPage", page, name, author, genre];

  const queryFn = async () => {
    return AdvanceSearchPage(client, page, name, author, genre).then(
      (result) => result.data
    );
  };

  return useQuery({ queryKey, queryFn });
}

export default useAdvanceSearchPage;
