import { Checkbox, Col, Row, Tooltip } from "antd";
import React, { useState } from "react";
import Link from "next/link";
import useChapterQuery from "@/hooks/ChapterQuery/useChapterQuery";
interface Pros {
  tentruyen: string;
  mangaid: string;
  nguoidang: string;
  soluotxem: number;
  checkall: boolean;
  keyy: string;
  setmangaid: any;
}

//component cho mỗi truyện đã đăng

function QLTComponent(pros: Pros) {
  const chapter = useChapterQuery(pros.mangaid);
  const [prev, setprev] = useState(false);
  const [checked, setchecked] = useState(pros.checkall);

  if (prev != pros.checkall) {
    setchecked(pros.checkall);
    setprev(pros.checkall);
  }

  return (
    <div style={{ backgroundColor: "rgba(217, 217, 217, 0.20)" }}>
      <Row
        style={{
          backgroundColor: "rgba(217, 217, 217, 0.20)",
          height: 40,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col
          style={{
            width: "35%",
            paddingRight: "10%",
            padding: 5,
            paddingTop: 0,
          }}
        >
          <Checkbox
            style={{ marginLeft: 10 }}
            checked={checked}
            onChange={(e) => {
              setchecked(!checked);
              if (e.target.checked) {
                pros.setmangaid((prevArray: any) => [
                  ...prevArray,
                  pros.mangaid,
                ]);
              }
              if (!e.target.checked) {
                pros.setmangaid((prevArray: any[]) =>
                  prevArray.filter((item) => item !== pros.mangaid)
                );
              }
            }}
          >
            <p className="text-xs sm:text-base">{pros.tentruyen}</p>
          </Checkbox>
        </Col>
        <Col
          style={{
            padding: 5,
            paddingTop: 0,
            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            width: "22%",
          }}
          className="text-xs sm:text-base"
        >
          {chapter.data?.length}
        </Col>
        <Col
          style={{
            width: "16%",

            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
          className="text-xs sm:text-base"
        >
          <p>{pros.nguoidang}</p>
        </Col>
        <Col
          style={{
            padding: 0.001,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "16%",
          }}
          className="text-xs sm:text-base"
        >
          <div
            style={{
              paddingLeft: 10,

              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {pros.soluotxem}
          </div>
        </Col>
        <Col className="flex flex-col sm:flex-row">
          <Link href={`/chinh-sua-truyen/${pros.mangaid}`}>
            <Tooltip title="Chỉnh sửa truyện">
              <img
                src="https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/CapNhat.svg"
                style={{ marginLeft: 0 }}
                className="h-4 w-4"
              />
            </Tooltip>
          </Link>
          <Link href={`/danh-sach-chuong/${pros.mangaid}`}>
            <Tooltip title="Danh sách chương">
              <img
                src="https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/DanhSach.svg?t=2024-04-13T08%3A41%3A55.996Z"
                className="sm:ml-4 sm:mt-0 mt-2 h-4 w-4"
              />
            </Tooltip>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default QLTComponent;
export {};
