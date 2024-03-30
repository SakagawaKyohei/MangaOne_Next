import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function GetPageMangaList(client: TypeSupabaseClient, page: number) {
  return client
    .from("manga")
    .select("*")
    .range((page - 1) * 12, page * 12 - 1)
    .order("created_at", { ascending: false });
}
