"use client";
import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import NeedLogin from "../ui/NeedLogin";
import useUser from "@/hooks/useUser";
import AccountPage from "../ui/AccountPage/AccountPage";
import AccountPageRow from "../ui/AccountPage/AccountPageRow";

function Diemthuong() {
  const style2: React.CSSProperties = {
    marginBottom: 20,

    display: "flex",
    flexDirection: "row",
  };
  const input2: React.CSSProperties = {
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
  };
  const { data: user, isLoading, isError } = useUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <div>Error</div>;
  }

  if (user.user == null) {
    return <NeedLogin />;
  }
  return (
    <div>
      <p style={{ fontSize: 0.01 }}>.</p>
      <div style={{ marginBottom: 30, marginTop: 80 }}>
        <div className="md:hidden">
          <AccountPageRow i={3} />
        </div>

        <div className="flex flex row gap-12 m-4 md:m-8 md:ml-0">
          <div className="hidden basis-1/4 md:block">
            <AccountPage i={3} />
          </div>
          <div className="md:basis-3/4 text-xl ">
            <h1
              style={{
                textAlign: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
              className="md:text-xl"
            >
              ĐIỂM DỊCH TRUYỆN
            </h1>
            <p style={style2} className="text-base md:text-lg">
              Điểm dịch truyện có thể quy đổi ra tiền mặt, mỗi điểm tương ứng
              1.000đ. Mỗi 500 view truyện bạn dịch sẽ nhận được 1 điểm dịch
              truyện
            </p>
            <div style={style2}>
              <p className="text-base md:text-lg">Điểm hiện tại của bạn:</p>
              <p
                style={{ color: "red", marginLeft: 5 }}
                className="text-base md:text-lg"
              >
                0
              </p>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  backgroundColor: "#FF9040",
                  color: "white",

                  marginLeft: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                className="text-base md:text-lg"
              >
                {/*custom lai*/}
                Rút tiền
              </Button>
            </div>
            <div style={{}}>
              <div
                style={{
                  marginBottom: 30,
                }}
              >
                <div style={style2} className="text-base md:text-lg">
                  Số tài khoản ngân hàng
                  <p style={{ color: "red", marginLeft: 5 }}>*</p>
                </div>
                <Input style={input2}></Input>
              </div>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 0,
                    backgroundColor: "#FF9040",
                    color: "white",

                    height: 38,
                  }}
                  className="text-base md:text-lg"
                >
                  <p>Cập nhật</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diemthuong;
export {};
