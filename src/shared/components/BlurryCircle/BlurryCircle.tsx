import React from "react";

interface BlurryCircleProps {
  size?: number;
  color?: string;
  blur?: number;
  style?: React.CSSProperties;
}

export const BlurryCircle: React.FC<BlurryCircleProps> = ({
  size = 200,
  color = "#FFF",
  blur = 100,
  style = {},
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${blur}px)`,
        position: "absolute",
        ...style,
      }}
    />
  );
};
