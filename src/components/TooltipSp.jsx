import React from "react";

const TooltipSp = ({ text, feature }) => {
  return (
    <div>
      <span className="font-bold mr-1">{text}:</span>
      <span>{feature.replaceAll("_", " ")}</span>
    </div>
  );
};

export default TooltipSp;
