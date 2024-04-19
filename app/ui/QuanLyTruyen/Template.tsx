import { Col, ConfigProvider, Row } from "antd";
import React from "react";
import AccountPage from "../AccountPage/AccountPage";
interface Pros {
  title: string;
  title1: string;
  components: any;
}

function Template(pros: Pros) {
  return (
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
            <Row>
              <Col span={6}>
                <AccountPage i={2} />
              </Col>
              <Col span={17} offset={1}>
                <h1
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 20,
                    fontSize: 21,
                  }}
                >
                  {pros.title}
                </h1>
                <div className="khung">
                  <p style={{ fontSize: 17, padding: 15 }}>{pros.title1}</p>
                  <div
                    style={{
                      width: "100%",
                      height: 3,
                      backgroundColor: "#D9D9D9",
                    }}
                  />
                  {pros.components}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Template;
