"use client";
import React, { useState } from "react";

import { Button, Form, Input, message } from "antd";
import "../dang-nhap/login.css";
import useSendmail from "../../hooks/PasswordManagement/useSendMail";
import Link from "next/link";
function QuenMatKhau() {
  const [mail, setMail] = useState("");
  const sendmail = useSendmail(mail);
  if (sendmail.isSuccess) {
    message.success(
      "Hướng dẫn khôi phục tài khoản đã được gửi đến mail của bạn"
    );
  }
  const InputStyle: React.CSSProperties = {
    border: "none",
    borderRadius: 5,
    width: 350,
    marginTop: 5,
    height: 30,

    backgroundColor: "rgba(61, 65, 74, 1)",
    color: "white",
    zIndex: 6,
    fontSize: 16,
  };
  const ButtonStyle: React.CSSProperties = {
    marginTop: 20,
    width: 350,
    height: 33,
    borderRadius: 0,
    border: "none",
    zIndex: 6,
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor: "rgba(235, 190, 101, 1)",
  };
  if (sendmail.isError) {
    return <>{(sendmail.error as any)?.message}</>;
  }

  return (
    <div className="Black">
      <div className="center1">
        <Link
          href="/"
          style={{
            display: "flex",
            textDecoration: "none",
            color: "black",
          }}
        >
          <img
            src="https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/logos.svg?t=2024-03-31T03%3A30%3A17.716Z"
            alt=""
            width={60}
            height={60}
            style={{
              marginRight: 10,
              marginTop: 70,
              marginBottom: 30,
              zIndex: 6,
            }}
          />
          <h1
            style={{
              fontSize: 25,
              marginBottom: 30,
              marginTop: 80,
              marginRight: 10,
              zIndex: 6,
              color: "white",
            }}
          >
            MangaOne
          </h1>
        </Link>
        <div
          style={{ order: 2 }}
          className="loginBorder f w-full sm:w-5/6 lg:w-3/6"
        >
          <h1
            style={{
              color: "white",
              textAlign: "center",
              marginTop: 10,
              fontSize: 22,
            }}
          >
            Quên mật khẩu
          </h1>
          <Form>
            <div>
              <div style={{ marginTop: 20 }}>
                <span style={{ color: "white", fontSize: 15 }}>
                  Email của bạn
                </span>
                <br />
                <Input
                  type="text"
                  name="TenDangNhap"
                  style={InputStyle}
                  onChange={(e) => setMail(e.target.value)}
                />
                <br />
              </div>
            </div>
            <div
              style={{
                marginTop: 15,
                width: 350,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link
                href="/dang-nhap"
                style={{
                  color: "rgba(235, 190, 101, 1)",
                  textDecoration: "none",
                  fontSize: 15,
                }}
              >
                Quay lại đăng nhập
              </Link>
            </div>
            <Button
              className="font"
              style={ButtonStyle}
              onClick={() => sendmail.mutate()}
            >
              Xác nhận
            </Button>
            <br />
          </Form>
          <div
            style={{
              marginTop: 60,
              height: 70,
              backgroundColor: "#2e2f37",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#b2b2b2",
            }}
          >
            Email khôi phục sẽ được gửi đến tài khoản của bạn
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuenMatKhau;
