"use client";
import "./login.css";
import useLogin from "@/hooks/loginsystem/useLogin";
import useOLogin from "@/hooks/loginsystem/useOLogin";
import { Button, Form, Input } from "antd";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MangaPage({ params }: { params: { id: string } }) {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const OloginMutation = useOLogin();

  const loginMutation = useLogin({ email, password });

  const router = useRouter();
  if (loginMutation.isSuccess) {
    router.push("/");
    console.log("done");
    //tim cach de navigate trang login khi da dang nhap sang home ma khong can load, khi dang o trang khac thi khong navigate
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
            src="https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/logos.svg?t=2024-03-31T12%3A22%3A35.257Z"
            alt=""
            width={60}
            height={60}
            style={{
              marginRight: 10,
              marginTop: 50,
              marginBottom: 40,
              zIndex: 6,
            }}
          />
          <h1
            style={{
              fontSize: 30,
              marginBottom: 55,
              marginTop: 65,
              marginRight: 10,
              zIndex: 6,
              color: "white",
            }}
          >
            <p>MangaOne</p>
          </h1>
        </Link>
        <div style={{ order: 2 }} className="loginBorder">
          <h1
            style={{
              color: "white",
              textAlign: "center",
              marginTop: 10,
              fontSize: 30,
            }}
          >
            Đăng nhập
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
                  onChange={(e) => setEmail(e.target.value)}
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
                href="/dang-ky"
                style={{
                  color: "rgba(235, 190, 101, 1)",
                  textDecoration: "none",
                  fontSize: 15,
                }}
              >
                Đăng ký
              </Link>
              <Link
                href="/quen-mat-khau"
                style={{
                  color: "rgba(235, 190, 101, 1)",
                  textDecoration: "none",
                  fontSize: 15,
                }}
              >
                Quên mật khẩu
              </Link>
            </div>
            <Button
              className="font"
              style={ButtonStyle}
              onClick={() => loginMutation.mutate()}
            >
              Đăng nhập
            </Button>
            <br />
            {loginMutation.isError && (
              <p className="text-sm mb-8 text-red-500">
                {(loginMutation.error as any)?.message}
              </p>
            )}
            <Button
              className="font GoogleIcon"
              style={{
                borderRadius: 0,
                marginTop: 20,
                border: "none",
                fontSize: 17,
                width: 350,
                height: 33,
                fontWeight: "bold",
                backgroundColor: "rgba(221, 75, 57, 1)",
              }}
              onClick={() => OloginMutation.mutate()}
            >
              Đăng nhập bằng Google
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
