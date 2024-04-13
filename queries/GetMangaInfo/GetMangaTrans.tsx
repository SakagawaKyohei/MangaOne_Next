import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function GetMangaTrans(client: TypeSupabaseClient, userId: number) {
  return client
    .from("manga")
    .select("*", { count: "exact" })
    .eq("nguoi_dang", userId);
}
