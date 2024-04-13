import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function MangaFollowIDQuery(client: TypeSupabaseClient, userid: any) {
  return client.from("favorite").select("manga_id").eq("user_id", userid);
}
