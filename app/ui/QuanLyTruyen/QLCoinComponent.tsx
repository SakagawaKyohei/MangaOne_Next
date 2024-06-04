import { Col, Modal, Row, Tooltip } from "antd";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useNoti from "@/hooks/noti/useNoti";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import useChuyenTien from "@/hooks/Admin/useChuyenTien";
interface Pros {
  mayeucau: string;

  ho: string;
  ngaygui: any;
  keyy: string;
  setmangaid: any;
  ten: string;
  stk: string;
  sotien: string;
  memid: any;
  trangthai: boolean;
}

//component cho mỗi truyện đã đăng

function QLCoinComponent(pros: Pros) {
  const [open, setOpen] = useState(false);
  const id = uuidv4();

  const { confirm } = Modal;
  const chuyentien = useChuyenTien(pros.mayeucau);
  const notiuser = useNoti(
    pros.memid,
    "Số O-Coin đã được chuyển thành tiền mặt và gửi đến tài khoản ngân hàng của bạn",
    "done",
    pros.mayeucau
  );

  const showchuyenkhoanConfirm = () => {
    confirm({
      title: "Bạn xác nhận đã chuyển khoản?",
      icon: <ExclamationCircleFilled />,
      content: "Hệ thống ghi nhận chuyển khoản hoàn tất",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        chuyentien.mutate();
        notiuser.mutate();
        window.location.reload();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

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
    <div style={{ backgroundColor: "rgba(217, 217, 217, 0.20)" }}>
      <Row
        style={{
          backgroundColor: "rgba(217, 217, 217, 0.20)",
          height: 40,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col
          style={{
            width: "20%",
            paddingRight: "10%",
            padding: 5,
            paddingTop: 0,
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "row", marginLeft: 10 }}
            className="hidden sm:flex"
          >
            <p className="text-xs sm:text-base">{pros.mayeucau.slice(0, 8)}</p>
            <p>...</p>
            <p className="text-xs sm:text-base">{pros.mayeucau.slice(-8)}</p>
          </div>
        </Col>
        <Col
          style={{
            padding: 5,
            paddingTop: 0,
            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            width: "21%",
          }}
          className="text-xs sm:text-base"
        >
          {pros.ho || pros.ten ? pros.ho : "Blank name"}
          <p style={{ marginLeft: 5 }}> {pros.ten}</p>
        </Col>
        <Col
          style={{
            padding: 5,
            paddingTop: 0,
            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            width: "19%",
          }}
          className="text-xs sm:text-base"
        >
          {convertToVietnameseDateFormat(pros.ngaygui)}
        </Col>
        <Col
          style={{
            width: "19%",

            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
          className="text-xs sm:text-base"
        >
          <p>{pros.stk.slice(1, -1)}</p>
        </Col>
        <Col
          style={{
            width: "10%",

            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
          className="text-xs sm:text-base"
        >
          <p>{pros.sotien}</p>
        </Col>
        <Col
          style={{
            width: "2%",
            padding: 0.001,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="text-xs sm:text-base"
        ></Col>
        {pros.trangthai ? (
          <p style={{ color: "Green", fontWeight: "bold" }}>Done</p>
        ) : (
          <Col className="flex flex-col sm:flex-row">
            <Tooltip title="Đã chuyển khoản">
              <IoCheckmarkDoneCircleSharp
                style={{ color: "green" }}
                className="text-xl sm:text-xxl sm:ml-4"
                onClick={showchuyenkhoanConfirm}
              />
            </Tooltip>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default QLCoinComponent;
