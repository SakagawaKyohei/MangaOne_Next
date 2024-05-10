import { TypeSupabaseClient } from "@/utils/supabase";

export function QueryMessage(client: TypeSupabaseClient) {
  return client.from("message").select("*");
}
