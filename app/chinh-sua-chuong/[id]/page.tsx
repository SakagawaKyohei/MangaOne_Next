"use client";
import React, { useEffect, useState } from "react";

import { Col, ConfigProvider, Row } from "antd";

import { useParams } from "next/navigation";
import AccountPage from "@/app/ui/AccountPage/AccountPage";
import { ChinhSuaChapterData } from "@/app/ui/Data/ComponentData";
import useChapterQueryCID from "@/hooks/ChapterQuery/useChapterQueryCID";
import AccountPageRow from "@/app/ui/AccountPage/AccountPageRow";

function ChinhSuaChapter() {
  const params = useParams<{ id: string }>();
  const chapter = useChapterQueryCID(params.id as string);
  const [name, setname] = useState("");
  useEffect(() => {
    if (chapter.data != null) {
      setname(chapter.data.name as any);
    }
  }, [chapter.data]);
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              hoverBorderColor: "#FF9040",
              activeBorderColor: "#FF9040",
            },
          },
        }}
      >
        <div>
          <div>
            <p style={{ fontSize: 0.01 }}>.</p>
            <div style={{ marginBottom: 30, marginTop: 80 }}>
              <div className="md:hidden">
                <AccountPageRow i={2} />
              </div>
              <div className="flex flex row gap-12 m-4 md:m-8 md:ml-0 ">
                <div className="hidden basis-1/4 md:block ">
                  <AccountPage i={2} />
                </div>
                <div className="lg:basis-3/4 text-basic w-full">
                  <h1
                    style={{
                      textAlign: "center",
                      marginTop: 10,
                      marginBottom: 20,
                      fontSize: 21,
                    }}
                  >
                    CHỈNH SỬA CHƯƠNG
                  </h1>
                  <div className="khung">
                    <p style={{ fontSize: 17, padding: 15 }}>
                      {name} - Chỉnh sửa chương
                    </p>
                    <div
                      style={{
                        width: "100%",
                        height: 3,
                        backgroundColor: "#D9D9D9",
                      }}
                    />
                    <ChinhSuaChapterData />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
}

export default ChinhSuaChapter;
