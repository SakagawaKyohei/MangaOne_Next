import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function OLoginQuery(client: TypeSupabaseClient) {
  return client.auth.signInWithOAuth({
    provider: "google",
  });
}
