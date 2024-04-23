import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function GetChapterCID(client: TypeSupabaseClient, chapterId: number) {
  return client.from("chapter").select("*").eq("id", chapterId).single();
}
