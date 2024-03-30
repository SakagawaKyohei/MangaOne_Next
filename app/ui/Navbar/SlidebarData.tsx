import React from "react";
import * as FaUIcons from "react-icons/fa";
import * as IoUIcons from "react-icons/io";
const mangas = [
  "de39f90b-1971-4752-acc6-7ffa9514b80d",
  "23fcaa75-6014-4717-a65b-4404de36bbb7",
  "b1cdaef6-40fa-4560-9566-412adcba4501",
  "14dbd918-b502-4587-9cbe-b7d18d2b7caa",
  "4b0aa647-9dbd-4a76-8a2b-cefd9b2bcc35",
  "af582f8e-de8d-45b4-b3aa-4d35c9b5a1b4",
  "d0fcff69-2379-467f-b84d-b6699539477d",
  "833d22af-2811-4df7-97d2-f9087acd5f37",
  "e2971936-806b-4a91-9992-090e4af47c36",
  "c1c4d961-2e36-4641-8814-f9099df51e41",
  "745a1fcf-c932-4650-b58f-6ce0a4ab6070",
  "db6880ab-2476-4a0f-a030-34069cf4a3f8",
  "79f89fad-7aae-4213-b030-d8c571728e1c",
  "b2c36cb6-4c66-4ed1-a075-2880d16755e6",
  "012ab374-8c20-4417-9d1c-1f4a3a4547e0",
];

const randomIndex = Math.floor(Math.random() * mangas.length);
const randomElement = mangas[randomIndex];

export const SlidebarData = [
  {
    title: "Dành cho tôi",
    path: "",
    icon: <IoUIcons.IoMdPerson style={{ fontSize: 26 }} />,
    cName: "nav-title",
  },
  {
    title: "Theo dõi",
    path: "/truyen-theo-doi",
    cName: "nav-button",
  },
  {
    title: "Lịch sử đọc truyện",
    path: "/lich-su",
    cName: "nav-button",
  },
  {
    title: "Truyện đã đăng",
    path: "/truyen-da-dang",
    cName: "nav-button",
  },
  {
    title: "Điểm thưởng",
    path: "/diem-dich-truyen",
    cName: "nav-button",
  },
  {
    title: "Đọc truyện",
    path: "",
    icon: <FaUIcons.FaBook style={{ fontSize: 20 }} />,
    cName: "nav-title",
  },
  {
    title: "Xem nhiều nhất",
    path: "/xem-nhieu-nhat",
    cName: "nav-button",
  },
  {
    title: "Tìm kiếm nâng cao",
    path: "/tim-kiem-nang-cao",
    cName: "nav-button",
  },
  {
    title: "Chọn ngẫu nhiên",
    path: `/noi-dung/${randomElement}`,
    cName: "nav-button",
  },
  {
    title: "Quản lý tài khoản",
    path: "/",
    icon: <IoUIcons.IoMdSettings style={{ fontSize: 23 }} />,
    cName: "nav-title",
  },
  {
    title: "Trang cá nhân",
    path: "/trang-ca-nhan",
    cName: "nav-button",
  },
  {
    title: "Đổi mật khẩu",
    path: "/doi-mat-khau",
    cName: "nav-button",
  },
];
