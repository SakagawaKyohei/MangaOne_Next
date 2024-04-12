import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

interface User {
  avt: string;
  ten: string;
  ho: string;
  sdt: string;
  stk: string;
  coin: number;
}
export async function UpdateUserMetadataQuery(
  client: TypeSupabaseClient,
  {
    metadata,
  }: {
    metadata: User;
  }
) {
  const {
    data: { user },
  } = await client.auth.getUser();
  // const { data: user, isLoading, isError } = useUser();
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError || !user) {
  //   return <div>Error</div>;
  // }

  return client.auth.updateUser({
    data: {
      ...user?.user_metadata,
      ten: metadata.ten,
      ho: metadata.ho,
      sdt: metadata.sdt,
      stk: metadata.stk,
      coin: metadata.coin,
      avt: metadata.avt,
    },
  });
}
