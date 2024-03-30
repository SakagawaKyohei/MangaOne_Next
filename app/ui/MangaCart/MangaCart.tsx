"use client";
import React, { useEffect, useState } from "react";
import "./MangaCart.css";
import useMangaQuery from "@/hooks/useMangaQuery";
import useChapterQueryLast from "@/hooks/ChapterQuery/useChapterQueryLast";

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
      <a href={`/noi-dung/${pros.mangaid}`}>
        <div
          style={{
            overflow: "hidden",
            width: "15vw",
            height: "23vw",
          }}
        >
          <img className="mangaimage" src={mangaData.biatruyen as string} />
        </div>
      </a>
      <a href={`/noi-dung/${pros.mangaid}`} className="mangaitemtitle">
        <p>{mangaData.name}</p>
      </a>

      {chapterData.map((item) => (
        <div className="chapterandtime">
          <div className="mangaitemchapter">
            <a
              href={`/doc-truyen/${pros.mangaid}/${item.id}`}
              className="mangaitemchapter"
            >
              <p>{item.name}</p>
            </a>
          </div>
          <div className="mangaitemtime">
            <p>1 giờ trước</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MangaCart;
