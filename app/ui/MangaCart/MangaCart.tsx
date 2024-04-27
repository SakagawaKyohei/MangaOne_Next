"use client";
import React, { useEffect, useState } from "react";
import "./MangaCart.css";
import useMangaQuery from "@/hooks/useMangaQuery";
import useChapterQueryLast from "@/hooks/ChapterQuery/useChapterQueryLast";
import Link from "next/link";

interface manga {
  mangaid: string;
}

function MangaCart(pros: manga) {
  const {
    data: mangaData,
    isLoading: mangaLoading,
    isError: mangaError,
  } = useMangaQuery(pros.mangaid);

  const {
    data: chapterData,
    isLoading: chapterLoading,
    isError: chapterError,
  } = useChapterQueryLast(pros.mangaid);

  if (mangaLoading || chapterLoading) {
    return <div>Loading...</div>;
  }

  if (mangaError || !mangaData || chapterError || !chapterData) {
    return <div>Error</div>;
  }

  return (
    <div className="mangaitem">
      <Link href={`/noi-dung/${pros.mangaid}`}>
        <div
          style={{
            overflow: "hidden",
          }}
        >
          <img className="mangaimage" src={mangaData.biatruyen as string} />
        </div>
      </Link>
      <Link
        href={`/noi-dung/${pros.mangaid}`}
        className="mangaitemtitle text-xl sm:text-xl"
      >
        <p>{mangaData.name}</p>
      </Link>

      {chapterData.map((item) => (
        <div className="chapterandtime">
          <div className="mangaitemchapter">
            <Link
              href={`/doc-truyen/${pros.mangaid}/${item.id}`}
              className="mangaitemchapter text-sm"
            >
              <p>{item.name}</p>
            </Link>
          </div>
          <div className="mangaitemtime text-xs">
            <p>1 giờ trước</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MangaCart;
