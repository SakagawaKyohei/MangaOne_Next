import { TypeSupabaseClient } from "@/utils/supabase";

export function GetMangaByID(client: TypeSupabaseClient, MangaId: number) {
  return client
    .from("manga")
    .select(
      `
        id,
        name
      `
    )
    .eq("id", MangaId)
    .throwOnError()
    .single();
}
