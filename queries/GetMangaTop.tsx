import { TypeSupabaseClient } from "@/utils/supabase";

export function GetMangaTop(client: TypeSupabaseClient) {
  return client.from("manga").select("*").order("view", { ascending: false });
}
