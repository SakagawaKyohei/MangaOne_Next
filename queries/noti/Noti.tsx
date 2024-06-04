import useQueryMessage from "@/hooks/messages/useQueryMessage";
import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function Noti(
  client: TypeSupabaseClient,
  userid: any,
  message: string,
  type: string,
  link: string
) {
  return client
    .from("noti")
    .upsert({ userid: userid, message: message, type: type, link: link });
}
