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
      <div
        style={{
          marginLeft: 35,
          marginRight: 35,
        }}
      >
        {/*truyen moi cap nhat*/}
        {/*danh sách truyện*/}
        <Row gutter={16}>
          <Col span={16}>
            <p style={{ fontSize: 0.01 }}>.</p>{" "}
            {/*collision tăng chiều cao cho div*/}
            <p
              className="title"
              onClick={() => {
                console.log(mids);
              }}
              style={{ marginBottom: 30, marginTop: 90 }}
            >
              Truyện theo dõi
            </p>
            <div style={{ marginTop: 20 }}>
              <Row gutter={[16, 24]}>
                {midsSuccess ? (
                  mids?.map((item) => (
                    <Col span={6} key={item.manga_id}>
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
          </Col>
          {/*Xếp hạng theo mốc thời gian*/}
          <Col span={8}>
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
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}

export default Truyentheodoi;
export {};
// bug khi reload, fix sau
