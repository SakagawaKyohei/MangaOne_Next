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
          fontSize: 15,
        }}
      >
        <Col span={10}>
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
            <p style={{ fontSize: 15 }}>{pros.tentruyen}</p>
          </Checkbox>
        </Col>
        <Col
          span={3}
          offset={1}
          style={{
            fontSize: 15,

            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {chapter.data?.length}
        </Col>
        <Col
          span={3}
          style={{
            fontSize: 15,

            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {pros.nguoidang}
        </Col>
        <Col span={3}>
          <div
            style={{
              paddingLeft: 10,
              fontSize: 15,

              display: "flex",
              justifyContent: "center",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {pros.soluotxem}
          </div>
        </Col>
        <Col span={4}>
          <Link href={`/chinh-sua-truyen/${pros.mangaid}`}>
            <Tooltip title="Chỉnh sửa truyện">
              <img
                src="https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/CapNhat.svg"
                style={{ marginLeft: 35, height: 18 }}
              />
            </Tooltip>
          </Link>
          <Link href={`/danh-sach-chuong/${pros.mangaid}`}>
            <Tooltip title="Danh sách chương">
              <img
                src="https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/DanhSach.svg?t=2024-04-13T08%3A41%3A55.996Z"
                style={{ marginLeft: 20, height: 18, width: 18 }}
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
