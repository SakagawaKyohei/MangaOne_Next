import React from "react";
import * as FaIcons from "react-icons/fa";
const style: React.CSSProperties = {
  marginRight: 15,
  fontSize: 18,
};
export const AccountbarData = [
  {
    num: 1,
    title: "Thông tin tài khoản",
    icon: <FaIcons.FaInfoCircle style={style} />,
    path: "/trang-ca-nhan",
  },
  {
    num: 2,
    title: "Truyện theo dõi",
    icon: <FaIcons.FaBookmark style={style} />,
    path: "/truyen-theo-doi-2",
  },
  {
    num: 3,
    title: "Truyện đã đăng",
    icon: <FaIcons.FaBook style={style} />,
    path: "/truyen-da-dang",
  },
  {
    num: 4,
    title: "Điểm dịch truyện",
    icon: <FaIcons.FaCoins style={style} />,
    path: "/diem-dich-truyen",
  },
  {
    num: 5,
    title: "Đổi mật khẩu",
    icon: <FaIcons.FaLock style={style} />,
    path: "/doi-mat-khau",
  },
];
