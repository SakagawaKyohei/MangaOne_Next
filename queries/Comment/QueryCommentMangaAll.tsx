import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function QueryCommentMangaAll(client: TypeSupabaseClient) {
  return client.from("cmtmanga").select("*");
}
