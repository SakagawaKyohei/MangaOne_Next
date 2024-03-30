import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function GetMostViewMangaList(client: TypeSupabaseClient, page: number) {
  return client
    .from("manga")
    .select("*")
    .range((page - 1) * 12, page * 12 - 1)
    .order("view", { ascending: false });
}
