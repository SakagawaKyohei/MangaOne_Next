import { TypeSupabaseClient } from "@/utils/supabase";

export function QueryUserInfo(client: TypeSupabaseClient, userid: string) {
  return client.rpc(
    "userinfo" as never,
    {
      userid: userid,
    } as any
  );
}
