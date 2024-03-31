import "./TimeManga.css";
import React from "react";
import Link from "next/link";
import useMangaTopQuery from "@/hooks/useMangaTopQuery";
import useChapterQueryLast1 from "@/hooks/ChapterQuery/useChapterQueryLast1";
interface Pros {
  keyy: number;
}

function TimeManga(pros: Pros) {
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
    data: lastchap1,
    isLoading: lastchap1load,
    isError: lastchap1error,
  } = useChapterQueryLast1(mangatop[pros.keyy].id);

  const {
    data: lastchap2,
    isLoading: lastchap2load,
    isError: lastchap2error,
  } = useChapterQueryLast1(mangatop[pros.keyy + 1].id);

  if (lastchap2load || lastchap1load) {
    return <div>Loading...</div>;
  }

  if (lastchap2error || !lastchap2 || lastchap1error || !lastchap1) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Link
        href={`/noi-dung/${mangatop[pros.keyy].id}`}
        style={{ color: "black" }}
      >
        <div className="toptimemanga chan">
          <div className="contentbox">
            <img
              src={mangatop[pros.keyy].biatruyen as string}
              className="toptimemangaimage"
            />
            <div className="detail">
              <p style={{ paddingBottom: 33 }}>{mangatop[pros.keyy].name}</p>
              <i
                style={{
                  paddingBottom: 33,
                  color: "rgba(0, 0, 0, 0.60)",
                  fontSize: 16,
                }}
              >
                {mangatop[pros.keyy].other_name
                  ? mangatop[pros.keyy].other_name
                  : mangatop[pros.keyy].name}
              </i>
              {/*cần chỉnh align thay vì padding tay*/}
              <div className="chapter">
                <Link
                  style={{ paddingRight: 170 }}
                  className="linkhover"
                  href={`/doc-truyen/${mangatop[pros.keyy].id}/${
                    lastchap1[0].id
                  }`}
                >
                  {lastchap1[0].name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Link
        href={`/noi-dung/${mangatop[pros.keyy + 1].id}`}
        style={{ color: "black" }}
      >
        <div className="toptimemanga le">
          <div className="contentbox">
            <img
              src={mangatop[pros.keyy + 1].biatruyen as string}
              className="toptimemangaimage"
            />
            <div className="detail">
              <p style={{ paddingBottom: 33 }}>
                {mangatop[pros.keyy + 1].name}
              </p>
              <i
                style={{
                  paddingBottom: 33,
                  color: "rgba(0, 0, 0, 0.60)",
                  fontSize: 16,
                }}
              >
                {mangatop[pros.keyy + 1].other_name}
              </i>
              {/*cần chỉnh align thay vì padding tay*/}
              <Link
                style={{}}
                className="linkhover"
                href={`/doc-truyen/${mangatop[pros.keyy + 1].id}/${
                  lastchap2[0].id
                }`}
              >
                <p style={{}}>{lastchap2[0].name}</p>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TimeManga;

//add view
