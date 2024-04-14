import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export function AdvanceSearchAll(
  client: TypeSupabaseClient,
  page: number,
  name: string,
  author: any,
  genre: any[]
) {
  if (name == "null") {
    name = "";
  }
  if (author == "null") {
    author = "";
  }
  if (genre[0] == "null") {
    genre = [];
  }
  return client
    .from("manga")
    .select("*")
    .ilike("name", `%${name}%`)
    .ilike("author", `%${author}%`)
    .contains("genre", genre)
    .order("created_at", { ascending: false });
}
