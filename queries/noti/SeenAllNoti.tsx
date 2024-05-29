import { TypeSupabaseClient } from "@/utils/supabase";

export async function SeenAllNoti(client: TypeSupabaseClient, userid: any) {
  return client.rpc(
    "seennoti1" as never,
    {
      p_user_id: userid,
    } as any
  );
}
