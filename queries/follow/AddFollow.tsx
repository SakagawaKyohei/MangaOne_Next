import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function AddFollow(
  client: TypeSupabaseClient,
  Userid: string,
  Mangaid: string
) {
  return client.from("favorite").upsert({ user_id: Userid, manga_id: Mangaid });
}
