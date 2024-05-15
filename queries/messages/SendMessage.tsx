import useQueryMessage from "@/hooks/messages/useQueryMessage";
import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function SendMessage(
  client: TypeSupabaseClient,
  user1: string,
  user2: string,
  text: string
) {
  let messages: any[] = [];
  const { data: data1, error } = await client
    .from("messages")
    .select("*")
    .eq("user1", user1)
    .eq("user2", user2);

  if (data1) {
    messages = data1[0]?.messages || []; // Sử dụng optional chaining và nullish coalescing operator
  }
  // Tiếp tục sử dụng messages như là một mảng...

  messages = [{ nguoigui: user1, text: text }, ...messages];
  const now: Date = new Date();

  const { data: data2, error: e2 } = await client.from("messages").upsert({
    messages: messages,
    user1: user2,
    user2: user1,
    update_at: now,
    seen: false,
  });

  return client
    .from("messages")
    .upsert({ messages: messages, user1: user1, user2: user2, update_at: now });
}
