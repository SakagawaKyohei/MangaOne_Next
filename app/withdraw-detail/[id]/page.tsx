"use client";

import { AdminData } from "@/app/ui/Data/ComponentData";
import NeedLogin from "@/app/ui/NeedLogin";
import useBill from "@/hooks/O-coin/useBill";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";

// import { TruyenDaDangData } from "../Data/ComponentData";

function WithrawDetail() {
  const { data: user, isLoading, isError } = useUser();
  const params = useParams<{ id: string }>();
  const { data: bill, isLoading: bl, isError: be } = useBill(params.id);
  if (user?.user == null) {
    return <NeedLogin />;
  }
  if (bl) {
    return <>loading</>;
  }

  if (be || !bill) {
    return <>error</>;
  }
  console.log(bill[0]["trangthai"]);

  function convertToVietnameseDateFormat(dateTimeString: any) {
    // Chuyển đổi thành đối tượng Date
    const originalDate = new Date(dateTimeString);

    // Đặt múi giờ Việt Nam (UTC+7)
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    // Format the date using the Vietnamese locale and the specified options
    const vietnameseDateTimeFormat = originalDate.toLocaleDateString(
      "vi-VN",
      options
    );

    return vietnameseDateTimeFormat;
  }

  return (
    <div>
      <div>
        <div>
          <p style={{ fontSize: 0.01 }}>.</p>
          <div style={{ marginBottom: 30, marginTop: 80 }}>
            <div className="md:hidden"></div>
            <div className="flex flex row gap-12 m-4 md:m-8">
              <div className="text-basic w-full">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    className="khung"
                    style={{ width: "70%", marginTop: "10vh" }}
                  >
                    <p style={{ fontSize: 17, padding: 15 }}>
                      Thông tin rút tiền
                    </p>
                  </div>
                  <div className="khung" style={{ width: "70%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "55%" }}>
                        <p style={{ fontSize: 17, padding: 15 }}>
                          Mã yêu cầu: {" " + params.id}
                        </p>
                        <p
                          style={{
                            fontSize: 17,
                            padding: 15,
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <p style={{ marginRight: 3 }}>Người gửi yêu cầu:</p>
                          {(bill[0]["ho"] as string).slice(1, -1) +
                            " " +
                            (bill[0]["ten"] as string).slice(1, -1)}
                        </p>
                        <p style={{ fontSize: 17, padding: 15 }}>
                          Số tài khoản:
                          {" " + (bill[0]["stk"] as string).slice(1, -1)}
                        </p>
                      </div>
                      <div style={{ float: "right" }}>
                        <p style={{ fontSize: 17, padding: 15 }}>
                          Số O-coin: {" " + bill[0]["ocoin"]}
                        </p>
                        <p style={{ fontSize: 17, padding: 15 }}>
                          Gửi yêu cầu lúc:{" "}
                          {convertToVietnameseDateFormat(bill[0]["ngaygui"])}
                        </p>
                        <p
                          style={{
                            fontSize: 17,
                            padding: 15,
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          Ngày nhận tiền:
                          {!bill[0]["trangthai"] ? (
                            <p style={{ marginLeft: 3 }}>N/A</p>
                          ) : (
                            <p style={{ marginLeft: 3 }}>
                              {convertToVietnameseDateFormat(
                                bill[0]["ngaynhan"]
                              )}
                            </p>
                          )}
                        </p>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 17,
                        padding: 15,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      {!bill[0]["trangthai"] ? (
                        <p
                          style={{
                            margin: "0 auto",
                            color: "#FFA500",
                          }}
                        >
                          ĐANG XỬ LÝ
                        </p>
                      ) : (
                        <p
                          style={{
                            color: "green",
                            margin: "0 auto",
                          }}
                        >
                          ĐÃ NHẬN TIỀN
                        </p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithrawDetail;
export {};
