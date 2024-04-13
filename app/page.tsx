"use client";
import Image from "next/image";
import MangaCart from "./ui/MangaCart/MangaCart";
import { useState } from "react";
import useMangaTopQuery from "@/hooks/useMangaTopQuery";
import { useParams } from "next/navigation";
import * as mdIcons from "react-icons/md";
import { Button, Col, Flex, Pagination, Row } from "antd";
import star from "../public/StarIcon.png";
import useMangaListQuery from "@/hooks/mangalist/useMangaListQuery";
import usePageMangaQuery from "@/hooks/mangalist/usePageMangaQuery";
import Top1time from "./ui/TopTimeManga/Top1time";
import TimeManga from "./ui/TopTimeManga/TimeManga";
import Navbar1 from "./ui/Navbar/navbar1";

export default function Home() {
  //top 1 truyen
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
  } = usePageMangaQuery(1);

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
    <>
      {/* navbar 1 de no render khi login xong, neu ko se render trang chu thoi, rootlayout giu nguyen */}
      <Navbar1 />
      <div
        style={{
          marginLeft: 35,
          marginRight: 35,
        }}
      >
        <p style={{ fontSize: 0.01 }}>.</p>{" "}
        {/*collision tăng chiều cao cho div*/}
        <p className="title" style={{ marginBottom: 30, marginTop: 90 }}>
          Xem nhiều nhất
        </p>
        <Row>
          <Col span={24}>
            <a style={{ color: "black" }}>
              <div className="topmanga">
                <div className="topmangabg" />
                <div className="topmangadetail">
                  <div className="topmangaavt">
                    <img
                      src={mangatop1[0].biatruyen as string}
                      className="topmangaavt"
                    />
                  </div>
                  <div className="topmangainfo">
                    <p className="topmangatitle">{mangatop1[0].name}</p>
                    <Flex gap={10} style={{ marginBottom: 10 }}>
                      {mangatop1[0].genre?.map((item) => (
                        <div className="buttontheloai">
                          {item.toUpperCase()}
                        </div>
                      ))}
                    </Flex>
                    <div className="noidung" style={{ fontSize: 18 }}>
                      {mangatop1[0].detail}
                    </div>
                    <div className="tacgiavschuyehuong">
                      <div style={{ width: "50%" }}>
                        <i className="tentacgia">{mangatop1[0].author}</i>
                      </div>
                      <div className="chuyenhuong">
                        <i className="no">No.1</i>
                        <mdIcons.MdArrowBackIos
                          fontSize={25}
                          style={{ marginTop: 5, marginRight: 30 }}
                        />
                        <mdIcons.MdArrowForwardIos
                          fontSize={25}
                          style={{ marginTop: 5, marginRight: 10 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Col>
        </Row>
        {/*truyen moi cap nhat*/}
        {/*danh sách truyện*/}
        <Row gutter={16}>
          <Col span={16}>
            <div>
              <p className="title">Truyện mới cập nhật</p>
            </div>
            <div style={{ marginTop: 20 }}>
              <Row gutter={[16, 24]}>
                {pagemanga.map((item) => (
                  <Col span={6}>
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
                //current={pages}
                onChange={(e) => {
                  //navigate(("/" + e) as string);
                  //setpages(e);
                  //console.log(manga.data?.pagemanga);
                }}
              />
            </div>
          </Col>
          {/*Xếp hạng theo mốc thời gian*/}
          <Col span={8}>
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
          </Col>
        </Row>
      </div>
    </>
  );
}
