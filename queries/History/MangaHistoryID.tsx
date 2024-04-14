import { TypeSupabaseClient } from "@/utils/supabase";

export function MangaHistoryID(client: TypeSupabaseClient, userid: string) {
  return client
    .from("history")
    .select("manga_id")
    .eq("user_id", userid)
    .order("created_at", { ascending: false });
}
