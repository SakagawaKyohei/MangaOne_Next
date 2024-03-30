import { TypeSupabaseClient } from "@/utils/supabase";

export function UserQuery(client: TypeSupabaseClient) {
  return client.auth.getUser();
}
