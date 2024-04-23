import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function AddHistory(
  client: TypeSupabaseClient,
  Userid: string,
  Mangaid: string
) {
  return client.from("history").upsert({ user_id: Userid, manga_id: Mangaid });
}
