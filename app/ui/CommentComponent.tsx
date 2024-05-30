import useAddMessageBox from "@/hooks/messages/useAddMessageBox";
import useUser from "@/hooks/useUser";
import { Popover } from "antd";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import NeedLogin from "./NeedLogin";

interface comment {
  avt: string;
  ho: string;
  name: string;
  text: string;
  uid: string;
  uid2: string;
}
function CommentComponent(pros: comment) {
  const { data: user, isLoading, isError } = useUser();
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const addmessagebox = useAddMessageBox(pros.uid as any, pros.uid2);
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
                <div>
                  <p style={{ fontWeight: "bold" }}>Xóa bình luận</p>
                  <p style={{ marginTop: 10, fontWeight: "bold" }}>
                    Cảnh cáo người dùng
                  </p>
                  <p style={{ marginTop: 10, fontWeight: "bold" }}>
                    Cấm người dùng
                  </p>
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
        {user?.user?.user_metadata.role == "admin" ||
        user?.user?.id != pros.uid2 ? (
          <></>
        ) : (
          <>
            <Popover
              content={
                <div>
                  <p style={{ fontWeight: "bold" }}>Chỉnh sửa bình luận</p>
                  <p style={{ marginTop: 10, fontWeight: "bold" }}>
                    Xóa bình luận
                  </p>
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
