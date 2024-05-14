import { TypeSupabaseClient } from "@/utils/supabase";

export function QueryMessage(
  client: TypeSupabaseClient,
  user1: string,
  user2: string
) {
  return client
    .from("messages")
    .select("*")
    .eq("user1", user1)
    .eq("user2", user2);
}
