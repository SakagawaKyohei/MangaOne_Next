"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Popover, Row, message } from "antd";
import NeedLogin from "../ui/NeedLogin";
import useUser from "@/hooks/useUser";
import AccountPage from "../ui/AccountPage/AccountPage";
import AccountPageRow from "../ui/AccountPage/AccountPageRow";
import useUpdateUserMetadata from "@/hooks/loginsystem/useUpdateUserMetadata";
import upload from "antd/es/upload";
import useTotalView from "@/hooks/O-coin/useTotalView";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useWithraw from "@/hooks/O-coin/useWithraw";
import useTotalWith from "@/hooks/O-coin/useTotalWith";
import useSupabase from "@/hooks/useSupabase";

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
  const {
    data: coin1,
    isLoading: cl,
    isError: ce,
  } = useTotalView(user?.user?.id as any);
  const {
    data: twith,
    isLoading: twl,
    isError: twe,
    refetch: rw,
  } = useTotalWith(user?.user?.id as any);
  const supabase = useSupabase();
  const [soluong, setsoluong] = useState(0);
  const withraw = useWithraw(user?.user?.id, soluong);
  const [show, setshow] = useState(false);
  const [ten, setten] = useState("");
  const [ho, setho] = useState("");
  const [sdt, setsdt] = useState("");
  const [coin, setcoin] = useState(0);
  const [avt, setavt] = useState("");
  const [stk, setstk] = useState("");
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (user) {
      setten(user?.user?.user_metadata.ten);
      setho(user?.user?.user_metadata.ho);
      setsdt(user?.user?.user_metadata.sdt);
      setcoin(user?.user?.user_metadata.coin);
      setavt(user?.user?.user_metadata.avt);
      setstk(user?.user?.user_metadata.stk);
    }
  }, [user]);
  useEffect(() => {
    const channel = supabase
      .channel("giaodich")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "giaodich" },
        async (payload) => {
          rw();
        }
      )
      .subscribe();
  }, []);

  const user1 = {
    ten: ten,
    ho: ho,
    sdt: sdt,
    stk: stk,
    coin: coin,
    avt: avt,
  };
  const updatemetadata = useUpdateUserMetadata(user1 as any);

  if (isLoading || cl || twl) {
    return <div>Loading...</div>;
  }

  if (isError || !user || !coin1 || ce || !twith || twe) {
    return <div>Error</div>;
  }

  if (user.user == null) {
    return <NeedLogin />;
  }

  if (updatemetadata.isSuccess) {
    message.success("Cập nhật thông tin thành công");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  console.log(coin1[0]["avg"]);
  if (updatemetadata.isError) {
    console.log(updatemetadata.error as any);
  }

  // Return your component JSX here

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
              1đ. Mỗi 1 view truyện bạn dịch sẽ nhận được 1 điểm dịch truyện
            </p>
            <div style={style2}>
              <p className="text-base md:text-lg">Điểm hiện tại của bạn:</p>
              <p
                style={{ color: "red", marginLeft: 5 }}
                className="text-base md:text-lg"
              >
                {coin1[0]["avg"] - twith[0]["totalwith"]}
              </p>
              <Popover
                content={
                  <div style={{ overflow: "auto" }}>
                    <Input
                      style={{ float: "left", marginBottom: 15 }}
                      size="small"
                      onChange={(e) => {
                        setsoluong(e.target.value as any);
                      }}
                    />
                    {show ? (
                      <div
                        style={{
                          width: "28vw",
                          color: "red",
                          marginBottom: 10,
                        }}
                      >
                        Bạn không đủ số O-Coin
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "28vw",
                          color: "red",
                          marginBottom: 10,
                        }}
                      ></div>
                    )}

                    <Button
                      style={{ float: "left" }}
                      onClick={() => {
                        if (
                          coin1[0]["avg"] - twith[0]["totalwith"] - soluong <
                          0
                        ) {
                          setshow(true);
                        } else {
                          setshow(false);
                          setOpen(false);
                          withraw.mutate();
                          message.success("Gửi yêu cầu rút tiền thành công");
                        }
                      }}
                    >
                      Xác nhận
                    </Button>
                    <Button onClick={hide} style={{ float: "right" }}>
                      Close
                    </Button>
                  </div>
                }
                title="Số tiền bạn muốn rút"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
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
              </Popover>
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
                <Input
                  style={input2}
                  onChange={(e) => {
                    setstk(e.target.value);
                  }}
                  defaultValue={stk}
                  value={stk}
                ></Input>
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
                  onClick={() => {
                    updatemetadata.mutate();
                  }}
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
