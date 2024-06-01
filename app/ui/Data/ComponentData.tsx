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
import * as faIcons from "react-icons/fa";
import {
  InputChinhSuaTruyen,
  InputThemMoiTruyen /*InputChinhSuaTruyen*/,
} from "./InputData";
import { v4 as uuidv4 } from "uuid";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import QLTComponent from "../QuanLyTruyen/QLTComponent";
import QLCComponent from "../QuanLyTruyen/QLCComponent";
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
import { useParams, useRouter } from "next/navigation";
import useChapterQuery from "@/hooks/ChapterQuery/useChapterQuery";
import useDeleteChapter from "@/hooks/useDeleteChapter";
import { FaIcons } from "react-icons/fa";
import useCreateChapter from "@/hooks/useCreateChapter";
import useChapterQueryCID from "@/hooks/ChapterQuery/useChapterQueryCID";
import QLUComponent from "../QuanLyTruyen/QLUComponent";
import useGetUserList from "@/hooks/Admin/useGetUserList";

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

export const ThemMoiTruyenData = {
  label: (
    <div style={{ width: "92%" }}>
      <InputThemMoiTruyen />
    </div>
  ),
  title: "THÊM MỚI TRUYỆN",
  title1: "Thêm mới truyện",
};

export const ChinhSuaTruyenData = {
  label: (
    <div style={{ width: "92%" }}>
      <InputChinhSuaTruyen />
    </div>
  ),
  title: "CHỈNH SỬA TRUYỆN",
  title1: "Chỉnh sửa truyên",
};

export function ThemMoiChapterData() {
  const params = useParams<{
    id: string;
  }>();

  const [images, setImages] = useState<Blob[] | null>(null);
  const [ten, setten] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const upchapter = useCreateChapter(
    {
      ten: ten,
      view: 0,
      manga_id: params.id,
      content: images,
      filelist: fileList,
    },
    ""
  );
  const nav = useRouter();
  if (upchapter.isSuccess) {
    nav.push(`/danh-sach-chuong/${params.id}`);
  }

  useEffect(() => {
    if (fileList != null) {
      const newImages = fileList.map((item) => item.originFileObj);

      setImages(newImages as any);
    }
  }, [fileList]); //cap nhat images khi file list cap nhat

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  if (upchapter.isError) {
    console.log((upchapter.error as any).message);
  }

  return (
    <div style={{ width: "92%" }}>
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
            }}
          >
            <div style={style}>
              <p className="text-xs sm:text-base ml-8">Tên chương</p>
              {true ? (
                <p style={{ color: "red", marginLeft: 2 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={18}>
            <Input
              style={input}
              placeholder="Tên chương"
              onChange={(e) => {
                setten(e.target.value);
                console.log(images);
                console.log("aa");
              }}
              className="text-xs sm:text-base"
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
            }}
          >
            <div style={style}>
              <p className="text-xs sm:text-base">Nội dung</p>
            </div>
          </Col>
          <Col span={18}>
            {" "}
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
              <SortableContext
                items={fileList.map((i) => i.uid)}
                strategy={verticalListSortingStrategy}
              >
                <Upload
                  beforeUpload={(f) => {
                    setFileList([...fileList, f]);

                    return false;
                  }}
                  fileList={fileList}
                  onChange={onChange}
                  itemRender={(originNode, file) => (
                    <DraggableUploadListItem
                      originNode={originNode}
                      file={file}
                    />
                  )}
                >
                  <Button
                    icon={<UploadOutlined />}
                    style={{ marginBottom: 15 }}
                    onClick={() => {
                      fileList.map((item, index) => console.log(item));
                    }}
                    className="text-xs sm:text-base"
                  >
                    Chọn ảnh
                  </Button>
                </Upload>
              </SortableContext>
            </DndContext>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginTop: 25,
          marginBottom: 25,
        }}
      ></div>
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
            }}
          ></Col>
          <Col span={18}>
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

                  height: 38,
                }}
                className="text-xs sm:text-base"
                onClick={() => {
                  upchapter.mutate();
                }}
              >
                <p>Thêm mới</p>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export interface FileObject extends UploadFile {}

