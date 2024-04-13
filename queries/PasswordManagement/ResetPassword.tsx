import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function ResetPassword(client: TypeSupabaseClient, newPass: string) {
  return client.auth.updateUser({ password: newPass });
}
