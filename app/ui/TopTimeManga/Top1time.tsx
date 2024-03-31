import { error } from "console";
import Link from "next/link";
import "./TimeManga.css";
import useMangaTopQuery from "@/hooks/useMangaTopQuery";
import useChapterQueryLast from "@/hooks/ChapterQuery/useChapterQueryLast";
function Top1() {
  const {
    data: mangatop,
    isLoading: topload,
    isError: toperror,
  } = useMangaTopQuery();

  if (topload) {
    return <div>Loading...</div>;
  }

  if (toperror || !mangatop) {
    return <div>Error</div>;
  }
  const {
    data: chapterl,
    isLoading: chapterlload,
    isError: chapterlerror,
  } = useChapterQueryLast(mangatop[0].id);
  if (chapterlerror || !chapterl) {
    return <div>Error</div>;
  }
  if (chapterlload) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link href={`/noi-dung/${mangatop[0].id}`}>
        <div
          className="toptimemanga top1"
          style={{
            backgroundImage: `url(${mangatop[0].biatruyen})`,
          }}
        >
          <p className="tieude">{mangatop[0].name}</p>
          <div className="chapterandview">
            <div className="chapter1">
              <Link href={`/doc-truyen/${mangatop[0].id}/${chapterl[0].id}`}>
                <p className="chaptertop" style={{ paddingBottom: 15 }}>
                  {chapterl[0].name}
                </p>
              </Link>
            </div>

            <div className="view"></div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Top1;
export {};
