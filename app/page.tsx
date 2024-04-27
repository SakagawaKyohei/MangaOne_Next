"use client";
import Image from "next/image";
import MangaCart from "./ui/MangaCart/MangaCart";
import { useState } from "react";
import useMangaTopQuery from "@/hooks/useMangaTopQuery";
import * as mdIcons from "react-icons/md";
import { Button, Col, Flex, Pagination, Row } from "antd";
import star from "../public/StarIcon.png";
import useMangaListQuery from "@/hooks/mangalist/useMangaListQuery";
import usePageMangaQuery from "@/hooks/mangalist/usePageMangaQuery";
import Top1time from "./ui/TopTimeManga/Top1time";
import TimeManga from "./ui/TopTimeManga/TimeManga";
import Navbar1 from "./ui/Navbar/navbar1";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  //top 1 truyen
  const [page, setpages] = useState(1);
  const navigate = useRouter();
  const {
    data: mangatop1,
    isLoading: top1load,
    isError: top1error,
  } = useMangaTopQuery(); // Không thêm [0]

  const {
    data: mangalist,
    isLoading: listload,
    isError: listerror,
  } = useMangaListQuery(); // Không thêm [0]

  const {
    data: pagemanga,
    isLoading: pageload,
    isError: pageerror,
  } = usePageMangaQuery(page);

  if (top1load || listload || pageload) {
    return <div>Loading...</div>;
  }

  if (
    top1error ||
    listerror ||
    !mangalist ||
    !mangatop1 ||
    !pagemanga ||
    pageerror
  ) {
    return <div>Error</div>;
  }
  return (
    <div>
      {/* navbar 1 de no render khi login xong, neu ko se render trang chu thoi, rootlayout giu nguyen */}
      <div className="p-4 md:p-8">
        <p style={{ fontSize: 0.01 }}>.</p>{" "}
        {/*collision tăng chiều cao cho div*/}
        <p
          className="title text-xl md:text-3xl"
          style={{ marginBottom: 30, marginTop: 50 }}
        >
          Xem nhiều nhất
        </p>
        <Row>
          <Col span={24}>
            <Link
              href={`/noi-dung/${mangatop1[0].id}`}
              style={{ color: "black" }}
            >
              <div className="topmanga">
                <div
                  className="topmangabg h-full"
                  style={{ height: "calc(100% + 2rem)" }}
                />
                <div className="topmangadetail">
                  <div className="topmangaavt">
                    <Image
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={mangatop1[0].biatruyen as string}
                      className="topmangaavt w-48 md:w-72"
                    />
                  </div>
                  <div className="topmangainfo">
                    <p className="topmangatitle mt-1 text-xl md:text-3xl">
                      {mangatop1[0].name}
                    </p>
                    <div className="hidden sm:block text-xs md:text-sm">
                      <Flex
                        gap={10}
                        style={{ marginBottom: 10 }}
                        className="invisible sm:visible"
                      >
                        {mangatop1[0].genre?.map((item) => (
                          <div className="buttontheloai">
                            {item.toUpperCase()}
                          </div>
                        ))}
                      </Flex>
                    </div>
                    <div className="text-basic md:text-lg noidung hidden sm:block">
                      {mangatop1[0].detail}
                    </div>
                    <div
                      className="noidung md:hidden"
                      style={{ fontSize: 18 }}
                    ></div>
                    <div className="tacgiavschuyehuong">
                      <div style={{ width: "100%" }}>
                        <i className="tentacgia text-basic md:text-lg">
                          {mangatop1[0].author}
                        </i>
                      </div>

                      <div className="chuyenhuong text-basic hidden md:flex">
                        <i className="no text-lg ">No.1</i>
                        <mdIcons.MdArrowBackIos style={{ marginRight: 10 }} />
                        <mdIcons.MdArrowForwardIos
                          style={{ marginRight: 10 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
        {/*truyen moi cap nhat*/}
        {/*danh sách truyện*/}
        <div className="flex flex-row gap-x-4">
          <div className=" lg:basis-2/3">
            <div>
              <p className="title">Truyện mới cập nhật</p>
            </div>
            <div style={{ marginTop: 20 }}>
              <Row
                gutter={[
                  { xs: 8, sm: 16, md: 24, lg: 32 },
                  { xs: 8, sm: 16, md: 24, lg: 32 },
                ]}
                className="flex flex-row"
              >
                {pagemanga.map((item) => (
                  <Col className=" min-[0px]:basis-1/2 min-[450px]:basis-1/3 sm:basis-1/4">
                    <MangaCart mangaid={item.id} />
                  </Col>
                ))}
              </Row>
            </div>
            <div className="pagination">
              <Pagination
                total={mangalist.length}
                pageSize={12}
                showSizeChanger={false}
                showLessItems
                current={page}
                onChange={(e) => {
                  // navigate.push(("/" + e) as string);
                  setpages(e);
                }}
              />
            </div>
          </div>
          {/*Xếp hạng theo mốc thời gian*/}
          <div className="basis-1/3 hidden lg:block">
            <div className="xemnhieunhattitle" style={{ paddingTop: 30 }}>
              <img
                height={40}
                width={40}
                src="https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/StarIcon.png"
              ></img>
              <p style={{ paddingLeft: 10 }}>Xem nhiều nhất</p>
            </div>
            <div>
              <Row gutter={18}>
                <Col span={6}>
                  <Button className="timebutton selected">Ngày</Button>
                </Col>
                <Col span={6}>
                  <Button className="timebutton">Tuần</Button>
                </Col>
                <Col span={6}>
                  <Button className="timebutton">Tháng</Button>
                </Col>
                <Col span={6}>
                  <Button className="timebutton">Năm</Button>
                </Col>
              </Row>
              {
                <>
                  <Top1time />
                  <TimeManga keyy={1} />
                  <TimeManga keyy={3} />
                  <TimeManga keyy={5} />
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
