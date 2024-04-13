"use client";
import { Button, Col, ConfigProvider, Input, Row, Select } from "antd";
import mangaimage from "../../images/mangaimage.jpg";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRef, useState } from "react";
// import useUpdateMetadata from "../../hooks/useUpdateMetadata";
// import useResetPassword from "../../hooks/PasswordManagement/useResetPassword";
// import useUploadAvt from "../../hooks/Avt/useUploadAvt";
import { Theloai } from "./TheLoai";
// import useCreateManga from "../../hooks/MangaManagement/useCreateManga";
//import useGetManga from "../../hooks/GetMangaInfo/useGetMangaByMID";
// import { useNavigate, useParams } from "react-router-dom";
import useUser from "@/hooks/useUser";
import useUpdateUserMetadata from "@/hooks/loginsystem/useUpdateUserMetadata";
import useLogout from "@/hooks/loginsystem/useLogout";
import useUploadAvt from "@/hooks/useUploadAvt";
import useCreateManga from "@/hooks/useCreateManga";
import useResetPassword from "@/hooks/PasswordManagement/useResetPassword";
const style: React.CSSProperties = {
  fontSize: 16,
  paddingBottom: 10,
};

const style2: React.CSSProperties = {
  paddingTop: 4,
  marginBottom: 12,
  marginRight: 20,
  fontSize: 16,
  display: "flex",
  flexDirection: "row",
};
const input: React.CSSProperties = {
  fontSize: 16,
  width: "100%",
  borderRadius: 0,
  display: "flex",
  flexDirection: "row",
};
const input2: React.CSSProperties = {
  fontSize: 16,
  width: "100%",
  borderRadius: 10,
  display: "flex",
  flexDirection: "row",
};

