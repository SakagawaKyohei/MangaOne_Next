import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function GetChapterLast(client: TypeSupabaseClient, mangaId: string) {
  let start = 0;
  let end = 2;
  return client
    .from("chapter")
    .select("*")
    .eq("manga_id", mangaId)
    .range(start, end)
    .order("created_at", { ascending: false });
}
