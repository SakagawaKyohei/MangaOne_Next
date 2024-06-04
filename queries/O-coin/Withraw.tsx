import { TypeSupabaseClient } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
export async function Withraw(
  client: TypeSupabaseClient,

  userid: string,
  ocoin: number,
  id: any
) {
  return client
    .from("giaodich")
    .upsert({ userid: userid, o_coin: ocoin, id: id });
}
