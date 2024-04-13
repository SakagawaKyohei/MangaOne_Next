"use client";
import React from "react";
import { Col, Form, Row } from "antd";

import AccountPage from "../ui/AccountPage/AccountPage";
import useUser from "@/hooks/useUser";
import NeedLogin from "../ui/NeedLogin";
import { InputChangePass } from "../ui/Data/InputData";

function Doimaukhau() {
  const style2: React.CSSProperties = {
    marginBottom: 12,
    marginRight: 20,
    fontSize: 18,
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
            <AccountPage i={4} />
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
              ĐỔI MẬT KHẨU
            </h1>
            <div
              style={{
                marginTop: 25,
                marginBottom: 25,
                marginRight: 35,
              }}
            >
              <div>
                <Form>
                  <div>
                    <InputChangePass />
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Doimaukhau;
export {};
