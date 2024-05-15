import { TypeSupabaseClient } from "@/utils/supabase";

export function QueryMessageBox(client: TypeSupabaseClient, userid: string) {
  return client
    .from("messages")
    .select("*")
    .eq("user1", userid)
    .order("update_at", { ascending: false });
}
