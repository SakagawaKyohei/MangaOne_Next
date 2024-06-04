import {
  Button,
  Checkbox,
  Col,
  Input,
  Modal,
  Popover,
  Row,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import Link from "next/link";
import useChapterQuery from "@/hooks/ChapterQuery/useChapterQuery";
import { FaBan } from "react-icons/fa";
import { IoMdWarning } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { AiOutlineUnlock } from "react-icons/ai";
import useUpdateUserRole from "@/hooks/Admin/useUpdateUserRole";
import useNoti from "@/hooks/noti/useNoti";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
interface Pros {
  tentruyen: string;
  mangaid: string;
  nguoidang: string;
  soluotxem: string;
  checkall: boolean;
  keyy: string;
  setmangaid: any;
  ten: string;
}

//component cho mỗi truyện đã đăng

function QLUComponent(pros: Pros) {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const { confirm } = Modal;
  const showbannedConfirm = () => {
    confirm({
      title: "Bạn muốn cấm người dùng?",
      icon: <ExclamationCircleFilled />,
      content: "Người dùng đang chọn sẽ bị cấm",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        setrole("banned");
        updaterole.mutate();
        window.location.reload();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const showunlockConfirm = () => {
    confirm({
      title: "Bạn muốn hủy cấm người dùng?",
      icon: <ExclamationCircleFilled />,
      content: "Người dùng đang chọn sẽ được hủy cấm",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        setrole("user");
        updaterole.mutate();
        window.location.reload();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const showwarningConfirm = () => {
    confirm({
      title: "Bạn muốn cảnh cáo người dùng?",
      icon: <ExclamationCircleFilled />,
      content: "Người dùng đang chọn sẽ bị cảnh cáo",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        setrole("warned");
        updaterole.mutate();
        warning.mutate();
        window.location.reload();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const chapter = useChapterQuery(pros.mangaid);
  const [prev, setprev] = useState(false);
  const [checked, setchecked] = useState(pros.checkall);
  const [role, setrole] = useState("user");
  const [warningmessage, setwarningmessage] = useState("");
  const warning = useNoti(pros.mangaid, warningmessage, "warned", "");
  const updaterole = useUpdateUserRole(role, pros.mangaid);
  if (prev != pros.checkall) {
    setchecked(pros.checkall);
    setprev(pros.checkall);
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
            width: "35%",
            paddingRight: "10%",
            padding: 5,
            paddingTop: 0,
          }}
        >
          <Checkbox
            style={{ marginLeft: 10 }}
            checked={checked}
            onChange={(e) => {
              setchecked(!checked);
              if (e.target.checked) {
                pros.setmangaid((prevArray: any) => [
                  ...prevArray,
                  pros.mangaid,
                ]);
              }
              if (!e.target.checked) {
                pros.setmangaid((prevArray: any[]) =>
                  prevArray.filter((item) => item !== pros.mangaid)
                );
              }
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "row" }}
              className="hidden sm:flex"
            >
              <p className="text-xs sm:text-base">
                {pros.tentruyen.slice(0, 15)}
              </p>
              <p>...</p>
              <p className="text-xs sm:text-base">
                {pros.tentruyen.slice(-15)}
              </p>
            </div>
          </Checkbox>
        </Col>
        <Col
          style={{
            padding: 5,
            paddingTop: 0,
            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            width: "23%",
          }}
          className="text-xs sm:text-base"
        >
          {pros.soluotxem || pros.ten ? pros.soluotxem : "Blank name"}
          <p style={{ marginLeft: 5 }}> {pros.ten}</p>
        </Col>
        <Col
          style={{
            width: "25%",

            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
          className="text-xs sm:text-base"
        >
          <p>{pros.nguoidang}</p>
        </Col>
        <Col
          style={{
            padding: 0.001,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="text-xs sm:text-base"
        ></Col>
        <Col className="flex flex-col sm:flex-row">
          <Popover
            content={
              <div style={{ overflow: "auto" }}>
                <Input
                  style={{ float: "left", marginBottom: 15 }}
                  size="small"
                  onChange={(e) => {
                    setwarningmessage(e.target.value);
                  }}
                />
                <Button style={{ float: "left" }} onClick={showwarningConfirm}>
                  Xác nhận
                </Button>
                <Button onClick={hide} style={{ float: "right" }}>
                  Close
                </Button>
              </div>
            }
            title="Nội dung cảnh báo"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            {pros.nguoidang == "banned" ? (
              <></>
            ) : (
              <Tooltip title="Cảnh báo người dùng">
                <IoWarning
                  style={{ color: "#FFA500" }}
                  className="text-sm sm:text-lg sm:ml-4"
                  onClick={() => {
                    setrole("warned");
                    updaterole.mutate();
                  }}
                />
              </Tooltip>
            )}
          </Popover>

          {pros.nguoidang == "banned" ? (
            <>
              {" "}
              <Tooltip title="Hủy cấm người dùng">
                <div>
                  <AiOutlineUnlock
                    style={{ color: "green" }}
                    className="text-sm sm:text-lg sm:ml-4"
                    onClick={showunlockConfirm}
                  />
                </div>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Cấm người dùng">
                <div>
                  <FaBan
                    style={{ color: "red" }}
                    className="text-sm sm:text-lg sm:ml-4"
                    onClick={showbannedConfirm}
                  />
                </div>
              </Tooltip>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default QLUComponent;
export {};
