"use client";
import React, { useState } from "react";

import { Button, Form, Input } from "antd";
import "../dang-nhap/login.css";

import Link from "next/link";
import useCreateUser from "@/hooks/loginsystem/useCreateUser";
{
  /*them rang buoc cho cac truong*/
}
function DangKy() {
  //class css
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

  {
    /*Lỗi nếu gửi mail nhưng chưa xác nhận và đăng ký lần 2 bằng mail đó nhưng thông tin khác và xác nhận thì vẫn giữ thông tin lần đăng ký đầu tiên (ý tưởng: xóa mail lần đăng ký thứ nhất)
  code UI để hiển thị thông báo đăng ký thành công, thất bại hoặc thiếu trường dữ liệu
*/
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const createUserMutation = useCreateUser({
    email,
    password,
    username,
  });

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
              marginTop: 10,
              marginBottom: 20,
              zIndex: 6,
            }}
          />
          <h1
            style={{
              fontSize: 25,
              marginBottom: 30,
              marginTop: 20,
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
          className="loginBorder signup w-full sm:w-5/6 lg:w-3/6"
        >
          <h1
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 22,
            }}
          >
            Đăng ký
          </h1>
          <Form>
            <div>
              <div style={{ marginTop: 20 }}>
                <span style={{ color: "white", fontSize: 15 }}>
                  Tên đăng nhập
                </span>
                <br />
                <Input
                  type="text"
                  name="TenDangNhap"
                  style={InputStyle}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br />
              </div>
              <div style={{ marginTop: 20 }}>
                <span style={{ color: "white", fontSize: 15 }}>Mật khẩu</span>
                <br />
                <Input
                  type="password"
                  name="MatKhau"
                  style={InputStyle}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
              </div>
              <div style={{ marginTop: 20 }}>
                <span style={{ color: "white", fontSize: 15 }}>
                  Xác nhận mật khẩu
                </span>
                <br />
                <Input type="text" name="XacNhan" style={InputStyle} />
                <br />
              </div>
              <div style={{ marginTop: 20 }}>
                <span style={{ color: "white", fontSize: 15 }}>Email</span>
                <br />
                <Input
                  type="text"
                  name="Email"
                  style={InputStyle}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
              </div>
            </div>
            {createUserMutation.error ? (
              <>{(createUserMutation.error as any).message}</>
            ) : (
              <></>
            )}
            {createUserMutation.isSuccess ? (
              <>Email kích hoạt đã được gửi đến tài khoản của bạn</>
            ) : (
              <></>
            )}
            {/*chưa test đăng ký không xác nhận xong dùng mail đó đk tiếp
             */}
            <div
              style={{
                marginTop: 15,
                width: 350,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {name}
              <Link
                href="/dang-nhap"
                style={{
                  color: "rgba(235, 190, 101, 1)",
                  textDecoration: "none",
                  fontSize: 15,
                }}
              >
                Quay lại đăng nhập {/*co thoi gian them back icon*/}
              </Link>
            </div>
            <Button
              className="font"
              style={ButtonStyle}
              onClick={() => createUserMutation.mutate()}
            >
              <span>Đăng ký</span>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default DangKy;
