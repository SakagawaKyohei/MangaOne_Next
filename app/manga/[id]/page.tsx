"use client";
import useMangaQuery from "@/hooks/useMangaQuery";

export default function MangaPage({ params }: { params: { id: number } }) {
  const { data: manga, isLoading, isError } = useMangaQuery(params.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !manga) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>{manga.name}</h1>
    </div>
  );
}
