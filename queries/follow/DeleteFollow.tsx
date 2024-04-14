import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function DeleteFollow(
  client: TypeSupabaseClient,
  Userid: string,
  Mangaid: string
) {
  return client
    .from("favorite")
    .delete()
    .eq("manga_id", Mangaid)
    .eq("user_id", Userid);
}
