"use client";
// import { TruyenDaDangData } from "../Data/ComponentData";
import useUser from "../../hooks/useUser";
import { Col, Row } from "antd";
import AccountPage from "../ui/AccountPage/AccountPage";
import NeedLogin from "../ui/NeedLogin";
import { AdminData, GiaoDichData } from "../ui/Data/ComponentData";
import AccountPageRow from "../ui/AccountPage/AccountPageRow";
import useUpdateUserRole from "@/hooks/Admin/useUpdateUserRole";
import { useState } from "react";
import useBillAll from "@/hooks/O-coin/useBillAll";

function GiaoDich() {
  const { data: user, isLoading, isError } = useUser();
  const { data: billall, isLoading: bal, isError: bae } = useBillAll();
  if (user?.user == null) {
    return <NeedLogin />;
  }
  return (
    <div>
      <div>
        <div>
          <p style={{ fontSize: 0.01 }}>.</p>
          <div style={{ marginBottom: 30, marginTop: 80 }}>
            <div className="md:hidden">
              <AccountPageRow i={2} />
            </div>
            <div className="flex flex row gap-12 m-4 md:m-8">
              <div className="text-basic w-full">
                <h1
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 20,
                    fontSize: 21,
                  }}
                >
                  QUẢN LÝ GIAO DỊCH
                </h1>
                <div className="khung">
                  <p style={{ fontSize: 17, padding: 15 }}>Danh sách yêu cầu</p>
                  <div
                    style={{
                      width: "100%",
                      height: 3,
                      backgroundColor: "#D9D9D9",
                    }}
                  />
                  <GiaoDichData />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiaoDich;
export {};
