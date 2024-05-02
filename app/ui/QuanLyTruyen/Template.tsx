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
            <div className="flex flex row gap-12 m-4 md:m-8 lg:ml-0">
              <Col className="basis-1/4 lg:block hidden">
                <AccountPage i={2} />
              </Col>
              <Col className="w-full lg:basis-3/4">
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
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Template;
