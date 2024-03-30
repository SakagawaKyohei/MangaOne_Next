import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function GetChapterLast20(client: TypeSupabaseClient, mangaId: number) {
  let start20 = 0;
  let end20 = 19;
  return client
    .from("chapter")
    .select("*")
    .eq("manga_id", mangaId)
    .range(start20, end20)
    .order("created_at", { ascending: false });
}
