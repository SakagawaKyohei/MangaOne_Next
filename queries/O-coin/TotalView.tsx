import { TypeSupabaseClient } from "@/utils/supabase";

export function TotalView(
  client: TypeSupabaseClient,

  userid: any
) {
  return client.rpc(
    "totalview" as never,
    {
      userid: userid,
    } as any
  );
}