export function ChinhSuaChapterData() {
  const params = useParams<{ id: string }>();
  const {
    data: chapter,
    isLoading: cl,
    isError: ce,
  } = useChapterQueryCID(params.id as string);

  const [fileList, setFileList] = useState<any[]>([]);
  const [name, setname] = useState("");
  const [mangaid, setmangaid] = useState("");
  useEffect(() => {
    if (chapter != null && chapter.filelist != null) {
      setname(chapter.name as any);
      setFileList(chapter.filelist as any);
      setmangaid(chapter.manga_id || "");
    }
  }, [chapter]);

  const [images, setImages] = useState<Blob[] | null>(null);
  const nav = useRouter();
  const upchapter = useCreateChapter(
    {
      ten: name,
      view: 0,

      manga_id: mangaid,
      content: images,
      filelist: fileList,
    },
    params.id as string
  );
  useEffect(() => {
    if (fileList != null) {
      const newImages = fileList.map((item) => item.originFileObj);

      setImages(newImages as any);
    }
  }, [fileList]); //cap nhat images khi file list cap nhat

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  if (upchapter.isSuccess) {
    message.success("Cập nhật thông tin thành công");
    setTimeout(() => {
      nav.push(`/danh-sach-chuong/${mangaid}`);
    }, 500);
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  if (upchapter.isError) {
    console.log((upchapter.error as any).message);
  }
  if (cl) {
    return <>load</>;
  }
  if (ce || !chapter) {
    return <>error</>;
  }
  return (
    <div style={{ width: "92%" }}>
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
            }}
          >
            <div style={style}>
              <p className="text-xs sm:text-base ml-4">Tên chương</p>
              {true ? (
                <p style={{ color: "red", marginLeft: 2 }}>*</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col span={18}>
            <Input
              style={input}
              placeholder="Tên chương"
              value={name}
              onChange={(e) => {
                console.log(fileList);
                setname(e.target.value);
              }}
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
            }}
          >
            <div style={style}>
              <p className="text-xs sm:text-base">Nội dung</p>
            </div>
          </Col>
          <Col span={18}>
            {" "}
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
              <SortableContext
                items={fileList.map((i) => i.uid)}
                strategy={verticalListSortingStrategy}
              >
                <Upload
                  beforeUpload={(f) => {
                    setFileList([...fileList, f]);

                    return false;
                  }}
                  fileList={fileList}
                  onChange={onChange}
                  itemRender={(originNode, file) => (
                    <DraggableUploadListItem
                      originNode={originNode}
                      file={file}
                    />
                  )}
                >
                  <Button
                    icon={<UploadOutlined />}
                    style={{ marginBottom: 15 }}
                    className="text-xs sm:text-base"
                    onClick={() => {
                      fileList.map((item, index) => console.log(item));
                    }}
                  >
                    Chọn ảnh
                  </Button>
                </Upload>
              </SortableContext>
            </DndContext>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginTop: 25,
          marginBottom: 25,
        }}
      ></div>
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
            }}
          ></Col>
          <Col span={18}>
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

                  height: 38,
                }}
                className="text-xs sm:text-base"
                onClick={() => {
                  upchapter.mutate();
                }}
              >
                <p>Xác nhận</p>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

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
      <div
        style={{
          paddingTop: 25,
          paddingBottom: 25,
          display: "flex",

          marginLeft: "8%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Nhập tên truyện"
          style={{
            borderRadius: 5,

            width: "40%",
            marginLeft: "20%",
            height: 32,
            fontSize: 15,
          }}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "#FF9040",
            color: "white",
            fontSize: 15,
          }}
          onClick={() => {
            setsearch1(search);
            console.log(mangaid);
          }}
        >
          <p className="hidden md:block">Tìm kiếm</p>
          <faIcons.FaSearch className="md:hidden text-xs sm:text-base" />
        </Button>
      </div>

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
            <Col
              style={{
                width: "35%",
                paddingRight: "10%",
                padding: 5,
                paddingTop: 0,
              }}
            >
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
                <p className="text-xs sm:text-base">Tên truyện</p>
              </Checkbox>
            </Col>
            <Col
              style={{
                padding: 5,
                paddingTop: 0,
                display: "flex",
                justifyContent: "center",

                width: "22%",
              }}
            >
              <p
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  marginLeft: 5,
                }}
                className="text-xs sm:text-base"
              >
                Số chương
              </p>
            </Col>
            <Col
              style={{
                width: "16%",

                display: "flex",
                justifyContent: "center",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <p className="text-xs sm:text-base"> Người đăng</p>
            </Col>
            <Col
              style={{
                padding: 0.001,
                display: "flex",

                width: "16%",
              }}
            >
              <div style={{ paddingLeft: 10 }} className="text-xs sm:text-base">
                Số lượt xem
              </div>
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
            <p className="text-xs sm:text-base">Thêm truyện</p>
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
          <p className="text-xs sm:text-base">Xóa truyện</p>
        </Button>
      </div>
    </div>
  );
}

