"use client";

import useQueryMessage from "@/hooks/message/useQueryMessage";
import useSendMessage from "@/hooks/message/useSendMessage";
import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import React, { useEffect, useState } from "react";

function Message() {
  const { data: user, isLoading, isError } = useUser();
  const {
    data: message1,
    isLoading: ml,
    isError: me,
    refetch: r,
  } = useQueryMessage();
  const [text, settext] = useState("");
  const supabase = useSupabase();
  const sendmess = useSendMessage(user?.user?.id, text);

  useEffect(() => {
    const channel = supabase
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "message" },
        (payload) => {
          console.log("Change received!", payload);
          r();
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);
  if (ml) {
    return <>loading</>;
  }
  if (me || !message1) {
    return <>loi</>;
  }
  console.log(message1);

  return (
    <div style={{ paddingTop: 90, display: "flex", flexDirection: "column" }}>
      <div>
        {message1?.map((value) => {
          return <div>{value.text}</div>;
        })}
      </div>
      <input
        style={{ borderColor: "black" }}
        onChange={(e) => {
          settext(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            sendmess.mutate();
          }
        }}
      ></input>
      jjjj
    </div>
  );
}

export default Message;
export {};
