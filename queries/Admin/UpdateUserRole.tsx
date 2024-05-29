import { TypeSupabaseClient } from "@/utils/supabase";

export function UpdateUserRole(
  client: TypeSupabaseClient,
  newrole:string,
  user_idd:any
) {
  return client.rpc(
    "testrole" as never,
    {
      newrole:newrole,
      user_idd:user_idd
    } as any
  );
}
