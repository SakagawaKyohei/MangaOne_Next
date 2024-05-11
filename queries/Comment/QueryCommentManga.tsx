import { TypeSupabaseClient } from "@/utils/supabase";

export function QueryCommentManga(client: TypeSupabaseClient, page: number) {
  return client.rpc(
    "commentmanga2" as never,
    { start_index: (page - 1) * 10, end_index: page * 10 - 1 } as any
  );
}
