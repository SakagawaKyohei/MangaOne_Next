import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function QueryCommentMangaAll(client: TypeSupabaseClient, mangaid: any) {
  return client.from("cmtmanga").select("*").eq("manga_id", mangaid);
}
