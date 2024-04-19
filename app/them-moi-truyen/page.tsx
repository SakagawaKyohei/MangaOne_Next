"use client";
import React from "react";
import { ThemMoiTruyenData } from "../ui/Data/ComponentData";
import Template from "../ui/QuanLyTruyen/Template";

function ThemMoiTruyen() {
  return (
    <div>
      <Template
        title={ThemMoiTruyenData.title}
        title1={ThemMoiTruyenData.title1}
        components={ThemMoiTruyenData.label}
      />
    </div>
  );
}

export default ThemMoiTruyen;
