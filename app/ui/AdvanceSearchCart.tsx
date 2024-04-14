import React, { useEffect, useState } from "react";
import mangaimage from "../images/mangaimage.jpg";
import { Col, Flex, Row } from "antd";
import * as FaIcons from "react-icons/fa";
import useMangaQuery from "@/hooks/useMangaQuery";

interface manga {
  mangaid: string;
}
function AdvanceSearchCart(pros: manga) {
  const { data: manga, isLoading, isError } = useMangaQuery(pros.mangaid);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !manga) {
    return <div>Error</div>;
  }

  const style: React.CSSProperties = {
    marginRight: 5,
    marginTop: "0",
  };

  return (
    <div style={{ backgroundColor: "rgba(217, 217, 217, 0.71)" }}>
      <div style={{ paddingTop: 15, paddingLeft: 10 }}>
        <Row gutter={15}>
          <Col span={6}>
            <img
              src={manga.biatruyen as string}
              style={{ width: "100%", height: 200, marginBottom: 30 }}
            />
          </Col>
          <Col span={18}>
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 7 }}>{manga.name}</h2>
              <div>
                <Flex gap={30} style={{ fontSize: 15, paddingBottom: 7 }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <FaIcons.FaRegStar style={style} />
                    <p>9.23</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <FaIcons.FaRegHeart style={style} />
                    <p>15k</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <FaIcons.FaRegComment style={style} />
                    <p>134</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <FaIcons.FaRegEye style={style} />
                    <p>1.248k</p>
                  </div>
                </Flex>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingBottom: 7,
                    flexWrap: "wrap",
                    overflow: "hidden",
                  }}
                >
                  {manga.genre?.map((items) => (
                    <h4
                      style={{ fontSize: 12, marginRight: 10, paddingTop: 5 }}
                    >
                      {items.toUpperCase()}
                    </h4>
                  ))}
                </div>
                <div
                  className="hiddenscrollbar"
                  style={{
                    height: 120,
                    marginBottom: 15,
                    overflow: "hidden",
                    overflowY: "auto",
                  }}
                >
                  {manga.detail}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AdvanceSearchCart;
//fix height sau
