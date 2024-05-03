"use client";
// import { TruyenDaDangData } from "../Data/ComponentData";
import useUser from "../../hooks/useUser";
import { Col, Row } from "antd";
import AccountPage from "../ui/AccountPage/AccountPage";
import NeedLogin from "../ui/NeedLogin";
import { TruyenDaDangData } from "../ui/Data/ComponentData";
import AccountPageRow from "../ui/AccountPage/AccountPageRow";

function TruyenDaDang() {
  const { data: user, isLoading, isError } = useUser();
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
            <div className="flex flex row gap-12 m-4 md:m-8 md:ml-0">
              <div className="hidden basis-1/4 md:block ">
                <AccountPage i={2} />
              </div>
              <div className="md:basis-3/4 text-basic w-full">
                <h1
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 20,
                    fontSize: 21,
                  }}
                >
                  TRUYỆN ĐÃ ĐĂNG
                </h1>
                <div className="khung">
                  <p style={{ fontSize: 17, padding: 15 }}>
                    Danh sách truyện đã đăng
                  </p>
                  <div
                    style={{
                      width: "100%",
                      height: 3,
                      backgroundColor: "#D9D9D9",
                    }}
                  />
                  <TruyenDaDangData />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TruyenDaDang;
export {};
