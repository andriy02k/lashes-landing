"use client";

import { CSSProperties, useState } from "react";

export function PayButton() {
  const [hover, setHover] = useState(false);

  const buttonStyle: CSSProperties = {
    display: "inline-block",
    background: `#f1f1f1 url('https://wfpstorage.s3.eu-west-1.amazonaws.com/button/bg7x2.png') no-repeat center right`,
    backgroundSize: "cover",
    width: "256px",
    height: "54px",
    border: "1px solid #ccc",
    borderRadius: "14px",
    padding: "16px",
    textDecoration: "none",
    boxShadow: "3px 2px 8px rgba(71,66,66,0.22)",
    textAlign: "left",
    outline: "none",
    boxSizing: "border-box",
    opacity: hover ? 0.8 : 1,
    transition: "opacity 0.2s",
  };

  const textStyle: CSSProperties = {
    fontFamily: "Verdana, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#2094de",
    lineHeight: "18px",
    verticalAlign: "middle",
  };

  return (
    <a
      href="https://secure.wayforpay.com/button/b65cfd1b6fbc0"
      style={buttonStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={textStyle}>Оплатити</span>
    </a>
  );
}
