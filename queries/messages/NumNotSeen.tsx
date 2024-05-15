import { TypeSupabaseClient } from "@/utils/supabase";

export function NumNotSeen(client: TypeSupabaseClient, userid: string) {
  return client
    .from("messages")
    .select("*")
    .eq("user1", userid)
    .eq("seen", false);
}
