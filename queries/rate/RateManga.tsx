import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function RateManga(
  client: TypeSupabaseClient,
  Userid: string,
  Mangaid: string,
  rate: any
) {
  return client
    .from("rate")
    .upsert({ user_id: Userid, manga_id: Mangaid, star: rate });
}
