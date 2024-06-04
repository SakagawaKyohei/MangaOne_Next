import { TypeSupabaseClient } from "@/utils/supabase";

export function Bill(
  client: TypeSupabaseClient,

  billid: any
) {
  return client.rpc(
    "bill2" as never,
    {
      gdid: billid,
    } as any
  );
}
