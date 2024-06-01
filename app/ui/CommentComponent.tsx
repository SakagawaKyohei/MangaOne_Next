import useAddMessageBox from "@/hooks/messages/useAddMessageBox";
import useUser from "@/hooks/useUser";
import { Modal, Popover } from "antd";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import NeedLogin from "./NeedLogin";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useDeleteComment from "@/hooks/comment/useDeleteComment";
import useNoti from "@/hooks/noti/useNoti";
import useUpdateUserRole from "@/hooks/Admin/useUpdateUserRole";

interface comment {
  id: any;
  avt: string;
  ho: string;
  name: string;
  text: string;
  uid: string;
  uid2: string;
  onDataUpdate: (newData: string) => void;
  onidUpdate: (newid: string) => void;
}
function CommentComponent(pros: comment) {
  const { confirm } = Modal;
  const [role, setrole] = useState("user");
  const [warningmessage, setwarningmessage] = useState("");
  const warning = useNoti(pros.uid2, warningmessage, "warned");
  const updaterole = useUpdateUserRole(role, pros.uid2);
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
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
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
  const handleChange = (newData: string) => {
    pros.onDataUpdate(newData);
  };
  const handleidChange = (newid: string) => {
    pros.onidUpdate(newid);
  };
  const { data: user, isLoading, isError } = useUser();
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const addmessagebox = useAddMessageBox(pros.uid as any, pros.uid2);
  const deletecomment = useDeleteComment(pros.id);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ maxWidth: "max-content" }} className="threedot">
        <Link
          href={`/messages/${pros.uid}/${pros.uid2}`}
          onClick={() => {
            addmessagebox.mutate();
          }}
        >
          <img
            src={pros.avt}
            style={{ width: 42, height: 43, marginRight: 15 }}
          />
        </Link>
        {user?.user?.user_metadata.role != "admin" ||
        user.user.id == pros.uid2 ? (
          <></>
        ) : (
          <>
            <Popover
              content={
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <button
                    onClick={() => {
                      deletecomment.mutate();
                      setOpen(false);
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>Xóa bình luận</p>
                  </button>
                  <button onClick={showwarningConfirm}>
                    {" "}
                    <p style={{ marginTop: 10, fontWeight: "bold" }}>
                      Cảnh cáo người dùng
                    </p>
                  </button>
                  <button onClick={showbannedConfirm}>
                    <p style={{ marginTop: 10, fontWeight: "bold" }}>
                      Cấm người dùng
                    </p>
                  </button>
                </div>
              }
              title=""
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <div>
                <AiOutlineEllipsis
                  style={{ fontSize: 30, marginTop: 5, marginLeft: 5 }}
                />
              </div>
            </Popover>
          </>
        )}
        {user?.user?.id != pros.uid2 ? (
          <></>
        ) : (
          <>
            <Popover
              content={
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <button>
                    <p
                      style={{ fontWeight: "bold" }}
                      onClick={() => {
                        handleChange(pros.text);
                        handleidChange(pros.id);
                        setOpen(false);
                      }}
                    >
                      Chỉnh sửa bình luận
                    </p>
                  </button>
                  <button
                    onClick={() => {
                      deletecomment.mutate();
                    }}
                  >
                    <p style={{ marginTop: 10, fontWeight: "bold" }}>
                      Xóa bình luận
                    </p>
                  </button>
                </div>
              }
              title=""
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <div>
                <AiOutlineEllipsis
                  style={{ fontSize: 30, marginTop: 5, marginLeft: 5 }}
                />
              </div>
            </Popover>
          </>
        )}
      </div>

      <div
        style={{
          border: "1px solid #d8d8d8",
          width: "95%",

          marginBottom: 35,
        }}
      >
        <p
          style={{
            margin: 8,
            fontWeight: "bold",
            color: "#ff9040",
            display: "flex",
            maxWidth: "max-content",
            flexDirection: "row",
          }}
        >
          <Link
            href={`/messages/${pros.uid}/${pros.uid2}`}
            onClick={() => {
              addmessagebox.mutate();
            }}
          >
            {pros.name == null ? (
              <></>
            ) : (
              <p style={{ marginRight: 4 }}> {pros.name}</p>
            )}
          </Link>
          <Link
            href={`/messages/${pros.uid}/${pros.uid2}`}
            onClick={() => {
              addmessagebox.mutate();
            }}
          >
            {pros.ho}
          </Link>
        </p>

        <div style={{ border: "1px solid #d8d8d8", margin: 8 }} />
        <p style={{ marginLeft: 8, margin: 12 }}>{pros.text}</p>
      </div>
    </div>
  );
}

export default CommentComponent;
