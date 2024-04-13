"use client";
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Flex,
  Input,
  Modal,
  message,
  Row,
  Upload,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { InputThemMoiTruyen /*InputChinhSuaTruyen*/ } from "./InputData";
import { v4 as uuidv4 } from "uuid";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import QLTComponent from "../QuanLyTruyen/QLTComponent";
// import QLCComponent from "../QuanLyTruyen/QLCComponent";
// import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import useDeleteManga from "@/hooks/MangaManagement/useDeleteManga";
import useGetMangaTrans from "@/hooks/GetMangaInfo/useGetMangaTrans";
import NeedLogin from "../NeedLogin";
// import useCreateChapter from "../../hooks/ChapterManagement/useCreateChapter";
// import useGetChapter from "../../hooks/GetMangaInfo/useGetChapter";
// import useDeleteChapter from "../../hooks/GetMangaInfo/useDeleteChapter";
// import useGetChapterByCID from "../../hooks/GetMangaInfo/useGetChapterByCID";

interface DraggableUploadListItemProps {
  originNode: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  file: UploadFile<any>;
}

const DraggableUploadListItem = ({
  originNode,
  file,
}: DraggableUploadListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.uid,
  });

  //ant drag

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "move",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      // prevent preview event when drag end
      className={isDragging ? "is-dragging" : ""}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === "error" && isDragging
        ? originNode.props.children
        : originNode}
    </div>
  );
};

