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

function AccountPageRow(pros: Pros) {
  const router = useRouter();
  const logout = useLogout();
  return (
    <div
      style={{
        display: "flex",
        whiteSpace: "nowrap",
        width: "95vw",
        overflowX: "auto",
        height: "30",
      }}
    >
      {AccountbarData.map((item, index) => (
        <Link
          href={item.path}
          className={index == pros.i ? "navbutton2 selected" : "navbutton2"}
          style={{ margin: 15, marginBottom: 10 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p style={{ fontSize: 16 }}>{item.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AccountPageRow;
export {};
