"use client";

import { CSSProperties } from "react";

const buttonStyle: CSSProperties = {
  display: "inline-block",
  background:
    "#2B3160 url('https://wfpstorage.s3.eu-west-1.amazonaws.com/button/bg6x2.png') no-repeat center right",
  backgroundSize: "cover",
  width: "256px",
  height: "54px",
  border: "none",
  borderRadius: "14px",
  padding: "16px",
  textDecoration: "none",
  boxShadow: "3px 2px 8px rgba(71,66,66,0.22)",
  textAlign: "left",
  boxSizing: "border-box",
};

const textStyle: CSSProperties = {
  fontFamily: "Verdana, Arial, sans-serif",
  fontWeight: "bold",
  fontSize: "14px",
  color: "#ffffff",
  lineHeight: "18px",
  verticalAlign: "middle",
};

export function PayButton() {
  return (
    <a
      href="https://secure.wayforpay.com/button/b65cfd1b6fbc0"
      style={buttonStyle}
      onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
    >
      <span style={textStyle}>Оплатити</span>
    </a>
  );
}
