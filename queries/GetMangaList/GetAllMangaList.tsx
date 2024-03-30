import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function GetAllMangaList(client: TypeSupabaseClient) {
  return client.from("manga").select("*");
}
