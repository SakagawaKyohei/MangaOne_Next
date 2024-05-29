import { TypeSupabaseClient } from "@/utils/supabase";

export function NumNotiNotSeen(client: TypeSupabaseClient, userid: string) {
  return client.from("noti").select("*").eq("userid", userid).eq("seen", false);
}
