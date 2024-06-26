import { Checkbox, Col, Row, Tooltip } from "antd";
import React, { useState } from "react";
import Link from "next/link";
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

function QLCComponent(pros: Pros) {
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
        <Col span={6}>
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
          span={3}
          offset={3}
          style={{
            fontSize: 15,

            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        ></Col>
        <Col
          span={4}
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
          className="text-xs sm:text-base"
        >
          {pros.nguoidang}
        </Col>
        <Col span={4} offset={1}>
          <div
            style={{
              paddingLeft: 10,

              display: "flex",
              justifyContent: "center",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
            className="text-xs sm:text-base"
          >
            {pros.soluotxem}
          </div>
        </Col>
        <Col span={2} offset={1}>
          <Link href={`/chinh-sua-chuong/${pros.mangaid}`}>
            <Tooltip title="Chỉnh sửa chương">
              <img
                src="https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/web/CapNhat.svg?t=2024-04-19T08%3A09%3A14.558Z"
                className="h-4 sm:h-4"
              />
            </Tooltip>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default QLCComponent;
export {};
