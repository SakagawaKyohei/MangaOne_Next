import useQueryMessage from "@/hooks/messages/useQueryMessage";
import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function Seen(
  client: TypeSupabaseClient,
  user1: string,
  user2: string
) {
  return client
    .from("messages")
    .upsert({ user1: user1, user2: user2, seen: true });
}
