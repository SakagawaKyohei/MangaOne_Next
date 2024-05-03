import { TypeSupabaseClient } from "@/utils/supabase";

export async function DeleteManga(client: TypeSupabaseClient, id: string[]) {
  for (const mangaId of id) {
    try {
      const { error: chapterError } = await client
        .from("chapter")
        .delete()
        .eq("manga_id", mangaId);

      const { error: favoriteError } = await client
        .from("favorite")
        .delete()
        .eq("manga_id", mangaId);

      const { error: rateError } = await client
        .from("rate")
        .delete()
        .eq("manga_id", mangaId);
      const { error: historyError } = await client
        .from("history")
        .delete()
        .eq("manga_id", mangaId);
      if (chapterError) {
        throw chapterError;
      }
      if (favoriteError) {
        throw favoriteError;
      }
      if (rateError) {
        throw rateError;
      }
      if (historyError) {
        throw historyError;
      }

      const {} = await client.from("manga").delete().eq("id", mangaId);
    } catch (error) {
      console.error("Error deleting:", error);
      // Handle or log the error as needed
    }
  }
}