const style: React.CSSProperties = {
  marginTop: 3,
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

// export const ThemMoiTruyenData = {
//   label: (
//     <div style={{ width: "92%" }}>
//       <InputThemMoiTruyen />
//     </div>
//   ),
//   title: "THÊM MỚI TRUYỆN",
//   title1: "Thêm mới truyện",
// };

// export const ChinhSuaTruyenData = {
//   label: (
//     <div style={{ width: "92%" }}>
//       <InputChinhSuaTruyen />
//     </div>
//   ),
//   title: "CHỈNH SỬA TRUYỆN",
//   title1: "Chỉnh sửa truyên",
// };

// export function ThemMoiChapterData() {
//   const { id } = useParams();
//   const [images, setImages] = useState<Blob[] | null>(null);
//   const [ten, setten] = useState("");
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   const upchapter = useCreateChapter(
//     {
//       ten: ten,
//       view: 0,
//       manga_id: id,
//       content: images,
//       filelist: fileList,
//     },
//     ""
//   );
//   // const nav = useNavigate();
//   // if (upchapter.isSuccess) {
//   //   nav(`/danh-sach-chuong/${id}`);
//   // }

//   useEffect(() => {
//     if (fileList != null) {
//       const newImages = fileList.map((item) => item.originFileObj);

//       setImages(newImages as any);
//     }
//   }, [fileList]); //cap nhat images khi file list cap nhat

//   const sensor = useSensor(PointerSensor, {
//     activationConstraint: { distance: 10 },
//   });

//   const onDragEnd = ({ active, over }: DragEndEvent) => {
//     if (active.id !== over?.id) {
//       setFileList((prev) => {
//         const activeIndex = prev.findIndex((i) => i.uid === active.id);
//         const overIndex = prev.findIndex((i) => i.uid === over?.id);
//         return arrayMove(prev, activeIndex, overIndex);
//       });
//     }
//   };

//   const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };
//   if (upchapter.isError) {
//     console.log((upchapter.error as any).message);
//   }

//   return (
//     <div style={{ width: "92%" }}>
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
//             }}
//           >
//             <div style={style}>
//               <p style={{ fontSize: 16 }}>Tên chương</p>
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
//               placeholder="Tên chương"
//               onChange={(e) => {
//                 setten(e.target.value);
//                 console.log(images);
//                 console.log("aa");
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
//             }}
//           >
//             <div style={style}>
//               <p style={{ fontSize: 16 }}>Nội dung</p>
//             </div>
//           </Col>
//           <Col span={18}>
//             {" "}
//             <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
//               <SortableContext
//                 items={fileList.map((i) => i.uid)}
//                 strategy={verticalListSortingStrategy}
//               >
//                 <Upload
//                   beforeUpload={(f) => {
//                     setFileList([...fileList, f]);

//                     return false;
//                   }}
//                   fileList={fileList}
//                   onChange={onChange}
//                   itemRender={(originNode, file) => (
//                     <DraggableUploadListItem
//                       originNode={originNode}
//                       file={file}
//                     />
//                   )}
//                 >
//                   <Button
//                     icon={<UploadOutlined />}
//                     style={{ marginBottom: 15 }}
//                     className="upload"
//                     onClick={() => {
//                       fileList.map((item, index) => console.log(item));
//                     }}
//                   >
//                     Chọn ảnh
//                   </Button>
//                 </Upload>
//               </SortableContext>
//             </DndContext>
//           </Col>
//         </Row>
//       </div>
//       <div
//         style={{
//           marginTop: 25,
//           marginBottom: 25,
//         }}
//       ></div>
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
//             }}
//           ></Col>
//           <Col span={18}>
//             {" "}
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
//                 onClick={() => {
//                   upchapter.mutate();
//                 }}
//               >
//                 <p>Thêm mới</p>
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// }

export interface FileObject extends UploadFile {}

// export function ChinhSuaChapterData() {
//   const { id } = useParams();
//   const chapter = useGetChapterByCID(id as string);
//   const [fileList, setFileList] = useState<UploadFile[]>([]);
//   const [name, setname] = useState("");
//   const [mangaid, setmangaid] = useState("");
//   useEffect(() => {
//     if (chapter.data != null) {
//       setname(chapter.data.name as any);
//       setFileList(chapter.data.filelist);
//       setmangaid(chapter.data.manga_id);
//     }
//   }, [chapter.data]);
//   const [images, setImages] = useState<Blob[] | null>(null);
//   const nav = useNavigate();
//   const upchapter = useCreateChapter(
//     {
//       ten: name,
//       view: 0,

//       manga_id: mangaid,
//       content: images,
//       filelist: fileList,
//     },
//     id as string
//   );
//   useEffect(() => {
//     if (fileList != null) {
//       const newImages = fileList.map((item) => item.originFileObj);

//       setImages(newImages as any);
//     }
//   }, [fileList]); //cap nhat images khi file list cap nhat

//   const sensor = useSensor(PointerSensor, {
//     activationConstraint: { distance: 10 },
//   });
//   if (upchapter.isSuccess) {
//     message.success("Cập nhật thông tin thành công");
//     setTimeout(() => {
//       nav(`/danh-sach-chuong/${mangaid}`);
//     }, 500);
//   }

//   const onDragEnd = ({ active, over }: DragEndEvent) => {
//     if (active.id !== over?.id) {
//       setFileList((prev) => {
//         const activeIndex = prev.findIndex((i) => i.uid === active.id);
//         const overIndex = prev.findIndex((i) => i.uid === over?.id);
//         return arrayMove(prev, activeIndex, overIndex);
//       });
//     }
//   };

//   const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };
//   if (upchapter.isError) {
//     console.log((upchapter.error as any).message);
//   }
//   return (
//     <div style={{ width: "92%" }}>
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
//             }}
//           >
//             <div style={style}>
//               <p style={{ fontSize: 16 }}>Tên chương</p>
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
//               placeholder="Tên chương"
//               value={name}
//               onChange={(e) => {
//                 console.log(fileList);
//                 setname(e.target.value);
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
//             }}
//           >
//             <div style={style}>
//               <p style={{ fontSize: 16 }}>Nội dung</p>
//             </div>
//           </Col>
//           <Col span={18}>
//             {" "}
//             <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
//               <SortableContext
//                 items={fileList.map((i) => i.uid)}
//                 strategy={verticalListSortingStrategy}
//               >
//                 <Upload
//                   beforeUpload={(f) => {
//                     setFileList([...fileList, f]);

//                     return false;
//                   }}
//                   fileList={fileList}
//                   onChange={onChange}
//                   itemRender={(originNode, file) => (
//                     <DraggableUploadListItem
//                       originNode={originNode}
//                       file={file}
//                     />
//                   )}
//                 >
//                   <Button
//                     icon={<UploadOutlined />}
//                     style={{ marginBottom: 15 }}
//                     className="upload"
//                     onClick={() => {
//                       fileList.map((item, index) => console.log(item));
//                     }}
//                   >
//                     Chọn ảnh
//                   </Button>
//                 </Upload>
//               </SortableContext>
//             </DndContext>
//           </Col>
//         </Row>
//       </div>
//       <div
//         style={{
//           marginTop: 25,
//           marginBottom: 25,
//         }}
//       ></div>
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
//             }}
//           ></Col>
//           <Col span={18}>
//             {" "}
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
//                 onClick={() => {
//                   upchapter.mutate();
//                 }}
//               >
//                 <p>Xác nhận</p>
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// }

//tất cả thành phần của truyện đã đăng bao gồm cả danh sách truyện đã đăng và khung và search bar
export function TruyenDaDangData() {
  const [mangaid, setmangaid] = useState<string[]>([]); //id manga duoc chon de delete
  const [checkall, setcheckall] = useState(false);
  const [search, setsearch] = useState("");
  const [search1, setsearch1] = useState(""); //khi bấm tìm kiếm mới xử lý search
  const { data: user, isLoading, isError } = useUser();

  const deletemanga = useDeleteManga(mangaid);
  const {
    data: manga,
    isLoading: mangal,
    isError: mangae,
  } = useGetMangaTrans(user?.user?.id as string);
  if (isLoading || mangal) {
    return <div>Loading...</div>;
  }

  if (isError || !user || mangae || !manga) {
    return <div>Error</div>;
  }
  if (deletemanga.isError) {
    console.log((deletemanga.error as any).message);
  }

  if (deletemanga.isSuccess) {
    window.location.reload();
  }
  const addValue = (value: string) => {
    // Thêm giá trị vào mảng
    setmangaid((prevArray) => [...prevArray, value]);
  };

  const removeValue = (value: string) => {
    // Xóa giá trị khỏi mảng
    setmangaid((prevArray) => prevArray.filter((item) => item !== value));
  };
  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: "Bạn muốn xóa truyện?",
      icon: <ExclamationCircleFilled />,
      content: "Các truyện được chọn sẽ bị xóa sau khi xác nhận",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        deletemanga.mutate();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div style={{ width: "92%" }}>
      <Row style={{ paddingTop: 25, paddingBottom: 25 }}>
        <Col offset={10} span={10}>
          <Input
            placeholder="Nhập tên truyện"
            style={{
              borderRadius: 5,
              width: "100%",
              height: 32,
              fontSize: 15,
            }}
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          />
        </Col>
        <Col offset={1} span={3}>
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 0,
              backgroundColor: "#FF9040",
              color: "white",
              fontSize: 15,
              height: 32,
              width: "100%",
            }}
            onClick={() => {
              setsearch1(search);
              console.log(mangaid);
            }}
          >
            <p>Tìm kiếm</p>
          </Button>
        </Col>
      </Row>
      <div
        className="khung2"
        style={{
          marginLeft: "8%",
          height: "50vh",
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        <div style={{ marginLeft: 20, margin: 5, fontSize: 15 }}>
          <Row style={{ marginBottom: 10, marginTop: 10 }}>
            <Col span={5}>
              <Checkbox
                style={{ marginLeft: 10 }}
                onChange={(e) => {
                  console.log(mangaid);
                  setcheckall(!checkall);
                  if (e.target.checked) {
                    {
                      manga
                        ?.filter((item) => {
                          return search1.toLowerCase() == ""
                            ? item
                            : item.name?.toLowerCase().includes(search1);
                        })
                        .map((item, index) => removeValue(item.id)); //xóa tất cả id đang được chọn và chọn tất cả
                      manga
                        ?.filter((item) => {
                          return search1.toLowerCase() == ""
                            ? item
                            : item.name?.toLowerCase().includes(search1);
                        })
                        .map((item, index) => addValue(item.id));
                    }
                  } else {
                    {
                      manga
                        ?.filter((item) => {
                          return search1.toLowerCase() == ""
                            ? item
                            : item.name?.toLowerCase().includes(search1);
                        })
                        .map((item, index) => removeValue(item.id));
                    }
                  }
                }}
              >
                <p style={{ fontSize: 15 }}>Tên truyện</p>
              </Checkbox>
            </Col>
            <Col
              span={3}
              offset={6}
              style={{
                fontSize: 15,
                padding: 0.001,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                Số chương
              </p>
            </Col>
            <Col
              span={3}
              style={{
                fontSize: 15,
                padding: 0.001,
                display: "flex",
                justifyContent: "center",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <p> Người đăng</p>
            </Col>
            <Col
              style={{
                fontSize: 15,
                padding: 0.001,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ paddingLeft: 10, fontSize: 15 }}>Số lượt xem</div>
            </Col>
          </Row>
          {manga
            ?.filter((item) => {
              return search1.toLowerCase() == ""
                ? item
                : item.name?.toLowerCase().includes(search1);
            })
            .map((item, index) => (
              <>
                <QLTComponent
                  tentruyen={item.name ? item.name : ""}
                  mangaid={item.id}
                  nguoidang={user.user?.user_metadata.ten}
                  soluotxem={item.view ? item.view : 0}
                  checkall={checkall}
                  keyy={index.toString()}
                  setmangaid={setmangaid}
                />
              </>
            ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Link href={"/them-moi-truyen"}>
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 0,
              backgroundColor: "#FF9040",
              color: "white",
              fontSize: 15,
              height: 32,
              marginBottom: 25,
              marginTop: 25,
              marginRight: 20,
            }}
          >
            <p>Thêm truyện</p>
          </Button>
        </Link>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "red",
            color: "white",
            height: 32,
            fontSize: 15,
            marginBottom: 25,
            marginTop: 25,
          }}
          onClick={showDeleteConfirm}
        >
          <p>Xóa truyện</p>
        </Button>
      </div>
    </div>
  );
}

// export function ChapterDaDangData() {
//   const user = useUser();
//   const { id: mid } = useParams();

//   const chapter = useGetChapter(mid as string); //chinh thanh get chapter
//   const [chapterid, setchapterid] = useState<string[]>([]); //id chapter duoc chon de delete

//   const addValue = (value: string) => {
//     // Thêm giá trị vào mảng
//     setchapterid((prevArray) => [...prevArray, value]);
//   };

//   const removeValue = (value: string) => {
//     // Xóa giá trị khỏi mảng
//     setchapterid((prevArray) => prevArray.filter((item) => item !== value));
//   };
//   const deletemanga = useDeleteChapter(chapterid);
//   if (deletemanga.isError) {
//     console.log((deletemanga.error as any).message);
//   }

//   const [checkall, setcheckall] = useState(false);
//   const [search, setsearch] = useState("");
//   const [search1, setsearch1] = useState(""); //khi bấm tìm kiếm mới xử lý search
//   if (deletemanga.isSuccess) {
//     window.location.reload();
//   }

//   const { confirm } = Modal;
//   const showDeleteConfirm = () => {
//     confirm({
//       title: "Bạn muốn xóa chương?",
//       icon: <ExclamationCircleFilled />,
//       content: "Các chương được chọn sẽ bị xóa sau khi xác nhận",
//       okText: "Xác nhận",
//       okType: "danger",
//       cancelText: "Hủy bỏ",
//       onOk() {
//         deletemanga.mutate();
//       },
//       onCancel() {
//         console.log("Cancel");
//       },
//     });
//   };

//   return (
//     <div style={{ width: "92%" }}>
//       <Row style={{ paddingTop: 25, paddingBottom: 25 }}>
//         <Col offset={10} span={10}>
//           <Input
//             placeholder="Nhập tên chương"
//             style={{
//               borderRadius: 5,
//               width: "100%",
//               height: 32,
//               fontSize: 15,
//             }}
//             onChange={(e) => {
//               setsearch(e.target.value);
//             }}
//           />
//         </Col>
//         <Col offset={1} span={3}>
//           <Button
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               borderRadius: 0,
//               backgroundColor: "#FF9040",
//               color: "white",
//               fontSize: 15,
//               height: 32,
//               width: "100%",
//             }}
//             onClick={() => {
//               setsearch1(search);
//             }}
//           >
//             <p>Tìm kiếm</p>
//           </Button>
//         </Col>
//       </Row>
//       <div
//         className="khung2"
//         style={{
//           marginLeft: "8%",
//           height: "50vh",

//           overflow: "hidden",
//           overflowY: "auto",
//         }}
//       >
//         <div style={{ marginLeft: 20, margin: 5, fontSize: 15 }}>
//           <Row style={{ marginBottom: 10, marginTop: 10 }}>
//             <Col span={5}>
//               <Checkbox
//                 style={{ marginLeft: 10 }}
//                 onChange={(e) => {
//                   setcheckall(!checkall);
//                   if (e.target.checked) {
//                     {
//                       chapter.data?.data
//                         ?.filter((item) => {
//                           return search1.toLowerCase() == ""
//                             ? item
//                             : item.name.toLowerCase().includes(search1);
//                         })
//                         .map((item, index) => removeValue(item.id)); //xóa tất cả id đang được chọn và chọn tất cả
//                       chapter.data?.data
//                         ?.filter((item) => {
//                           return search1.toLowerCase() == ""
//                             ? item
//                             : item.name.toLowerCase().includes(search1);
//                         })
//                         .map((item, index) => addValue(item.id));
//                     }
//                   } else {
//                     {
//                       chapter.data?.data
//                         ?.filter((item) => {
//                           return search1.toLowerCase() == ""
//                             ? item
//                             : item.name.toLowerCase().includes(search1);
//                         })
//                         .map((item, index) => removeValue(item.id));
//                     }
//                   }
//                 }}
//               >
//                 <p style={{ fontSize: 15 }}>Tên chương</p>
//               </Checkbox>
//             </Col>
//             <Col
//               span={3}
//               offset={5}
//               style={{
//                 fontSize: 15,
//                 padding: 0.001,
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}></p>
//             </Col>
//             <Col
//               span={3}
//               style={{
//                 fontSize: 15,
//                 padding: 0.001,
//                 display: "flex",
//                 justifyContent: "center",
//                 fontFamily: "Arial, Helvetica, sans-serif",
//               }}
//             >
//               <p> Người đăng</p>
//             </Col>
//             <Col
//               offset={1}
//               style={{
//                 fontSize: 15,
//                 padding: 0.001,
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <div style={{ paddingLeft: 10, fontSize: 15 }}>Số lượt xem</div>
//             </Col>
//           </Row>
//           {chapter.data?.data
//             ?.filter((item) => {
//               return search1.toLowerCase() == ""
//                 ? item
//                 : item.name.toLowerCase().includes(search1);
//             })
//             .map((item, index) => (
//               <>
//                 <QLCComponent
//                   tentruyen={item.name}
//                   mangaid={item.id}
//                   nguoidang={user.data?.user_metadata.ten}
//                   soluotxem={item.view}
//                   checkall={checkall}
//                   keyy={index.toString()}
//                   setmangaid={setchapterid}
//                 />
//               </>
//             ))}
//         </div>
//       </div>
//       <div style={{ display: "flex", justifyContent: "end" }}>
//         <Link to={`/them-moi-chuong/${mid}`}>
//           <Button
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               borderRadius: 0,
//               backgroundColor: "#FF9040",
//               color: "white",
//               fontSize: 15,
//               height: 32,
//               marginBottom: 25,
//               marginTop: 25,
//               marginRight: 20,
//             }}
//           >
//             <p>Thêm chương</p>
//           </Button>
//         </Link>
//         <Button
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 0,
//             backgroundColor: "red",
//             color: "white",
//             height: 32,
//             fontSize: 15,
//             marginBottom: 25,
//             marginTop: 25,
//           }}
//           onClick={() => {
//             showDeleteConfirm();
//             console.log("a");
//           }}
//         >
//           <p>Xóa chương</p>
//         </Button>
//       </div>
//     </div>
//   );
// }
