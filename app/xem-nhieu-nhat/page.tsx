"use client";
import Image from "next/image";

import { useState } from "react";
import useMangaTopQuery from "@/hooks/useMangaTopQuery";
import * as mdIcons from "react-icons/md";
import { Button, Col, Flex, Pagination, Row } from "antd";
import star from "../public/StarIcon.png";
import useMangaListQuery from "@/hooks/mangalist/useMangaListQuery";
import usePageMangaQuery from "@/hooks/mangalist/usePageMangaQuery";

import { useRouter } from "next/navigation";
import Link from "next/link";
import MangaCart from "../ui/MangaCart/MangaCart";
import TimeManga from "../ui/TopTimeManga/TimeManga";
import Top1time from "../ui/TopTimeManga/Top1time";
import useMostViewMangaQuery from "@/hooks/mangalist/useMostViewMangaQuery";

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
  } = useMostViewMangaQuery(page);

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
        <p style={{ fontSize: 0.01 }}>.</p> {/*danh sách truyện*/}
        <div className="flex flex-row gap-x-4" style={{ marginTop: 50 }}>
          <div className=" lg:basis-2/3">
            <div>
              <p className="title text-xl md:text-3xl">Xem nhiều nhất</p>
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
                  <Col className=" min-[0px]:basis-1/2 min-[500px]:basis-1/3 md:basis-1/4">
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
