import { TypeSupabaseClient } from "@/utils/supabase";

export function TotalWith(
  client: TypeSupabaseClient,

  userid: any
) {
  return client.rpc(
    "totalwith2" as never,
    {
      input_userid: userid,
    } as any
  );
}
