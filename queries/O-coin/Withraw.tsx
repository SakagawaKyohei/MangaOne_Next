import { TypeSupabaseClient } from "@/utils/supabase";

export async function Withraw(
  client: TypeSupabaseClient,
  userid: string,
  ocoin: number
) {
  return client.from("giaodich").upsert({ userid: userid, o_coin: ocoin });
}
