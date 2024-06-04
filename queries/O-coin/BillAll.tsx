import { TypeSupabaseClient } from "@/utils/supabase";

export function BillAll(client: TypeSupabaseClient) {
  return client.rpc("allbilll2" as never);
}
