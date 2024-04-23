import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function PlusView(
  client: TypeSupabaseClient,
  chapterid: any,
  currentview: number
) {
  return client
    .from("chapter")
    .update({ view: currentview + 1 })
    .eq("id", chapterid);
}
