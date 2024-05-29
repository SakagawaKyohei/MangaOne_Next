import { TypeSupabaseClient } from "@/utils/supabase";

export function GetUserList(client: TypeSupabaseClient) {
  return client.rpc("getuser" as never);
}
