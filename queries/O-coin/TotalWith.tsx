import { TypeSupabaseClient } from "@/utils/supabase";

export function TotalWith(
  client: TypeSupabaseClient,

  userid: any
) {
  return client.rpc(
    "totalwith" as never,
    {
      userid: userid,
    } as any
  );
}
