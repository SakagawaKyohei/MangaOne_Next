"use client";
import React from "react";
import { Col, ConfigProvider, Row } from "antd";
import { useParams } from "next/navigation";
import useMangaQuery from "@/hooks/useMangaQuery";
import AccountPage from "@/app/ui/AccountPage/AccountPage";
import { ThemMoiChapterData } from "@/app/ui/Data/ComponentData";

function ThemMoiChapter() {
  const params = useParams<{ id: string }>();
  const manga = useMangaQuery(params.id as string);
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
              <div className="flex flex row gap-12 m-4 md:m-8 lg:ml-0 ">
                <div className="hidden basis-1/4 lg:block ">
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
                    THÊM MỚI CHƯƠNG
                  </h1>
                  <div className="khung">
                    <p style={{ fontSize: 17, padding: 15 }}>
                      {manga.data?.name} - Thêm mới chương
                    </p>
                    <div
                      style={{
                        width: "100%",
                        height: 3,
                        backgroundColor: "#D9D9D9",
                      }}
                    />
                    <ThemMoiChapterData />
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

export default ThemMoiChapter;
