import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function Chuyentien(client: TypeSupabaseClient, gdid: string) {
  const now = new Date();
  return client
    .from("giaodich")
    .upsert({ id: gdid, done: true, ngaynhan: now });
}
