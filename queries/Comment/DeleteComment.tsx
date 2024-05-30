import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function DeleteComment(client: TypeSupabaseClient, id: string) {
  return client.from("cmtmanga").delete().eq("id", id);
}
