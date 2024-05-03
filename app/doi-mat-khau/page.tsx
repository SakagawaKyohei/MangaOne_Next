"use client";
import React from "react";
import { Col, Form, Row } from "antd";

import AccountPage from "../ui/AccountPage/AccountPage";
import useUser from "@/hooks/useUser";
import NeedLogin from "../ui/NeedLogin";
import { InputChangePass } from "../ui/Data/InputData";
import AccountPageRow from "../ui/AccountPage/AccountPageRow";

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
        <div className="md:hidden">
          <AccountPageRow i={4} />
        </div>
        <div className="flex flex row gap-12 m-4 md:m-8 md:ml-0">
          <div className="hidden basis-1/4 md:block">
            <AccountPage i={4} />
          </div>
          <div className="md:basis-3/4 text-basic w-full">
            <h1
              style={{
                textAlign: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
              className="text-xl"
            >
              ĐỔI MẬT KHẨU
            </h1>
            <div
              style={{
                marginTop: 25,
                marginBottom: 25,
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doimaukhau;
export {};
