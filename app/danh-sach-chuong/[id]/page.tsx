"use client";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import NeedLogin from "@/app/ui/NeedLogin";
import AccountPage from "@/app/ui/AccountPage/AccountPage";
import { useParams } from "next/navigation";
import useMangaQuery from "@/hooks/useMangaQuery";
import useUser from "@/hooks/useUser";
import { ChapterDaDangData } from "@/app/ui/Data/ComponentData";

function ChapterDaDang() {
  const params = useParams<{ id: string }>();
  const {
    data: manga,
    isLoading: mLoading,
    isError: mError,
  } = useMangaQuery(params.id);
  const { data: user, isLoading, isError } = useUser();

  const [name, setname] = useState("");
  useEffect(() => {
    if (manga != null) {
      setname(manga.name as string);
    }
  }, [manga]);
  if (user?.user == null) {
    return <NeedLogin />;
  }
  if (isLoading || mLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user || mError || !manga) {
    return <div>Error</div>;
  }
  return (
    <div>
      <div>
        <div>
          <p style={{ fontSize: 0.01 }}>.</p>
          <div style={{ marginBottom: 30, marginTop: 80 }}>
            <div className="flex flex row gap-12 m-4 md:m-8 lg:ml-0">
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
                  QUẢN LÝ CHƯƠNG
                </h1>
                <div className="khung">
                  <p style={{ fontSize: 17, padding: 15 }}>
                    {name} - Quản lý chương{" "}
                  </p>

                  <div
                    style={{
                      width: "100%",
                      height: 3,
                      backgroundColor: "#D9D9D9",
                    }}
                  />
                  <ChapterDaDangData />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChapterDaDang;
export {};
