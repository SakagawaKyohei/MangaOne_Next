import { TypeSupabaseClient } from "@/utils/supabase";

export function QueryRate(
  client: TypeSupabaseClient,
  userid: string,
  mangaid: string
) {
  return client
    .from("rate")
    .select("star")
    .eq("user_id", userid)
    .eq("manga_id", mangaid);
}
