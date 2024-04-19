"use client";
import { ChinhSuaTruyenData } from "@/app/ui/Data/ComponentData";
import Template from "@/app/ui/QuanLyTruyen/Template";
import React from "react";

function ChinhSuaTruyen() {
  return (
    <div>
      <Template
        title={ChinhSuaTruyenData.title}
        title1={ChinhSuaTruyenData.title1}
        components={ChinhSuaTruyenData.label}
      />
    </div>
  );
}

export default ChinhSuaTruyen;