export function InputThemMoiTruyen() {
  const [name, setName] = useState("");
  const [othername, setOthernName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState([]); //the loai cua truyen sap dang
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState<Blob | null>(null);
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <div>Error</div>;
  }
  const createmanga = useCreateManga(
    {
      ten: name,
      tenkhac: othername,
      theloai: genre,
      detail: detail,
      tacgia: author,
      biatruyen: image,
    },
    user.user?.id,
    ""
  );
  const theloai = Theloai; //tat ca the loai

  const handleImageChange = (e: any) => {
    const file = e.file;
    setImage(file.originFileObj);
  };
  const uploadButton = (
    <div>
      {false ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleSelectChange = (selectedValues: any) => {
    setGenre(selectedValues); // Cập nhật state genre khi có giá trị được chọn
  };
  // const nav = useNavigate();
  if (createmanga.isSuccess) {
    // nav("/truyen-da-dang");
  }
  // if (createmanga.isLoading) {
  //   console.log("load");
  // }
  if (createmanga.isError) {
    console.log((createmanga.error as any).message);
  }
  return (
    <>
      <div
        style={{
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        <Row>
          <Col
            span={6}
            style={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              paddingTop: 4,
            }}
          >
            <div style={style2}>
              <p style={{ fontSize: 16 }}>Tên truyện</p>
              {true ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={18}>
            <Input
              style={input}
              placeholder="Tên truyện"
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        <Row>
          <Col
            span={6}
            style={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              paddingTop: 4,
            }}
          >
            <div style={style2}>
              <p style={{ fontSize: 16 }}>Bìa truyện</p>
              {true ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={18}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleImageChange}
            >
              {image != null ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="avatar"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        <Row>
          <Col
            span={6}
            style={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              paddingTop: 4,
            }}
          >
            <div style={style2}>
              <p style={{ fontSize: 16 }}>Tên khác</p>
              {false ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={18}>
            {" "}
            <Input
              style={input}
              placeholder="Tên khác"
              onChange={(e) => setOthernName(e.target.value)}
            ></Input>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        <Row>
          <Col
            span={6}
            style={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              paddingTop: 4,
            }}
          >
            <div style={style2}>
              <p style={{ fontSize: 16 }}>Tác giả</p>
              {false ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={18}>
            <Input
              style={input}
              placeholder="Tác giả"
              onChange={(e) => setAuthor(e.target.value)}
            ></Input>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        <Row>
          <Col
            span={6}
            style={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              paddingTop: 4,
            }}
          >
            <div style={style2}>
              <p style={{ fontSize: 16 }}>Thể loại</p>
              {true ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={18}>
            {" "}
            <Select
              mode="multiple"
              style={{
                width: "100%",
                fontFamily: "arial",
              }}
              onChange={handleSelectChange} // Gắn sự kiện onChange để theo dõi các giá trị được chọn
              placeholder="Nhập tên và chọn thể loại"
            >
              {theloai.map((tl, i) => {
                return (
                  <Select.Option key={i} value={tl}>
                    {tl}
                  </Select.Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        <Row>
          <Col
            span={6}
            style={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              paddingTop: 4,
            }}
          >
            <div style={style2}>
              <p style={{ fontSize: 16 }}>Tóm tắt truyện</p>
              {true ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={18}>
            <TextArea
              style={{ height: 175, fontSize: 16, borderRadius: 0 }}
              onChange={(e) => setDetail(e.target.value)}
            ></TextArea>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        <Row>
          <Col
            span={6}
            style={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              paddingTop: 4,
            }}
          ></Col>
          <Col span={18}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 0,
                  backgroundColor: "#FF9040",
                  color: "white",
                  fontSize: 18,
                  height: 38,
                }}
                onClick={() => createmanga.mutate()}
              >
                <p>Thêm mới</p>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

// export function InputChinhSuaTruyen() {
//   const { id } = useParams();
//   const manga = useGetManga(id as string);
//   const [name, setName] = useState("");
//   const [othername, setOthernName] = useState("");
//   const [author, setAuthor] = useState("");
//   const [genre, setGenre] = useState([]); //the loai cua truyen sap dang
//   const [detail, setDetail] = useState("");
//   const [image, setImage] = useState<Blob | null>(null);
//   const [imageURL, setImageURL] = useState("");
//   // const navigate = useNavigate();
//   useEffect(() => {
//     if (manga.data != null) {
//       setName(manga.data.name as string);
//       setOthernName(manga.data.other_name);
//       setAuthor(manga.data.author);
//       setGenre(manga.data.genre);
//       setDetail(manga.data.detail);
//       setImageURL(manga.data.biatruyen);
//     }
//   }, [manga.data]);
//   const user = useUser();

//   const createmanga = useCreateManga(
//     {
//       ten: name,
//       tenkhac: othername,
//       theloai: genre,
//       detail: detail,
//       tacgia: author,
//       biatruyen: image,
//     },
//     user.data?.id,
//     id as string
//   );
//   const theloai = Theloai; //tat ca the loai

//   const handleImageChange = (e: any) => {
//     const file = e.file;
//     setImage(file.originFileObj);
//   };
//   const uploadButton = (
//     <div>
//       {false ? <LoadingOutlined /> : <PlusOutlined />}
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );
//   const handleSelectChange = (selectedValues: any) => {
//     setGenre(selectedValues); // Cập nhật state genre khi có giá trị được chọn
//   };
//   if (createmanga.isSuccess) {
//     message.success("Chỉnh sửa truyện thành công");
//     setTimeout(() => {
//       navigate("/truyen-da-dang");
//     }, 500);
//   }
//   if (createmanga.isLoading) {
//     console.log("load");
//   }
//   if (createmanga.isError) {
//     console.log((createmanga.error as any).message);
//   }
//   return (
//     <>
//       <div
//         style={{
//           marginTop: 25,
//           marginBottom: 25,
//         }}
//       >
//         <Row>
//           <Col
//             span={6}
//             style={{
//               display: "flex",
//               alignItems: "end",
//               flexDirection: "column",
//               paddingTop: 4,
//             }}
//           >
//             <div style={style2}>
//               <p style={{ fontSize: 16 }}>Tên truyện</p>
//               {true ? (
//                 <p style={{ color: "red", marginLeft: 5 }}>*</p>
//               ) : (
//                 <p></p>
//               )}
//             </div>
//           </Col>
//           <Col span={18}>
//             <Input
//               style={input}
//               placeholder="Tên truyện"
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//                 console.log(manga.data);
//               }}
//             ></Input>
//           </Col>
//         </Row>
//       </div>
//       <div
//         style={{
//           marginTop: 25,
//           marginBottom: 25,
//         }}
//       >
//         <Row>
//           <Col
//             span={6}
//             style={{
//               display: "flex",
//               alignItems: "end",
//               flexDirection: "column",
//               paddingTop: 4,
//             }}
//           >
//             <div style={style2}>
//               <p style={{ fontSize: 16 }}>Bìa truyện</p>
//               {true ? (
//                 <p style={{ color: "red", marginLeft: 5 }}>*</p>
//               ) : (
//                 <p></p>
//               )}
//             </div>
//           </Col>
//           <Col span={18}>
//             <Upload
//               name="avatar"
//               listType="picture-card"
//               className="avatar-uploader"
//               showUploadList={false}
//               onChange={handleImageChange}
//             >
//               {image != null ? (
//                 <img
//                   src={URL.createObjectURL(image)}
//                   alt="avatar"
//                   style={{ width: "100%", height: "100%" }}
//                 />
//               ) : (
//                 <>
//                   {imageURL != "" ? (
//                     <>
//                       <img
//                         src={imageURL}
//                         alt="avatar"
//                         style={{ width: "100%", height: "100%" }}
//                       />
//                     </>
//                   ) : (
//                     uploadButton
//                   )}
//                 </>
//               )}
//             </Upload>
//           </Col>
//         </Row>
//       </div>
//       <div
//         style={{
//           marginTop: 25,
//           marginBottom: 25,
//         }}
//       >
//         <Row>
//           <Col
//             span={6}
//             style={{
//               display: "flex",
//               alignItems: "end",
//               flexDirection: "column",
//               paddingTop: 4,
//             }}
//           >
//             <div style={style2}>
//               <p style={{ fontSize: 16 }}>Tên khác</p>
//               {false ? (
//                 <p style={{ color: "red", marginLeft: 5 }}>*</p>
//               ) : (
//                 <p></p>
//               )}
//             </div>
//           </Col>
//           <Col span={18}>
//             {" "}
//             <Input
//               style={input}
//               placeholder="Tên khác"
//               value={othername}
//               onChange={(e) => setOthernName(e.target.value)}
//             ></Input>
//           </Col>
//         </Row>
//       </div>
//       <div
//         style={{
//           marginTop: 25,
//           marginBottom: 25,
//         }}
//       >
//         <Row>
//           <Col
//             span={6}
//             style={{
//               display: "flex",
//               alignItems: "end",
//               flexDirection: "column",
//               paddingTop: 4,
//             }}
//           >
//             <div style={style2}>
//               <p style={{ fontSize: 16 }}>Tác giả</p>
//               {false ? (
//                 <p style={{ color: "red", marginLeft: 5 }}>*</p>
//               ) : (
//                 <p></p>
//               )}
//             </div>
//           </Col>
//           <Col span={18}>
//             <Input
//               style={input}
//               placeholder="Tác giả"
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//             ></Input>
//           </Col>
//         </Row>
//       </div>
//       <div
//         style={{
//           marginTop: 25,
//           marginBottom: 25,
//         }}
//       >
//         <Row>
//           <Col
//             span={6}
//             style={{
//               display: "flex",
//               alignItems: "end",
//               flexDirection: "column",
//               paddingTop: 4,
//             }}
//           >
//             <div style={style2}>
//               <p style={{ fontSize: 16 }}>Thể loại</p>
//               {true ? (
//                 <p style={{ color: "red", marginLeft: 5 }}>*</p>
//               ) : (
//                 <p></p>
//               )}
//             </div>
//           </Col>
//           <Col span={18}>
//             {" "}
//             <Select
//               mode="multiple"
//               value={genre}
//               style={{
//                 width: "100%",
//                 fontFamily: "arial",
//               }}
//               onChange={handleSelectChange} // Gắn sự kiện onChange để theo dõi các giá trị được chọn
//               placeholder="Nhập tên và chọn thể loại"
//             >
//               {theloai.map((tl, i) => {
//                 return (
//                   <Select.Option key={i} value={tl}>
//                     {tl}
//                   </Select.Option>
//                 );
//               })}
//             </Select>
//           </Col>
//         </Row>
//       </div>
//       <div
//         style={{
//           marginTop: 25,
//           marginBottom: 25,
//         }}
//       >
//         <Row>
//           <Col
//             span={6}
//             style={{
//               display: "flex",
//               alignItems: "end",
//               flexDirection: "column",
//               paddingTop: 4,
//             }}
//           >
//             <div style={style2}>
//               <p style={{ fontSize: 16 }}>Tóm tắt truyện</p>
//               {true ? (
//                 <p style={{ color: "red", marginLeft: 5 }}>*</p>
//               ) : (
//                 <p></p>
//               )}
//             </div>
//           </Col>
//           <Col span={18}>
//             <TextArea
//               value={detail}
//               style={{ height: 175, fontSize: 16, borderRadius: 0 }}
//               onChange={(e) => setDetail(e.target.value)}
//             ></TextArea>
//           </Col>
//         </Row>
//       </div>
//       <div
//         style={{
//           marginTop: 25,
//           marginBottom: 25,
//         }}
//       >
//         <Row>
//           <Col
//             span={6}
//             style={{
//               display: "flex",
//               alignItems: "end",
//               flexDirection: "column",
//               paddingTop: 4,
//             }}
//           ></Col>
//           <Col span={18}>
//             <div style={{ display: "flex", justifyContent: "end" }}>
//               <Button
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: 0,
//                   backgroundColor: "#FF9040",
//                   color: "white",
//                   fontSize: 18,
//                   height: 38,
//                 }}
//                 onClick={() => createmanga.mutate()}
//               >
//                 <p>Xác nhận</p>
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// const style: React.CSSProperties = {
//   fontSize: 16,
//   paddingBottom: 10,
// };

// const style2: React.CSSProperties = {
//   paddingTop: 4,
//   marginBottom: 12,
//   marginRight: 20,
//   fontSize: 16,
//   display: "flex",
//   flexDirection: "row",
// };

// interface User {
//   avt: string;
//   ten: string;
//   ho: string;
//   sdt: string;
//   stk: string;
//   coin: number;
// }

export function InputInfo() {
  const { data: getu, isLoading, isError } = useUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !getu) {
    return <div>Error</div>;
  }
  const [ten, setten] = useState(getu.user?.user_metadata.ten);
  const [ho, setho] = useState(getu.user?.user_metadata.ho);
  const [sdt, setsdt] = useState(getu.user?.user_metadata.sdt);
  const [stk, setstk] = useState(getu.user?.user_metadata.stk);
  const [coin, setcoin] = useState(getu.user?.user_metadata.coin);
  const [avt, setavt] = useState(getu.user?.user_metadata.avt);
  if (avt == null) {
    setavt(
      "https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/Chualogin.svg"
    );
  }

  const inputref = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<Blob | null>(null);
  const [change, setchange] = useState(false);
  const upload = useUploadAvt(image);
  const user = {
    ten: ten,
    ho: ho,
    sdt: sdt,
    stk: stk,
    coin: coin,
    avt: avt,
  };
  const updatemetadata = useUpdateUserMetadata(user);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setchange(true);
  };
  const handleInputClick = () => {
    inputref.current?.click();
  };
  {
    /*nghien cuu cach crop cho hop vi tri sau*/
  }
  if (upload.isError) {
    return <>{(upload.error as any)?.message as string}</>;
  }
  //message
  const [messageApi, contextHolder] = message.useMessage();
  const successs = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  // if (upload.isSuccess) {
  // }
  if (updatemetadata.isSuccess && (upload.isSuccess || image == null)) {
    message.success("Cập nhật thông tin thành công");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  if (updatemetadata.isError && /*upload.isSuccess ||*/ image == null) {
    console.log(updatemetadata.error as any);
  }
  return (
    <>
      {contextHolder}
      <div
        style={{
          marginBottom: 50,
        }}
      >
        <div style={style}>Ảnh đại diện</div>

        <div className="centeravt">
          <div onClick={handleInputClick}>
            {image == null ? (
              <img
                src={avt}
                style={{
                  marginRight: 10,
                  marginTop: 25,
                  height: 200,
                  marginBottom: 50,
                  borderRadius: "100%",
                  width: 200,
                }}
              />
            ) : (
              <img
                src={URL.createObjectURL(image)}
                style={{
                  marginRight: 10,
                  marginTop: 25,
                  height: 200,
                  marginBottom: 50,
                  borderRadius: "100%",
                  width: 200,
                }}
              />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={inputref}
            ></input>
          </div>
        </div>
        <Row>
          <Col span={24}>
            <div style={style2}>
              Email
              {false ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={24}>
            <Input style={input2} disabled value={getu.user?.email}></Input>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Row>
          <Col span={24}>
            <div style={style2}>
              Tên
              {true ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={24}>
            {" "}
            <Input
              style={input2}
              onChange={(e) => setten(e.target.value)}
              defaultValue={getu.user?.user_metadata.ten}
            ></Input>
            {/*trường name bắt buộc không được để trống nếu không sẽ gây lỗi undefined*/}
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Row>
          <Col span={24}>
            <div style={style2}>
              Họ
              {false ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={24}>
            <Input
              style={input2}
              onChange={(e) => setho(e.target.value)}
              defaultValue={getu.user?.user_metadata.ho}
            ></Input>
          </Col>
        </Row>
      </div>

      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Row>
          <Col span={24}>
            <div style={style2}>
              Điện thoại
              {false ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={24}>
            {" "}
            <Input
              style={input2}
              onChange={(e) => setsdt(e.target.value)}
              defaultValue={getu.user?.user_metadata.sdt}
            ></Input>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Row>
          <Col span={24}>
            <div style={style2}>
              Số tài khoản
              {false ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={24}>
            {" "}
            <Input
              style={input2}
              defaultValue={getu.user?.user_metadata.stk}
              onChange={(e) => setstk(e.target.value)}
            ></Input>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Row>
          <Col span={24}>
            <div style={style2}>
              {false ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
        </Row>
        <Col span={24}>
          {" "}
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 0,
                backgroundColor: "#FF9040",
                color: "white",
                fontSize: 18,
                height: 38,
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 30,
                paddingRight: 30,
              }}
              onClick={() => {
                updatemetadata.mutate();
                if (change) {
                  upload.mutate();
                }
              }}
            >
              <p>Cập nhật</p>
            </Button>
          </div>
        </Col>
      </div>
    </>
  );
}
/* {
    title: "UserName",
    batbuoc: true,
    label: <Input style={input2} disabled></Input>,
  },

*/ //thêm user name sau

{
  /*  {
    title: "Tên",
    batbuoc: true,
    label: <Input style={input2}></Input>,
  },

  {
    title: "Họ",
    batbuoc: true,
    label: <Input style={input2}></Input>,
  },

  {
    title: "Điện thoại",
    batbuoc: false,
    label: <Input style={input2}></Input>,
  },
  {
    title: "Email",
    batbuoc: false,
    label: <Input style={input2}></Input>,
  },
  {
    title: "Số tài khoản",
    batbuoc: false,
    label: <Input style={input2}></Input>,
  },
  {
    label: (
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "#FF9040",
            color: "white",
            fontSize: 18,
            height: 38,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <p>Cập nhật</p>
        </Button>
      </div>
    ),
  },
];
*/
}

export function InputChangePass() {
  const [password, setPassword] = useState("");
  const resetpassword = useResetPassword(password);
  // const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  if (resetpassword.isSuccess) {
    message.success("Đổi mật khẩu thành công, bạn sẽ quay lại trang chủ");
    // setTimeout(() => {
    //   nav("/");
    // }, 500);
  }
  if (resetpassword.isError) {
    return <>{(resetpassword.error as any)?.message};</>;
  }
  return (
    <>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Row>
          <Col span={24}>
            <div style={style2}>
              Mật khẩu mới
              {true ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={24}>
            <Input
              style={input2}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Row>
          <Col span={24}>
            <div style={style2}>
              Xác nhận mật khẩu mới
              {true ? (
                <p style={{ color: "red", marginLeft: 5 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={24}>
            <Input style={input2}></Input>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Row>
          <Col span={24}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 0,
                  backgroundColor: "#FF9040",
                  color: "white",
                  fontSize: 18,
                  height: 38,
                  paddingTop: 20,
                  paddingBottom: 20,
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
                onClick={() => resetpassword.mutate()}
              >
                <p>Cập nhật</p>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
/*{
    title: "Mật khẩu hiện tại",
    batbuoc: true,
    label: <Input style={input2}></Input>,
  },*/
