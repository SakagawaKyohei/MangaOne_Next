"use client";
import * as faIcons from "react-icons/fa";
import { Button, Col, Pagination, Row, message } from "antd";
import { FaAngleDoubleRight } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
// import useAddHistory from "../hooks/history/useAddHistory";
import Link from "next/link";
import { useParams } from "next/navigation";
import useUser from "@/hooks/useUser";
import useMangaQuery from "@/hooks/useMangaQuery";
import useChapterQuery from "@/hooks/ChapterQuery/useChapterQuery";
import useChapterQueryLast from "@/hooks/ChapterQuery/useChapterQueryLast";
import useChapterQueryLast20 from "@/hooks/ChapterQuery/useChapterQueryLast20";
import useDeleteFollow from "@/hooks/follow/useDeleteFollow";
import useAddFollow from "@/hooks/follow/useAddFollow";
import useIsFollow from "@/hooks/follow/useIsFollow";
import useGetViewManga from "@/hooks/GetMangaInfo/useGetViewManga";
import CommentComponent from "@/app/ui/CommentComponent";
import useCommentManga from "@/hooks/comment/useCommentManga";
import useSupabase from "@/hooks/useSupabase";
import useQueryCommentManga from "@/hooks/comment/useQueryCommentManga";
import useCommentMangaAll from "@/hooks/comment/useCommentMangaAll";
import useRateManga from "@/hooks/rate/useRateManga";
import useQueryRate from "@/hooks/rate/useQueryRate";
import useStarOfManga from "@/hooks/rate/useStarOfManga";
import NeedLogin from "@/app/ui/NeedLogin";
import useEditComment from "@/hooks/comment/useEditComment";
import useDeleteComment from "@/hooks/comment/useDeleteComment";
function NoiDungTruyen() {
  const params = useParams<{
    id: string;
  }>();
  const mid = params.id ? params.id.toString() : "";
  const { data: user, isLoading, isError } = useUser();
  const {
    data: manga,
    isLoading: mangaload,
    isError: mangaerror,
  } = useMangaQuery(mid);
  const {
    data: chapterlast,
    isSuccess: clSuccess,
    isLoading: clLoading,
    isError: clError,
  } = useChapterQueryLast(mid);

  const {
    data: chapter,
    isSuccess: cSuccess,
    isLoading: cLoading,
    isError: cError,
  } = useChapterQuery(mid);

  const {
    data: starofmanga,
    refetch: rs,
    isLoading: sml,
    isError: sme,
  } = useStarOfManga(mid);
  const {
    data: chapterlast20,
    isSuccess: cl20Success,
    isLoading: cl20Loading,
    isError: cl20Error,
  } = useChapterQueryLast20(mid);
  const {
    data: getview,
    isSuccess: gvSuccess,
    isLoading: gvLoading,
    isError: gvError,
  } = useGetViewManga(params.id);
  const {
    data: followdata,
    isSuccess: followsuccess,
    isLoading: followload,
    isError: followerror,
  } = useIsFollow(user?.user?.id, mid);
  const [page, setpages] = useState(1);
  const {
    data: rate,
    isLoading: rl,
    isError: re,
    refetch: rr,
  } = useQueryRate(user?.user?.id as any, mid);
  const [isratting, setisratting] = useState(false);
  const {
    data: comment,
    isLoading: cl,
    isError: ce,
    refetch: r,
  } = useQueryCommentManga(page, mid);
  const {
    data: cmtlist,
    isLoading: listload,
    isError: listerror,
  } = useCommentMangaAll(mid); // Không thêm [0]
  const follow = useAddFollow(user?.user?.id, mid);
  const unfollow = useDeleteFollow(user?.user?.id, mid);
  const [text, settext] = useState("");
  const [numstar, setnumstar] = useState<number | null>();
  const ratemutate = useRateManga(user?.user?.id, mid, numstar);
  const sendcomment = useCommentManga(user?.user?.id, mid, text);

  const [cmtid, setcmtid] = useState("");
  const editcomment = useEditComment(cmtid, user?.user?.id, mid, text);
  const supabase = useSupabase();
  useEffect(() => {
    const channel = supabase
      .channel("room2")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cmtmanga" },
        (payload) => {
          console.log("Change received!", payload);
          r();
          setcmtid("");
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);
  useEffect(() => {
    const channel = supabase
      .channel("room3")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rate" },
        async (payload) => {
          rr();
          rs();
        }
      )
      .subscribe();
  }, []);

  // const history = useAddHistory(user.user?.id, mid);
  let a = false;

  if (followsuccess) {
    if (followdata?.length != 0) {
      a = true;
    }
  }

  const [chapterdata, setchapterdata] = useState<any[]>([]);
  const pRef = useRef<HTMLParagraphElement>(null);
  const [pheight, setpheight] = useState(0);
  const [xemthem, setxemthem] = useState(false);
  const [data, setdata] = useState<any[]>();
  const [more, setmore] = useState(false);
  const [rated, setrated] = useState(true);
  useEffect(() => {
    if (chapterlast20 != null) {
      setdata(chapterlast20);
      console.log(chapterlast20);
    }
  }, [chapterlast20]);
  const [divheight, setdivheight] = useState(0);
  const dRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (chapterlast != null) {
      console.log(chapterlast);
      setchapterdata(chapterlast);
    }
  }, [chapter]);

  // useEffect(() => {
  //   history.mutate();
  // }, [user?.user]);

  //check div overflow
  const [isOverflow, setIsOverflow] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dRef.current) {
      setdivheight(dRef.current.clientHeight);
    }
  }, []);
  useEffect(() => {
    if (dRef.current) {
      setdivheight(dRef.current.clientHeight);
    }
  }, [chapterdata]);
  useEffect(() => {
    setnumstar(rate && rate.length > 0 && rate[0].star ? rate[0].star : 0);
    if (!rl && !re && rate && rate.length > 0 && rate[0].star != null) {
      setrated(true);
    } else {
      setrated(false);
    }
    console.log(a);
  }, [rl, re, rate]);

  useEffect(() => {
    if (pRef.current) {
      setpheight(pRef.current.clientHeight);
    }
    if (dRef.current) {
      setdivheight(dRef.current.clientHeight);
    }
    const checkOverflow = () => {
      const divElement = divRef.current;

      if (divElement) {
        const isOverflowing =
          divElement.scrollHeight > divElement.clientHeight ||
          divElement.scrollWidth > divElement.clientWidth;

        setIsOverflow(isOverflowing);
      }
    };

    checkOverflow();

    // Thêm sự kiện resize để kiểm tra lại khi cửa sổ thay đổi kích thước
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [manga?.detail]);
  if (
    isLoading ||
    mangaload ||
    clLoading ||
    cl20Loading ||
    cLoading ||
    gvLoading ||
    followload ||
    listload ||
    rl ||
    sml
  ) {
    return <div>Loading...</div>;
  }

  if (user?.user == null) {
    return <NeedLogin />;
  }

  if (
    isError ||
    !manga ||
    mangaerror ||
    !user ||
    cl20Error ||
    cError ||
    clError ||
    !chapter ||
    !chapterlast ||
    !chapterlast20 ||
    followerror ||
    !follow ||
    !cmtlist ||
    listerror ||
    !rate ||
    re ||
    sme ||
    !starofmanga
  ) {
    return <div>Error</div>;
  }

  console.log(starofmanga);
  const handleDataUpdate = (newData: string) => {
    settext(newData);
  };
  const handleidUpdate = (newid: string) => {
    setcmtid(newid);
  };
  return (
    <div>
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          height: divheight + 175,
        }}
      >
        <div>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.40)",
              width: "100%",
              height: "40vh",
              position: "absolute",
              zIndex: 1,
            }}
          >
            <div
              className="mr-4 ml-4 md:mr-8 md:ml-8"
              style={{
                position: "relative",
              }}
              ref={dRef}
            >
              <div
                className="sm:flex "
                style={{
                  marginTop: "15vh",

                  flexDirection: "row",
                }}
              >
                <img
                  src={manga.biatruyen as string}
                  style={{ height: 300, paddingRight: 18 }}
                  className="hidden sm:block"
                />
                <div style={{ marginTop: 100 }}>
                  <img
                    src={manga.biatruyen as string}
                    style={{ height: 250, margin: "0 auto" }}
                    className="sm:hidden"
                  />
                </div>
                <div>
                  <h1
                    style={{
                      paddingBottom: 5,
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                    className="text-black flex sm:text-white m-2 flex justify-center sm:block sm:m-0"
                  >
                    {manga.name}
                  </h1>
                  <p
                    style={{
                      color: "white",
                      fontSize: 18,
                      paddingBottom: 42,
                      paddingTop: 8,
                    }}
                    className="hidden sm:block"
                  >
                    {manga.other_name == "" ? manga.name : manga.other_name}
                  </p>
                  <div>
                    <p
                      style={{ fontSize: 18 }}
                      className="sm:text-white flex flex-row pb-2 sm:pb-12"
                    >
                      <p className="sm:hidden pr-1">Tác giả: </p>
                      {manga.author == "" ? "Tên tác giả" : manga.author}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    {!followdata?.length ? (
                      <>
                        <Button
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 20,
                            backgroundColor: "#FF9040",
                            color: "white",
                            fontSize: 18,
                            height: 45,
                          }}
                          onClick={() => {
                            follow.mutate();
                          }}
                        >
                          <p>Theo dõi</p>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                            backgroundColor: "red",
                            color: "white",
                            fontSize: 18,
                            marginBottom: 20,
                            height: 45,
                          }}
                          onClick={() => {
                            console.log(mid + "a");
                            unfollow.mutate();
                          }}
                        >
                          <p>Hủy theo dõi</p>
                        </Button>
                      </>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      overflow: "hidden",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 18,
                      }}
                      className="mr-1"
                    >
                      Thể loại:
                    </p>
                    {manga.genre?.map((item) => (
                      <div>
                        <button
                          style={{
                            backgroundColor: "#D9D9D9",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "none",
                          }}
                          className="m-2 ml-0"
                        >
                          <p
                            style={{
                              fontSize: 14,
                              padding: 3,
                              paddingLeft: 8,
                              paddingRight: 8,
                            }}
                          >
                            {item.toLocaleUpperCase()}
                          </p>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "row" }}
                    className="pb-4 sm:pb-0"
                  >
                    <div>
                      <div
                        style={{
                          marginTop: 12,
                          display: "flex",
                          flexDirection: "row",
                        }}
                        className="mr-4 sm:mr-8"
                        onClick={() => {
                          console.log(numstar);
                          if (!isratting) {
                            setisratting(true);
                          } else {
                            setisratting(false);
                          }
                        }}
                      >
                        <faIcons.FaRegStar style={{ marginRight: 10 }} />
                        <p>
                          {starofmanga[0]["avg"]
                            ? starofmanga[0]["avg"]
                            : "0.00"}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        display: "flex",
                        flexDirection: "row",
                      }}
                      className="mr-4 sm:mr-8"
                    >
                      <faIcons.FaRegHeart style={{ marginRight: 10 }} />
                      <p> 0.00</p>
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        display: "flex",
                        flexDirection: "row",
                      }}
                      className="mr-4 sm:mr-8"
                    >
                      <faIcons.FaRegComment style={{ marginRight: 10 }} />
                      <p> 0.00</p>
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        display: "flex",
                        flexDirection: "row",
                      }}
                      className="mr-4 sm:mr-8"
                    >
                      <faIcons.FaRegEye style={{ marginRight: 10 }} />
                      <p> {getview}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        display: isratting ? "flex" : "none",
                        paddingTop: 10,
                        marginTop: 20,
                        paddingBottom: 10,
                        backgroundColor: "#eee",
                        maxWidth: "max-content",
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          onMouseEnter={() => {
                            if (!rated) {
                              setnumstar(star);
                            }
                          }}
                          onMouseLeave={() => {
                            if (!rated) {
                              setnumstar(0);
                            }
                          }}
                          onClick={() => {
                            setnumstar(star);
                            ratemutate.mutate();
                            setrated(true);

                            message.success("Bạn đã đánh giá truyện");
                          }}
                        >
                          <img
                            src={
                              numstar && numstar >= star
                                ? "https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/1star.png"
                                : "https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/0star.png"
                            }
                            style={{
                              marginRight: 10,
                              marginLeft: 10,
                              height: 30,
                              width: 30,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <Button
                      style={{
                        display:
                          isratting && numstar && numstar >= 1 && rated
                            ? "flex"
                            : "none",

                        marginTop: 30,
                        paddingBottom: 10,
                        backgroundColor: "#eee",
                        maxWidth: "max-content",
                        marginLeft: 10,
                      }}
                      onClick={() => {
                        setnumstar(null);
                        setrated(false);
                        ratemutate.mutate();

                        message.success("Bạn đã hủy đánh giá");
                      }}
                    >
                      Bỏ đánh giá
                    </Button>
                  </div>
                </div>
                <div className="sm:hidden">
                  {!followdata?.length ? (
                    <>
                      <Button
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#FF9040",
                          color: "white",
                          fontSize: 18,
                          height: 45,
                        }}
                        onClick={() => {
                          follow.mutate();
                        }}
                      >
                        <p>Theo dõi</p>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",

                          backgroundColor: "red",
                          color: "white",
                          fontSize: 18,

                          height: 45,
                        }}
                        onClick={() => {
                          console.log(mid + "a");
                          unfollow.mutate();
                        }}
                      >
                        <p>Hủy theo dõi</p>
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div
                style={{
                  paddingTop: 20,
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: 10,
                  alignItems: "end",
                }}
              >
                <img
                  src="https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/content.svg"
                  style={{ width: 18, paddingBottom: 3 }}
                />
                <p style={{ fontSize: 17, marginLeft: 10 }}>NỘI DUNG</p>
              </div>
              <div className="line2" style={{ marginBottom: 10 }} />
              {pheight > 95 && !xemthem ? (
                <>
                  <div
                    style={{
                      height: 95,
                      overflow: "hidden",
                    }}
                    ref={divRef}
                  >
                    <p style={{ fontSize: 15 }} ref={pRef}>
                      {manga.detail}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 10,
                    }}
                  >
                    <FaAngleDoubleRight
                      style={{ color: "#FF9040", marginRight: 5 }}
                      onClick={() => setxemthem(true)}
                    />
                    <p
                      style={{
                        color: "#FF9040",
                      }}
                      onClick={() => {
                        setxemthem(true);
                        console.log(xemthem);
                      }}
                    >
                      Xem thêm
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div ref={divRef}>
                    <p style={{ fontSize: 15 }} ref={pRef}>
                      {manga.detail}
                    </p>
                  </div>
                </>
              )}
              <div
                style={{
                  paddingTop: 16,
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: 15,
                  alignItems: "end",
                }}
              >
                <faIcons.FaList style={{ fontSize: 18, paddingBottom: 3 }} />
                <p style={{ fontSize: 17, marginLeft: 10 }}>DANH SÁCH CHƯƠNG</p>
              </div>
              <div>
                <Row style={{ marginBottom: 10 }}>
                  <Col span={10} style={{ fontSize: 18 }}>
                    <p style={{ paddingLeft: 5 }}> Số chương</p>
                  </Col>
                  <Col
                    span={8}
                    style={{
                      fontSize: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Cập nhật
                  </Col>
                  <Col
                    span={4}
                    offset={2}
                    style={{
                      fontSize: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Xem
                  </Col>
                </Row>
                <div style={{ border: "1px solid rgba(0, 0, 0, 0.15)" }}>
                  <div style={{ marginLeft: 5, marginRight: 10 }}>
                    {data &&
                      data.map((item, i) => (
                        <div>
                          <div>
                            <Row style={{ marginBottom: 10, marginTop: 10 }}>
                              <Col span={8} style={{ fontSize: 16 }}>
                                <Link
                                  href={`/doc-truyen/${params.id}/${item.id}`}
                                  className="mangaitemtitle1"
                                >
                                  <p
                                    style={{
                                      paddingLeft: 10,
                                      color: item.reader
                                        ? item.reader.includes(user.user?.id)
                                          ? "#ccc"
                                          : "black"
                                        : "black",
                                    }}
                                  >
                                    {item.name}
                                  </p>
                                </Link>
                              </Col>
                              <Col
                                span={12}
                                style={{
                                  fontSize: 16,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <p
                                  style={{
                                    marginLeft: 10,
                                    fontWeight: 400,
                                    fontStyle: "italic",
                                    color: "rgba(153, 153, 153, 0.60)",
                                  }}
                                >
                                  17 ngày trước
                                </p>
                              </Col>
                              <Col
                                span={4}
                                style={{
                                  fontSize: 16,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <p
                                  style={{
                                    marginLeft: 20,
                                    fontWeight: 400,
                                    fontStyle: "italic",
                                    color: "rgba(153, 153, 153, 0.60)",
                                  }}
                                >
                                  {item.view}
                                </p>
                              </Col>
                            </Row>
                          </div>

                          {i !== data.length - 1 && ( // Check if it's not the last item
                            <div
                              style={{
                                background: "rgba(0, 0, 0, 0.20)",
                                height: 1,
                                marginLeft: 10,
                                marginRight: 10,
                              }}
                            />
                          )}
                        </div>
                      ))}

                    {chapter && chapter.length > 20 && !more ? (
                      <>
                        <div
                          style={{
                            background: "rgba(0, 0, 0, 0.20)",
                            height: 1,
                            marginLeft: 10,
                            marginRight: 10,
                          }}
                        />
                        <Button
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 35,
                            marginTop: 10,
                            marginBottom: 10,
                            borderRadius: 0,
                            backgroundColor: "#FF9040",
                            color: "white",
                            width: "100%",
                            fontSize: 18,
                          }}
                          onClick={() => {
                            if (chapter != null) {
                              setdata(chapter);
                              setmore(true);
                            }
                          }}
                        >
                          Xem thêm
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: 20,
                  paddingBottom: 15,
                }}
              >
                <faIcons.FaRegCommentAlt fontSize={18} style={{}} />
                <p style={{ fontSize: 17, marginLeft: 10 }}>BÌNH LUẬN </p>
              </div>
              <TextArea
                style={{ height: 115, fontSize: 17, marginBottom: 30 }}
                value={text}
                onChange={(e) => {
                  settext(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    editcomment.mutate();
                  }
                }}
                placeholder="Viết bình luận"
              />
              {(comment?.data as any[] | null | undefined)?.map(
                (value, index) =>
                  value && value.role?.slice(1, -1) != "banned" ? (
                    <CommentComponent
                      id={value.id}
                      key={index}
                      uid2={value?.uid}
                      uid={user.user?.id as any}
                      name={value?.ten?.slice(1, -1)}
                      avt={value?.avt?.slice(1, -1)}
                      text={value?.comment}
                      ho={value?.ho?.slice(1, -1)}
                      onDataUpdate={handleDataUpdate}
                      onidUpdate={handleidUpdate}
                    />
                  ) : (
                    <></>
                  )
              )}

              <div className="pagination">
                <Pagination
                  total={cmtlist.data?.length}
                  pageSize={10}
                  showSizeChanger={false}
                  showLessItems
                  current={page}
                  onChange={(e) => {
                    // navigate.push(("/" + e) as string);
                    setpages(e);
                    r();
                  }}
                />
              </div>
            </div>
          </div>
          <img
            src={manga.biatruyen as string}
            style={{
              width: "100%",
              height: "38.5vh",
              objectFit: "cover",
              objectPosition: "20% 25%",
            }}
            className="biatruyen"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default NoiDungTruyen;
