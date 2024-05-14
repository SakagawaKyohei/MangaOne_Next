import useAddMessageBox from "@/hooks/messages/useAddMessageBox";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { useState } from "react";

interface comment {
  avt: string;
  ho: string;
  name: string;
  text: string;
  uid: string;
  uid2: string;
}
function CommentComponent(pros: comment) {
  const addmessagebox = useAddMessageBox(pros.uid as any, pros.uid2);
  return (
    <div style={{ display: "flex" }}>
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
      <div
        style={{
          border: "1px solid #d8d8d8",
          width: "95%",
          marginBottom: 35,
        }}
      >
        <Link
          href={`/messages/${pros.uid}/${pros.uid2}`}
          onClick={() => {
            addmessagebox.mutate();
          }}
        >
          <p
            style={{
              margin: 8,
              fontWeight: "bold",
              color: "#ff9040",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {pros.name == null ? (
              <></>
            ) : (
              <div style={{ marginRight: 4 }}> {pros.name}</div>
            )}
            {pros.ho}
          </p>
        </Link>

        <div style={{ border: "1px solid #d8d8d8", margin: 8 }} />
        <p style={{ marginLeft: 8, margin: 12 }}>{pros.text}</p>
      </div>
    </div>
  );
}

export default CommentComponent;
