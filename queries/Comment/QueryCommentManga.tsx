import { TypeSupabaseClient } from "@/utils/supabase";

export function QueryCommentManga(
  client: TypeSupabaseClient,
  page: number,
  manga_id: any
) {
  return client.rpc(
    "commentmanga6" as never,
    {
      start_index: (page - 1) * 10,
      end_index: page * 10 - 1,
      mid: manga_id,
    } as any
  );
}
