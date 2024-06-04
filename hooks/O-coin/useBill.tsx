import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { Bill } from "@/queries/O-coin/Bill";

function useBill(billid: string) {
  const client = useSupabase();
  const queryKey = ["bill1" + billid];

  const queryFn = async () => {
    return Bill(client, billid).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn, staleTime: 0 });
}

export default useBill;
