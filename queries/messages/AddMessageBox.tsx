import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function AddMessageBox(
  client: TypeSupabaseClient,
  User1: string,
  User2: string
) {
  const { data: data1, error } = await client.rpc(
    "userinfo" as never,
    {
      userid: User2,
    } as any
  );
  const { data: data2, error: e2 } = await client.rpc(
    "userinfo" as never,
    {
      userid: User1,
    } as any
  );
  if (error) {
    throw new Error();
  }
  const {} = await client
    .from("messages")
    .upsert({ user1: User2, user2: User1, user2info: data2 });
  return client
    .from("messages")
    .upsert({ user1: User1, user2: User2, user2info: data1 });
}
