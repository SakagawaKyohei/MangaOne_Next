"use client";
import { Col, ConfigProvider, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AdvanceSearchCart from "@/app/ui/AdvanceSearchCart";

import useAdvanceSearchAll from "@/hooks/AdvanceSearch/useAdvanceSearchAll";
import useAdvanceSearchPage from "@/hooks/AdvanceSearch/useAdvanceSearchPage";

function Timkiemnangcaoresult() {
  const [pages, setpages] = useState<number>(1);
  const params = useParams<{
    ten: string;
    tac: string;
    theloai: string;
    page: string;
  }>();
  const a = [""];
  let theloaiArray: string[] = [];
  if (params.theloai != null) {
    theloaiArray = params.theloai
      .split(",")
      .map((category: any) => category.trim());
  }

  useEffect(() => {
    if (params.page == undefined) {
      setpages(1);
    } else {
      setpages(Number(params.page));
    }
  }, [params.page]);
  const navigate = useRouter();
  console.log("aa");

  const MangaPage = useAdvanceSearchPage(
    pages,
    params.ten,
    params.tac,
    theloaiArray
  );
  const MangaAll = useAdvanceSearchAll(
    pages,
    params.ten,
    params.tac,
    theloaiArray
  );
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemSize: 50,
          },
        },
      }}
    >
      <div>
        <div style={{ marginLeft: 35, marginRight: 40 }}>
          <p style={{ fontSize: 0.01 }}>.</p>
          <p
            style={{
              fontSize: 30,
              textAlign: "center",
              marginBottom: 20,
              marginTop: 80,
            }}
          >
            Tìm kiếm nâng cao
          </p>
          <Link href="/tim-kiem-nang-cao" style={{ textDecoration: "none" }}>
            <p style={{ color: "#FF4040", paddingBottom: 10, fontSize: 20 }}>
              Nhấn vào đây để tìm với từ khóa khác
            </p>
          </Link>
          <div
            style={{
              width: "100%",
              height: 1,
              background: "#000",
              marginBottom: 20,
            }}
          />
          <div>
            <Row gutter={[16, 24]}>
              {MangaPage.data?.map((item: any) =>
                item.author ? (
                  <Col key={item.id} span={12}>
                    <AdvanceSearchCart mangaid={item.id} />
                  </Col>
                ) : (
                  <Col key={item.id} span={12}>
                    <AdvanceSearchCart mangaid={item.id} />
                  </Col>
                )
              )}
            </Row>

            <div className="pagination">
              <Pagination
                total={MangaAll.data?.length}
                pageSize={12}
                showSizeChanger={false}
                showLessItems
                current={pages}
                onChange={(e) => {
                  navigate.push(
                    (`/ket-qua/${params.ten}/${params.tac}/${params.theloai}/` +
                      e) as string
                  );
                  setpages(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Timkiemnangcaoresult;
