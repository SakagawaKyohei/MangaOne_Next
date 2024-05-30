"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Col, Flex, Input, Pagination, Row } from "antd";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useQueryMessageBox from "@/hooks/messages/useQueryMessageBox";
import useMessage from "antd/es/message/useMessage";
import useQueryMessage from "@/hooks/messages/useQueryMessage";
import useSendMessage from "@/hooks/messages/useSendMessage";
import useSupabase from "@/hooks/useSupabase";
import useSeen from "@/hooks/messages/useSeen";

export default function Messages() {
  //top 1 truyen
  const params = useParams<{ uid: string; id: string }>();
  const [selected, setselected] = useState(params.id);
  const {
    data: messagebox,
    isError: mbe,
    isLoading: mbl,
    refetch: r2,
  } = useQueryMessageBox(params.uid);
  let lastNguoiGui: null = null;

  const [name, setname] = useState("");
  const [id1, setid1] = useState(params.uid);
  const [id2, setid2] = useState(params.id);
  const {
    data: messages,
    isError: me,
    refetch: r,
    isLoading: ml,
  } = useQueryMessage(id1, id2);
  const [text, settext] = useState("");
  const [text2, settext2] = useState("");
  const sendmess = useSendMessage(id1, id2, text);
  const seen = useSeen(id1, id2);
  const supabase = useSupabase();
  const [messagelist, setmessagelist] = useState([]);
  useEffect(() => {
    const channel = supabase
      .channel("message" + id1 + id2)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          console.log("Change received!", payload);
          r();
          r2();
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);
  if (sendmess.isError) {
    console.log(sendmess.error.message);
  }
  if (!messagebox || me || !messages || mbe) {
    return <>error</>;
  }
  if (ml || mbl) {
    return <>loading</>;
  }
  // setmessagelist(messages[0].message);
  console.log(messages);
  return (
    <div>
      <div>
        <p style={{ fontSize: 0.01 }}>.</p>{" "}
        <div className="flex flex-row">
          <div className="basis-1/3">
            <div>
              <div
                style={{
                  marginTop: 80,
                  marginLeft: 15,
                  marginRight: 15,
                  backgroundColor: "white",
                }}
              >
                <Input
                  className="text-xs sm:text-sm bgo"
                  placeholder="Tìm kiếm"
                  type="text"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />

                {messagebox.map((item) => (
                  <div
                    key={item.id} // Remember to add a unique key
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: 10,
                    }}
                    className={
                      selected === item.user2
                        ? "messageboxseleted"
                        : "messagebox"
                    }
                    onClick={() => {
                      setid1(item.user1);
                      setid2(item.user2);
                      seen.mutate();
                      setselected(item.user2); // Update selected directly with item.user2
                      console.log(selected);
                    }}
                  >
                    <Image
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={item.user2info[0].avt?.slice(1, -1)}
                      style={{
                        borderRadius: 100,
                        objectFit: "cover",
                        marginRight: 15,
                      }}
                      className="w-12 h-12 md:w-12 md:h-12"
                    />
                    <div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p
                          style={{
                            marginBottom: 5,
                            fontSize: 16,
                            marginRight: 3,
                            fontWeight: item.seen ? "normal" : "bold",
                          }}
                        >
                          {item.user2info[0].ho?.slice(1, -1)}
                        </p>
                        <p
                          style={{
                            marginBottom: 5,
                            fontSize: 16,
                            fontWeight: item.seen ? "normal" : "bold",
                          }}
                        >
                          {item.user2info[0].ten?.slice(1, -1)}
                        </p>
                      </div>
                      <p
                        style={{
                          color: item.seen ? "#7589a3" : "black",
                          fontSize: 14,
                          fontWeight: item.seen ? "normal" : "bold",
                        }}
                      >
                        {item.messages ? item.messages[0].text : ""}
                      </p>
                    </div>
                    {item.seen ? (
                      <></>
                    ) : (
                      <div
                        className="h-3 w-3"
                        style={{
                          borderRadius: 100,
                          backgroundColor: "green",
                          margin: "auto 0",
                          marginLeft: "auto",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.15)",
              width: 1,
            }}
          />
          <div className="basis-2/3">
            <div
              style={{
                height: 135,
                overflow: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 78,
                }}
              >
                <Image
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={messages[0].user2info[0].avt?.slice(1, -1)}
                  style={{
                    borderRadius: 100,
                    objectFit: "cover",
                    marginRight: 15,
                    marginLeft: 15,
                  }}
                  className="w-12 h-12 md:w-12 md:h-12"
                />
                <p style={{ fontSize: 18, fontWeight: "bold", marginTop: 13 }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ marginRight: 3 }}>
                      {messages[0].user2info[0].ten?.slice(1, -1)}
                    </p>
                    <p>{messages[0].user2info[0].ho?.slice(1, -1)}</p>
                  </div>
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.15)",
                height: 1,
              }}
            />
            <div
              style={{
                height: "71vh",
                overflowY: "auto",
                backgroundColor: "rgba(0, 0, 0, 0.06)",
                marginTop: 2,
              }}
            >
              {messages[0].messages
                ? messages[0].messages
                    .slice()
                    .reverse()
                    .map((items: any) => {
                      if (!items) return null; // Ensure items is not nul
                      const isNguoiGui1 = items.nguoigui === id1;

                      // Condition to render the image only when nguoigui changes
                      const shouldRenderImage = lastNguoiGui !== items.nguoigui;
                      lastNguoiGui = items.nguoigui; // Update lastNguoiGui

                      return (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: isNguoiGui1 ? "end" : "start",
                            paddingRight: isNguoiGui1 ? 15 : 0,
                            paddingLeft: isNguoiGui1 ? 0 : 15,
                            paddingTop:
                              items ==
                              messages[0].messages[
                                messages[0].messages.length - 1
                              ]
                                ? 20
                                : 10,
                            paddingBottom:
                              items === messages[0].messages[0] ? 20 : 0,
                          }}
                        >
                          {/* Render the image conditionally */}
                          {shouldRenderImage && !isNguoiGui1 ? (
                            <Image
                              alt=""
                              width={0}
                              height={0}
                              sizes="100vw"
                              src={messages[0].user2info[0].avt?.slice(1, -1)}
                              style={{
                                borderRadius: 100,
                                objectFit: "cover",
                                marginRight: 15,
                                height: 35,
                                width: 35,
                              }}
                            />
                          ) : (
                            <div style={{ paddingRight: 50 }}></div>
                          )}
                          <div
                            style={{
                              backgroundColor: isNguoiGui1
                                ? "#ff9040"
                                : "white",
                              maxWidth: "max-content",
                              padding: 8,
                              borderRadius: 13,
                              color: isNguoiGui1 ? "white" : "black",
                            }}
                          >
                            {items.text}
                          </div>
                        </div>
                      );
                    })
                : null}
            </div>
            <div
              style={{
                height: "7vh",
                backgroundColor: "rgba(0, 0, 0, 0.07)",
                marginTop: 2,
              }}
            >
              <Input
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  border: "none",
                }}
                value={text2}
                onChange={(e) => {
                  settext(e.target.value);
                  settext2(e.target.value);
                  seen.mutate();
                  console.log("a");
                }}
                onClick={() => {
                  seen.mutate();
                  console.log("a");
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    sendmess.mutate();
                  }
                }}
                placeholder="Nhập tin nhắn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