export function AdminData() {
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
  const { data: userlist, isLoading: ull, isError: ule } = useGetUserList();
  if (isLoading || mangal || ull) {
    return <div>Loading...</div>;
  }

  if (isError || !user || mangae || !manga || !userlist || ule) {
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
  const showbannedConfirm = () => {
    confirm({
      title: "Bạn muốn cấm người dùng?",
      icon: <ExclamationCircleFilled />,
      content: "Người dùng đang chọn sẽ bị cấm",
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
  console.log(userlist);
  return (
    <div style={{ width: "92%" }}>
      <div
        style={{
          paddingTop: 25,
          paddingBottom: 25,
          display: "flex",

          marginLeft: "8%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Nhập tên người dùng"
          style={{
            borderRadius: 5,

            width: "40%",
            marginLeft: "20%",
            height: 32,
            fontSize: 15,
          }}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "#FF9040",
            color: "white",
            fontSize: 15,
          }}
          onClick={() => {
            setsearch1(search);
            console.log(mangaid);
          }}
        >
          <p className="hidden md:block">Tìm kiếm</p>
          <faIcons.FaSearch className="md:hidden text-xs sm:text-base" />
        </Button>
      </div>

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
            <Col
              style={{
                width: "35%",
                paddingRight: "10%",
                padding: 5,
                paddingTop: 0,
              }}
            >
              <Checkbox
                style={{ marginLeft: 10 }}
                onChange={(e) => {
                  console.log(mangaid);
                  setcheckall(!checkall);
                  if (e.target.checked) {
                    {
                      (userlist as any[] | null | undefined)
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
                      (userlist as any[] | null | undefined)
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
                <p className="text-xs sm:text-base">ID người dùng</p>
              </Checkbox>
            </Col>
            <Col
              style={{
                padding: 5,
                paddingTop: 0,
                display: "flex",
                justifyContent: "center",

                width: "22%",
              }}
            >
              <p
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  marginLeft: 5,
                }}
                className="text-xs sm:text-base"
              >
                Tên người dùng
              </p>
            </Col>
            <Col
              style={{
                width: "28%",

                display: "flex",
                justifyContent: "center",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <p className="text-xs sm:text-base"> Trạng thái</p>
            </Col>
            <Col
              style={{
                padding: 0.001,
                display: "flex",

                width: "16%",
              }}
            ></Col>
          </Row>
          {(userlist as any[] | null | undefined)
            ?.filter((item) => {
              return search1.toLowerCase() == ""
                ? item
                : item.name?.toLowerCase().includes(search1);
            })
            .map((item, index) => (
              <>
                <QLUComponent
                  tentruyen={item.id ? item.id : ""}
                  mangaid={item.id}
                  nguoidang={item.raw_user_meta_data.role}
                  soluotxem={item.raw_user_meta_data.ho}
                  ten={item.raw_user_meta_data.ten}
                  checkall={checkall}
                  keyy={index.toString()}
                  setmangaid={setmangaid}
                />
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export function ChapterDaDangData() {
  const { data: user, isLoading, isError } = useUser();
  const params = useParams<{ id: string }>();
  const {
    data: chapter,
    isLoading: cload,
    isError: cerror,
  } = useChapterQuery(params.id);
  const [chapterid, setchapterid] = useState<string[]>([]); //id chapter duoc chon de delete

  const addValue = (value: string) => {
    // Thêm giá trị vào mảng
    setchapterid((prevArray) => [...prevArray, value]);
  };

  const removeValue = (value: string) => {
    // Xóa giá trị khỏi mảng
    setchapterid((prevArray) => prevArray.filter((item) => item !== value));
  };
  const deletemanga = useDeleteChapter(chapterid);
  if (deletemanga.isError) {
    console.log((deletemanga.error as any).message);
  }

  const [checkall, setcheckall] = useState(false);
  const [search, setsearch] = useState("");
  const [search1, setsearch1] = useState(""); //khi bấm tìm kiếm mới xử lý search
  if (deletemanga.isSuccess) {
    window.location.reload();
  }

  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: "Bạn muốn xóa chương?",
      icon: <ExclamationCircleFilled />,
      content: "Các chương được chọn sẽ bị xóa sau khi xác nhận",
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
  console.log(params.id);

  return (
    <div style={{ width: "92%" }}>
      <div
        style={{
          paddingTop: 25,
          paddingBottom: 25,
          display: "flex",

          marginLeft: "8%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Nhập tên truyện"
          style={{
            borderRadius: 5,

            width: "40%",
            marginLeft: "20%",
            height: 32,
            fontSize: 15,
          }}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "#FF9040",
            color: "white",
            fontSize: 15,
          }}
          onClick={() => {
            setsearch1(search);
          }}
        >
          <p className="hidden md:block">Tìm kiếm</p>
          <faIcons.FaSearch className="md:hidden text-xs sm:text-base" />
        </Button>
      </div>
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
            <Col span={6}>
              <Checkbox
                style={{ marginLeft: 10 }}
                onChange={(e) => {
                  setcheckall(!checkall);
                  if (e.target.checked) {
                    {
                      chapter
                        ?.filter((item) => {
                          return search1.toLowerCase() == ""
                            ? item
                            : item.name?.toLowerCase().includes(search1);
                        })
                        .map((item, index) => removeValue(item.id)); //xóa tất cả id đang được chọn và chọn tất cả
                      chapter
                        ?.filter((item) => {
                          return search1.toLowerCase() == ""
                            ? item
                            : item.name?.toLowerCase().includes(search1);
                        })
                        .map((item, index) => addValue(item.id));
                    }
                  } else {
                    {
                      chapter
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
                <p className="text-xs sm:text-base">Tên chương</p>
              </Checkbox>
            </Col>
            <Col
              span={3}
              offset={3}
              style={{
                fontSize: 15,
                padding: 0.001,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}></p>
            </Col>
            <Col
              span={4}
              style={{
                padding: 0.001,
                display: "flex",
                justifyContent: "center",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
              className="text-xs sm:text-base"
            >
              <p> Người đăng</p>
            </Col>
            <Col
              offset={1}
              style={{
                padding: 0.001,
                display: "flex",
                justifyContent: "center",
              }}
              span={4}
            >
              <div style={{ paddingLeft: 10 }} className="text-xs sm:text-base">
                Số lượt xem
              </div>
            </Col>
          </Row>
          {chapter
            ?.filter((item) => {
              return search1.toLowerCase() == ""
                ? item
                : item.name?.toLowerCase().includes(search1);
            })
            .map((item, index) => (
              <>
                <QLCComponent
                  tentruyen={item.name ? item.name : ""}
                  mangaid={item.id}
                  nguoidang={user?.user?.user_metadata.ten}
                  soluotxem={item.view ? item.view : 0}
                  checkall={checkall}
                  keyy={index.toString()}
                  setmangaid={setchapterid}
                />
              </>
            ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Link href={`/them-moi-chuong/${params.id}`}>
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 0,
              backgroundColor: "#FF9040",
              color: "white",

              height: 32,
              marginBottom: 25,
              marginTop: 25,
              marginRight: 20,
            }}
            className="text-xs sm:text-base"
          >
            <p>Thêm chương</p>
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

            marginBottom: 25,
            marginTop: 25,
          }}
          onClick={() => {
            showDeleteConfirm();
            console.log("a");
          }}
          className="text-xs sm:text-base"
        >
          <p>Xóa chương</p>
        </Button>
      </div>
    </div>
  );
}
