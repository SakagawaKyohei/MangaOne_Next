import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function SendMessage(
  client: TypeSupabaseClient,
  Userid: string,
  text: string
) {
  return client.from("message").insert({ user_id: Userid, text: text });
}
