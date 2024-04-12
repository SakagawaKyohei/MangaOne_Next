import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function LogoutQuery(client: TypeSupabaseClient) {
  return client.auth.signOut();
}
