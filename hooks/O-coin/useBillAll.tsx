import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { BillAll } from "@/queries/O-coin/BillAll";

function useBillAll() {
  const client = useSupabase();
  const queryKey = ["billall"];

  const queryFn = async () => {
    return BillAll(client).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn, staleTime: 0 });
}

export default useBillAll;
