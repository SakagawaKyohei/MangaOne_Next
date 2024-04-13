"use client";
import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import NeedLogin from "../ui/NeedLogin";
import useUser from "@/hooks/useUser";
import AccountPage from "../ui/AccountPage/AccountPage";

function Diemthuong() {
  const style2: React.CSSProperties = {
    marginBottom: 20,
    marginRight: 40,
    fontSize: 18,
    display: "flex",
    flexDirection: "row",
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
        <Row>
          <Col span={6}>
            <AccountPage i={3} />
          </Col>
          <Col span={17} offset={1}>
            <h1
              style={{
                textAlign: "center",
                marginTop: 10,
                marginBottom: 20,
                fontSize: 23,
              }}
            >
              ĐIỂM DỊCH TRUYỆN
            </h1>
            <p style={style2}>
              Điểm dịch truyện có thể quy đổi ra tiền mặt, mỗi điểm tương ứng
              1.000đ. Mỗi 500 view truyện bạn dịch sẽ nhận được 1 điểm dịch
              truyện
            </p>
            <div style={style2}>
              <p>Điểm hiện tại của bạn:</p>
              <p style={{ color: "red", marginLeft: 5 }}>0</p>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  backgroundColor: "#FF9040",
                  color: "white",
                  fontSize: 16,

                  marginLeft: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                {/*custom lai*/}
                Rút tiền
              </Button>
            </div>
            <div
              style={{
                marginRight: 40,
              }}
            >
              <div
                style={{
                  marginBottom: 30,
                }}
              >
                <div style={style2}>
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
                    fontSize: 18,
                    height: 38,
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingLeft: 30,
                    paddingRight: 30,
                  }}
                >
                  <p>Cập nhật</p>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Diemthuong;
export {};
