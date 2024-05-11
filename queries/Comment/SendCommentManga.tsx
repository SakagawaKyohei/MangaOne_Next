import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function SendCommentManga(
  client: TypeSupabaseClient,
  Userid: string,
  Mangaid: string,
  text: string
) {
  return client
    .from("cmtmanga")
    .insert({ user_id: Userid, manga_id: Mangaid, detail: text });
}
