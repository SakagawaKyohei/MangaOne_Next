import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function LoginQuery(
  client: TypeSupabaseClient,
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  }
) {
  return client.auth.signInWithPassword({
    email,
    password,
  });
}
