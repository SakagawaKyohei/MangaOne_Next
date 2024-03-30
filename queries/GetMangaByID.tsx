import { TypeSupabaseClient } from "@/utils/supabase";

export function GetMangaByID(client: TypeSupabaseClient, MangaId: string) {
  return client
    .from("manga")
    .select("*")
    .eq("id", MangaId)
    .throwOnError()
    .single();
}
