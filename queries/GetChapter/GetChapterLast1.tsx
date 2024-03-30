import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function GetChapterLast1(client: TypeSupabaseClient, mangaId: number) {
  return client
    .from("chapter")
    .select("*")
    .eq("manga_id", mangaId)
    .range(0, 0)
    .order("created_at", { ascending: false });
}
