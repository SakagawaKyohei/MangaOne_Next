"use client";
import * as faIcons from "react-icons/fa";
import { Button, Col, Row } from "antd";
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
  const follow = useAddFollow(user?.user?.id, mid);
  const unfollow = useDeleteFollow(user?.user?.id, mid);
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
    followload
  ) {
    return <div>Loading...</div>;
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
    !follow
  ) {
    return <div>Error</div>;
  }
  console.log(getview);
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
              style={{
                marginLeft: 35,
                marginRight: 35,

                position: "relative",
              }}
              ref={dRef}
            >
              <div
                style={{
                  marginTop: "15vh",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <img
                  src={manga.biatruyen as string}
                  style={{ height: 300, paddingRight: 18 }}
                />
                <div>
                  <h1 style={{ color: "white", paddingBottom: 5 }}>
                    {manga.name}
                  </h1>

                  <p
                    style={{
                      color: "white",
                      fontSize: 18,
                      paddingBottom: 42,
                      paddingTop: 8,
                    }}
                  >
                    {manga.other_name == "" ? manga.name : manga.other_name}
                  </p>
                  <p
                    style={{ color: "white", fontSize: 18, paddingBottom: 45 }}
                  >
                    {manga.author == "" ? "Tên tác giả" : manga.author}
                  </p>
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

                  <div style={{ display: "flex", flexDirection: "row" }}>
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
                            marginTop: 30,
                            marginBottom: 22,
                            marginRight: 15,
                          }}
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

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        marginRight: 40,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <faIcons.FaRegStar style={{ marginRight: 10 }} />
                      <p> 0.00</p>
                    </div>
                    <div
                      style={{
                        marginRight: 40,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <faIcons.FaRegHeart style={{ marginRight: 10 }} />
                      <p> 0.00</p>
                    </div>
                    <div
                      style={{
                        marginRight: 40,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <faIcons.FaRegComment style={{ marginRight: 10 }} />
                      <p> 0.00</p>
                    </div>
                    <div
                      style={{
                        marginRight: 35,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <faIcons.FaRegEye style={{ marginRight: 10 }} />
                      <p> {getview}</p>
                    </div>
                  </div>
                  {/*clear code sau*/}
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
                    <p style={{ fontSize: 18 }} ref={pRef}>
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
                    <p style={{ fontSize: 18 }} ref={pRef}>
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
                                  <p style={{ paddingLeft: 10 }}>{item.name}</p>
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
                style={{ height: 150, fontSize: 17 }}
                placeholder="Viết bình luận"
              />
            </div>
          </div>
          <img
            src={manga.biatruyen as string}
            style={{
              width: "100%",
              height: "40vh",
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
