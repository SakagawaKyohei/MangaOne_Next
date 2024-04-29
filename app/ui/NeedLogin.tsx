import { Button } from "antd";
import Link from "next/link";

function NeedLogin() {
  return (
    <>
      <div className="p-4 md:p-8">
        <p style={{ fontSize: 0.01 }}>.</p>{" "}
        {/*collision tăng chiều cao cho div*/}
        <div
          style={{
            marginBottom: 30,
            marginTop: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2 style={{ paddingBottom: 30 }} className="text-sm sm:text-2xl">
            Bạn cần đăng nhập để truy cập chức năng này
          </h2>
          <div
            style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}
          >
            <Link href={"/dang-nhap"} style={{ textDecoration: "none" }}>
              <Button
                className="text-basic sm:text-xl sm:h-12 sm:w-36 h-8 w-24"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 0,
                  backgroundColor: "#FF9040",
                  color: "white",

                  marginRight: 18,
                  fontWeight: "bold",
                }}
              >
                <p>Đăng nhập</p>
              </Button>
            </Link>
            <Link href="/dang-ky" style={{ textDecoration: "none" }}>
              <Button
                className="text-basic sm:text-xl sm:h-12 sm:w-36 h-8 w-24"
                style={{
                  marginLeft: 15,
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 0,
                  backgroundColor: "#D9D9D9",
                }}
              >
                <p>Đăng ký</p>
              </Button>
            </Link>
          </div>
          <img
            src="https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/cry%20(1).png?t=2024-04-12T08%3A50%3A40.613Z"
            style={{ marginBottom: 30, marginRight: "2rem" }}
            className="w-54 h-48 md:w-72 md:h-64"
          />
        </div>
      </div>
    </>
  );
}

export default NeedLogin;
