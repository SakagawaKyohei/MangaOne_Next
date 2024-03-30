"use client";
import useChapterQueryLast from "@/hooks/ChapterQuery/useChapterQueryLast";
import useChapterQueryLast20 from "@/hooks/ChapterQuery/useChapterQueryLast20";
import useMangaListQuery from "@/hooks/mangalist/useMangaListQuery";
import usePageMangaQuery from "@/hooks/mangalist/usePageMangaQuery";

export default function MangaPage({ params }: { params: { id: string } }) {
  const { data: chapter, isLoading, isError } = usePageMangaQuery(1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !chapter) {
    return <div>Error</div>;
  }

  console.log(chapter);
  return <div> </div>;
}
