import useSupabase from "@/hooks/useSupabase";
import { TypeSupabaseClient } from "@/utils/supabase";

export async function GetViewManga(client: TypeSupabaseClient, mangaId: any) {
  const { data, error } = await client
    .from("chapter")
    .select("view")
    .eq("manga_id", mangaId);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Manga not found");
  }

  let view = 0;
  data?.forEach((item: any) => {
    view += item.view || 0; // Accumulate view count, ensure item.view exists before adding
  });

  // Update the 'view' field of the 'manga' table in the database
  await client.from("manga").update({ view }).eq("id", mangaId);

  return view; // Return the accumulated view count
}
