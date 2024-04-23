"use client";
import React, { useEffect, useState } from "react";
import {
  Col,
  Flex,
  Row,
  Pagination,
  ConfigProvider,
  Button,
  Select,
} from "antd";
import * as mdIcons from "react-icons/md";
import * as faIcons from "react-icons/fa";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import useAddFollow from "@/hooks/follow/useAddFollow";
import useDeleteFollow from "@/hooks/follow/useDeleteFollow";
import useIsFollow from "@/hooks/follow/useIsFollow";
import useMangaQuery from "@/hooks/useMangaQuery";
import useChapterQuery from "@/hooks/ChapterQuery/useChapterQuery";
import useChapterQueryCID from "@/hooks/ChapterQuery/useChapterQueryCID";
import usePlusView from "@/hooks/usePlusView";
import useAddHistory from "@/hooks/history/useAddHistory";
//code lại more khi tràn thể loại
//chỉnh sửa đường dẫn tương đối image giữa các file
//lỗi flex nhiều màn hình image
//chinh top item thanh component
function DocTruyen() {
  const params = useParams<{ mid: string; id: string }>();
  const {
    data: chapterlist,
    isLoading: chapterlistload,
    isError: chapterlisterror,
  } = useChapterQuery(params.mid ?? "");
  const [pages, setpages] = useState([""]);
  const { data: user, isLoading, isError } = useUser();
  const {
    data: chapter,
    isLoading: chapterload,
    isError: chaptererror,
  } = useChapterQueryCID(params.id as string);
  const history = useAddHistory(user?.user?.id, params.mid);
  const follow = useAddFollow(user?.user?.id, params.mid);
  const unfollow = useDeleteFollow(user?.user?.id, params.mid);
  const followdata = useIsFollow(user?.user?.id, params.mid);
  const [naem, setname] = useState("");
  const {
    data: manga,
    isLoading: mangaload,
    isError: mangaerror,
  } = useMangaQuery(params.mid);
  let names: any = [];
  const nav = useRouter();

  let a = false;
  useEffect(() => {
    history.mutate();
  }, [user?.user]);

  if (followdata.isSuccess) {
    if (followdata.data?.length != 0) {
      a = true;

      console.log(followdata.data?.length);
    } else {
      a = false;
      console.log(a);
    }
    console.log("aaaaaaaaaaa");
  }
  if (followdata.isError) {
    console.log((followdata.error as any).message);
  }

  const [isfollow, setisfollow] = useState<boolean>();
  useEffect(() => {
    setisfollow(a);
  }, [a]);

  let manganame = "";
  let currenti = -1;

  chapterlist?.map((i) => {
    names.push(i.name);
  });

  currenti = names.indexOf(naem);

  manganame = manga?.name ? manga.name : "";

  let view = 0;

  view = chapter?.view ? chapter?.view : 0;
  console.log(view);
  const plusview = usePlusView(params.id, view);

  useEffect(() => {
    if (chapter != null) {
      console.log(chapter.content);
      setpages(chapter.content ? chapter.content : [""]);
      setname(chapter.name ? chapter.name : "");
      console.log(chapter.view ? chapter.view : 0);
      plusview.mutate();
      // updateSeenChap(id); > chap.seen += 1 > db
    }
  }, [chapter]);

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "FF9040" },
        components: {
          Pagination: {
            itemSize: 50,
          },
        },
      }}
    >
      {/* {chapter.isError && <p className="text-sm mb-8 text-red-500">Error</p>}

      {chapter.isLoading && (
        <p className="text-sm mb-8 text-red-500">loading</p>
      )}

      {chapter.data && <p className="text-sm mb-8 text-red-500">Data</p>} */}

      <div>
        <div
          style={{
            fontSize: 18,
            backgroundColor: "black",
          }}
        >
          {/*truyen moi cap nhat*/}
          {/*danh sách truyện*/}
          <Row>
            <div
              style={{
                backgroundColor: "white",

                width: "100%",

                marginLeft: 60,
                marginRight: 60,
                marginTop: 80,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginLeft: 20,
                }}
              >
                <Link href={`/noi-dung/${params.mid}/`}>
                  <p
                    style={{
                      marginTop: 30,
                      fontSize: 20,
                      paddingBottom: 15,
                      color: "#FF9040",
                    }}
                    onClick={() => {}}
                  ></p>
                </Link>
                <p
                  style={{
                    marginTop: 30,
                    fontSize: 20,
                    paddingBottom: 15,
                    marginLeft: 5,
                  }}
                  onClick={() => {}}
                >
                  {manganame} - {naem}
                </p>
              </div>
              <Row style={{ backgroundColor: "#f6f7f8" }}>
                <Col
                  offset={7}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 30,
                    marginTop: 30,
                  }}
                >
                  {
                    <Link href={"/"} style={{ color: "#FF9040" }}>
                      <faIcons.FaHome
                        style={{ fontSize: 20, marginRight: 10 }}
                      />
                    </Link>
                  }
                  {
                    <Link
                      href={`/noi-dung/${params.mid}/`}
                      style={{ color: "#FF9040" }}
                    >
                      <faIcons.FaBars
                        style={{ fontSize: 20, marginRight: 10 }}
                      />
                    </Link>
                  }
                  {Number(chapterlist?.length) - 1 == currenti ? (
                    <>
                      {" "}
                      <Button
                        style={{
                          borderRadius: 0,
                          marginRight: 10,
                          backgroundColor: "#ccc",
                          color: "white",
                        }}
                        onClick={() => {
                          chapterlist?.map((item, key) => {
                            if (key == currenti + 1) {
                              //do hien thi tu cao xuong thap
                              console.log(item.id);
                              nav.push(`/doc-truyen/${params.mid}/${item.id}`);
                            }
                          });
                        }}
                        disabled
                      >
                        <mdIcons.MdArrowBackIos style={{ color: "white" }} />
                      </Button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Button
                        style={{
                          borderRadius: 0,
                          marginRight: 10,
                          backgroundColor: "#FF9040",
                          color: "white",
                        }}
                        onClick={() => {
                          chapterlist?.map((item, key) => {
                            if (key == currenti + 1) {
                              //do hien thi tu cao xuong thap
                              console.log(item.id);
                              nav.push(`/doc-truyen/${params.mid}/${item.id}`);
                            }
                          });
                        }}
                      >
                        <mdIcons.MdArrowBackIos style={{ color: "white" }} />
                      </Button>
                    </>
                  )}

                  <Select
                    onChange={(selectedValue) => {
                      nav.push(`/doc-truyen/${params.mid}/${selectedValue}`);
                    }}
                    value={naem}
                    style={{
                      width: 230,
                      marginRight: 10,
                    }}
                    // Gắn sự kiện onChange để theo dõi các giá trị được chọn
                    placeholder="Nhập tên và chọn thể loại"
                  >
                    {chapterlist?.map((tl, i) => {
                      return (
                        <Select.Option key={i} value={tl.id}>
                          {tl.name}
                        </Select.Option>
                      );
                    })}
                  </Select>

                  {currenti == 0 ? (
                    <>
                      <Button
                        style={{
                          borderRadius: 0,
                          marginRight: 10,
                          backgroundColor: "#ccc",
                        }}
                        onClick={() => {
                          chapterlist?.map((item, key) => {
                            if (key == currenti - 1) {
                              //do hien thi tu cao xuong thap
                              console.log(item.id);
                              nav.push(`/doc-truyen/${params.mid}/${item.id}`);
                            }
                          });
                        }}
                        disabled
                      >
                        <mdIcons.MdArrowForwardIos
                          style={{ color: "white", fontWeight: "bold" }}
                        />
                      </Button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Button
                        style={{
                          borderRadius: 0,
                          marginRight: 10,
                          backgroundColor: "#FF9040",
                        }}
                        onClick={() => {
                          chapterlist?.map((item, key) => {
                            if (key == currenti - 1) {
                              //do hien thi tu cao xuong thap
                              console.log(item.id);
                              nav.push(`/doc-truyen/${params.mid}/${item.id}`);
                            }
                          });
                        }}
                      >
                        <mdIcons.MdArrowForwardIos
                          style={{ color: "white", fontWeight: "bold" }}
                        />
                      </Button>
                    </>
                  )}

                  {!isfollow ? (
                    <>
                      <Button
                        style={{
                          color: "white",
                          backgroundColor: "#FF9040",
                          fontSize: 18,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 0,
                        }}
                        onClick={() => {
                          follow.mutate();
                          setisfollow(true);
                        }}
                      >
                        <p
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                          }}
                        >
                          Theo dõi
                        </p>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          fontSize: 18,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 0,
                        }}
                        onClick={() => {
                          unfollow.mutate();
                          setisfollow(false);
                        }}
                      >
                        <p
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                          }}
                        >
                          Hủy theo dõi
                        </p>
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </div>
          </Row>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.20)",
              height: 0.5,
              marginLeft: 10,
              marginRight: 10,
            }}
          />
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {pages &&
                pages.map((i) => (
                  <>
                    <img src={i}></img>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default DocTruyen;
export {};
//bug khi reload
