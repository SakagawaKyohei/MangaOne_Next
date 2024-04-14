"use client";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Input,
  Row,
  Select,
} from "antd";
import Link from "next/link";
import { Theloai } from "../ui/Data/TheLoai";

function Timkiemnangcao() {
  const [author, setauthor] = useState("null");
  const [name, setname] = useState("null");
  const [artist, setartist] = useState("");
  const [genre, setGenre] = useState<any[]>([]); // Use state to manage selected genres

  const handleCheckboxChange = (value: any) => {
    // Check if the value is already in the genre array
    if (genre.includes(value)) {
      // If it is, remove it
      setGenre((prevGenre) => prevGenre.filter((item) => item !== value));
    } else {
      // If it's not, add it
      setGenre((prevGenre) => [...prevGenre, value]);
    }
    console.log(genre);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FF9040",
          controlInteractiveSize: 20,
          borderRadius: 0,
          controlHeight: 43,
          fontSize: 18,
          /* here is your global tokens */
        },
        components: {
          Select: {
            optionFontSize: 16,
          },
        },
      }}
    >
      <div>
        {" "}
        <div style={{ marginLeft: 35, marginRight: 35 }}>
          <p style={{ fontSize: 0.01 }}>a</p>
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
          <div>
            <p style={{ fontSize: 20, paddingBottom: 10 }}>
              Tên truyện cần tìm
            </p>
            <Input
              className="bgo"
              placeholder="Có thể để trống"
              type="text"
              onChange={(e) => {
                setname(e.target.value);
              }}
            ></Input>
            <p style={{ fontSize: 20, paddingBottom: 10 }}>
              Tên tác giả của truyện cần tìm
            </p>
            <Input
              className="bgo"
              placeholder="Có thể để trống"
              type="text"
              onChange={(e) => {
                setauthor(e.target.value);
              }}
            ></Input>
            <p style={{ fontSize: 20, paddingBottom: 10 }}>
              Tên họa sĩ của truyện cần tìm
            </p>
            <Input
              className="bgo"
              placeholder="Có thể để trống"
              type="text"
              onChange={(e) => {
                setartist(e.target.value);
              }}
            ></Input>
            <p style={{ fontSize: 20, paddingBottom: 0, paddingTop: 10 }}>
              Thể loại truyện cần tìm
            </p>
            <Row gutter={[0, 30]} style={{ padding: 15, paddingLeft: 0 }}>
              {Theloai.map((item) => (
                <>
                  <Col span={6}>
                    <Checkbox
                      style={{ fontSize: 18 }}
                      onChange={() => handleCheckboxChange(item)}
                    >
                      {item}
                    </Checkbox>
                  </Col>
                </>
              ))}
            </Row>

            <p style={{ fontSize: 20, paddingBottom: 5, paddingTop: 20 }}>
              Cách xếp truyện
            </p>
            <div
              style={{
                padding: 15,
                paddingLeft: 0,
                paddingBottom: 30,
                width: "100%",
              }}
            >
              <Row>
                <Col span={5}>
                  <Select
                    defaultValue="Vừa cập nhật"
                    style={{ width: "100%", borderRadius: 0 }}
                    options={[
                      { value: "vuacapnhat", label: "Vừa cập nhật" },
                      { value: "cunhat", label: "Cũ nhất" },
                      { value: "haynhat", label: "Đánh giá cao nhất" },
                      { value: "tenhat", label: "Đánh giá thấp nhất" },
                      {
                        value: "theodoinhieunhat",
                        label: "Theo dõi nhiều nhất",
                      },
                      { value: "theodoiitnhat", label: "Theo dõi ít nhất" },
                    ]}
                  />
                </Col>
                {/*cần chỉnh lại button đa màn hình*/}
                <Col offset={15} span={3}>
                  <Link
                    href={`/ket-qua/${name}/${author}/${
                      genre.length > 0 ? genre : "null"
                    }/1`}
                  >
                    <Button
                      style={{
                        backgroundColor: "#FF9040",
                        color: "white",
                        width: "80%",
                        borderRadius: 0,
                      }}
                    >
                      Tìm truyện
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Timkiemnangcao;
export {};
