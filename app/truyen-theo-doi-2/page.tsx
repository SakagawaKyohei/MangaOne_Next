"use client";
import React from "react";
import { Button, Col, Form, Input, Pagination, Row } from "antd";

import NeedLogin from "../ui/NeedLogin";
import MangaCart from "../ui/MangaCart/MangaCart";
import useUser from "@/hooks/useUser";
import useMangaFollowID from "@/hooks/follow/useMangaFollowID";
import AccountPage from "../ui/AccountPage/AccountPage";

function TruyenTheoDoi2() {
  const style2: React.CSSProperties = {
    fontSize: 18,
  };
  const input2: React.CSSProperties = {
    fontSize: 18,
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
  };
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
    <div>
      <p style={{ fontSize: 0.01 }}>.</p>
      <div style={{ marginBottom: 30, marginTop: 80 }}>
        <div className="flex flex row gap-12 m-4 md:m-8 lg:ml-0">
          <div className="hidden basis-1/4 lg:block">
            <AccountPage i={1} />
          </div>
          <div className="lg:basis-3/4 text-xl">
            <h1
              style={{
                textAlign: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              TRUYỆN THEO DÕI
            </h1>
            <div style={style2}>
              <Row className="flex flex-row" gutter={[16, 24]}>
                {midsSuccess ? (
                  mids?.map((item) => (
                    <Col
                      key={item.manga_id}
                      className=" min-[0px]:basis-1/2 min-[500px]:basis-1/3 md:basis-1/4"
                    >
                      <MangaCart mangaid={item.manga_id} />
                    </Col>
                  ))
                ) : (
                  <></>
                )}
              </Row>
              {/* <div
                className="chuyenhuong"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "end",
                  marginTop: 20,
                }}
              >
                <mdIcons.MdArrowBackIos
                  fontSize={35}
                  style={{ marginRight: 8 }}
                />
                <h1 style={{ color: "#FF9040", fontSize: 30 }}>1</h1>
                <mdIcons.MdArrowForwardIos
                  fontSize={35}
                  style={{ marginLeft: 16 }}
                />
              </div> */}
            </div>
            {/*custom lai*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TruyenTheoDoi2;
export {};
