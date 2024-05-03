"use client";
import React, { useRef, useState } from "react";
import { Col, ConfigProvider, Form, Input, Row } from "antd";
import NeedLogin from "../ui/NeedLogin";
import useUser from "@/hooks/useUser";
import AccountPage from "../ui/AccountPage/AccountPage";
import { InputInfo } from "../ui/Data/InputData";
import AccountPageRow from "../ui/AccountPage/AccountPageRow";

function Trangcanhan() {
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

  {
    /*nghien cuu cach crop cho hop vi tri sau*/
  }

  return (
    <div>
      <p style={{ fontSize: 0.01 }}>.</p>
      <div style={{ marginBottom: 30, marginTop: 80 }}>
        <div className="md:hidden">
          <AccountPageRow i={0} />
        </div>
        <div className="flex flex row gap-12 m-4 md:m-8 md:ml-0">
          <div className="hidden basis-1/4 md:block ">
            <AccountPage i={0} />
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
              THÔNG TIN TÀI KHOẢN
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
                    {" "}
                    <InputInfo />{" "}
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

export default Trangcanhan;
export {};
