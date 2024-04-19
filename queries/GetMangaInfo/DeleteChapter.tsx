import { TypeSupabaseClient } from "@/utils/supabase";

export async function DeleteChapter(client: TypeSupabaseClient, id: string[]) {
  for (const chapterId of id) {
    try {
      const { error: chapterError } = await client
        .from("chapter")
        .delete()
        .eq("id", chapterId);

      if (chapterError) {
        throw chapterError;
      }
    } catch (error) {
      console.error("Error deleting:", error);
      // Handle or log the error as needed
    }
  }
}
