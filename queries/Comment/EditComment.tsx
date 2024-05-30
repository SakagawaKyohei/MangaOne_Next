import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function EditCommentManga(
  client: TypeSupabaseClient,
  id: string,
  Userid: string,
  Mangaid: string,
  text: string
) {
  return client
    .from("cmtmanga")
    .insert({ id: id, user_id: Userid, manga_id: Mangaid, detail: text });
}
