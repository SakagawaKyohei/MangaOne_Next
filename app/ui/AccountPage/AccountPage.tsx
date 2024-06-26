import "./AccountPage.css";
import { AccountbarData } from "./AccountbarData";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import useLogout from "@/hooks/loginsystem/useLogout";
import { useRouter } from "next/navigation";

//lam position fixed nhung khong loi
interface Pros {
  i: number;
}

function AccountPage(pros: Pros) {
  const router = useRouter();
  const logout = useLogout();
  return (
    <div>
      {AccountbarData.map((item, index) => (
        <Link
          href={item.path}
          className={index == pros.i ? "navbutton selected" : "navbutton"}
        >
          <div
            style={{
              marginLeft: "23%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div className="hidden lg:block">{item.icon}</div>
            <p style={{ fontSize: 16 }}>{item.title}</p>
          </div>
        </Link>
      ))}

      <div
        style={{
          marginLeft: "23%",
          display: "flex",
          flexDirection: "row",
        }}
        className="navbutton"
        onClick={() => {
          logout.mutate();
          router.push("/dang-nhap");
        }}
      >
        <FaIcons.FaSignOutAlt
          style={{ marginRight: 15, fontSize: 18 }}
          className="hidden lg:block"
        />
        <p style={{ fontSize: 16 }}>Đăng xuất</p>
      </div>
    </div>
  );
}

export default AccountPage;
export {};
