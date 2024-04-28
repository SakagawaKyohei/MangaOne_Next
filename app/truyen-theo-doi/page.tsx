"use client";
import React from "react";
import { Col, Flex, Row, Pagination, ConfigProvider, Button } from "antd";
import Top1time from "../ui/TopTimeManga/Top1time";
import TimeManga from "../ui/TopTimeManga/TimeManga";
import MangaCart from "../ui/MangaCart/MangaCart";
import useUser from "@/hooks/useUser";
import useMangaFollowID from "@/hooks/follow/useMangaFollowID";
import NeedLogin from "../ui/NeedLogin";
//code lại more khi tràn thể loại
//chỉnh sửa đường dẫn tương đối image giữa các file
//lỗi flex nhiều màn hình image
//chinh top item thanh component
function Truyentheodoi() {
  const { data: user, isLoading: userLoading, isError: userError } = useUser();
  const {
    data: mids,
    isSuccess: midsSuccess,
    isLoading: midsLoading,
    isError: midsError,
  } = useMangaFollowID(user?.user?.id);

  if (userLoading || midsLoading) {
    return <div>Loading...</div>;
  }

  if (userError || midsError || !user || (!mids && user.user != null)) {
    return <div>Error</div>;
  }

  if (user.user == null) {
    return <NeedLogin />;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-row gap-x-4">
        <div className=" lg:basis-2/3">
          <p style={{ fontSize: 0.01 }}>.</p>
          {/*collision tăng chiều cao cho div*/}
          <p
            className=" title text-xl md:text-3xl"
            onClick={() => {
              console.log(mids);
            }}
            style={{ marginBottom: 5, marginTop: 50 }}
          >
            Truyện theo dõi
          </p>
          <div style={{ marginTop: 15 }}>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 8, sm: 16, md: 24, lg: 32 },
              ]}
              className="flex flex-row"
            >
              {midsSuccess ? (
                mids?.map((item) => (
                  <Col className=" min-[0px]:basis-1/2 min-[500px]:basis-1/3 md:basis-1/4">
                    <MangaCart mangaid={item.manga_id} />
                  </Col>
                ))
              ) : (
                <></>
              )}
            </Row>
          </div>
          {/* <div className="pagination">
              <Pagination defaultCurrent={1} total={50} />
            </div> */}
        </div>
        {/*Xếp hạng theo mốc thời gian*/}
        <div className="basis-1/3 hidden lg:block">
          <div className="xemnhieunhattitle" style={{ marginTop: 90 }}>
            <img
              src="https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/StarIcon.png?t=2024-04-14T04%3A02%3A12.916Z"
              height={40}
              width={40}
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
            <Top1time />
            <TimeManga keyy={1} />
            <TimeManga keyy={3} />
            <TimeManga keyy={5} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Truyentheodoi;
export {};
// bug khi reload, fix sau
