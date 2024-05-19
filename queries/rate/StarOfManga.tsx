import { TypeSupabaseClient } from "@/utils/supabase";

export function StarOfManga(
  client: TypeSupabaseClient,

  mangaid: any
) {
  return client.rpc(
    "avgrate1" as never,
    {
      mangaid: mangaid,
    } as any
  );
}
