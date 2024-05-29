import { TypeSupabaseClient } from "@/utils/supabase";

export function GetWarning(client: TypeSupabaseClient, userid: string) {
  return client.from("noti").select("*").eq("userid", userid);
}
