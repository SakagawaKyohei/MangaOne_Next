import { TypeSupabaseClient } from "@/utils/supabase";
import { readFile } from "fs/promises";

export async function BookMark(
  client: TypeSupabaseClient,
  chapterid: string,
  userid: string
) {
  let reader: any[] = [];
  const { data: data1, error } = await client
    .from("chapter")
    .select("*")
    .eq("id", chapterid);

  if (data1) {
    reader = data1[0]?.reader || []; // Sử dụng optional chaining và nullish coalescing operator
  }
  // Tiếp tục sử dụng messages như là một mảng...hhh

  reader = [userid, ...reader];
  return client.from("chapter").upsert({ id: chapterid, reader: reader });
}
