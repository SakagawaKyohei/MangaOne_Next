import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function IsFollow(
  client: TypeSupabaseClient,
  Mangaid: number,
  Userid: string
) {
  return client
    .from("favorite")
    .select("*")
    .eq("manga_id", Mangaid)
    .eq("user_id", Userid);
}
