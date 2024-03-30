import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function GetChapter(client: TypeSupabaseClient, mangaId: number) {
  return client
    .from("chapter")
    .select("*", { count: "exact" })
    .eq("manga_id", mangaId)
    .order("created_at", { ascending: false });
}
