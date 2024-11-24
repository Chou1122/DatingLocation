import React from "react";
import IconBxHeartCircle from "./IconList/logo";
import IconCancel from "./IconList/cancel";
import { IconEye } from "./IconList/eye";
import { IconEyeInvisible } from "./IconList/eye-close";

const iconName = {
  ["logo"]: IconBxHeartCircle,
  ["cancel"]: IconCancel,
  ["eye"]: IconEye,
  ["eye-close"]: IconEyeInvisible,
};

const IconApp = ({
  name,
  width = "50px",
  height = "50px",
  className = "",
  ...props
}) => {
  const IconComponent = iconName[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <div>
      <IconComponent width={width} height={height} />
    </div>
  );
};

export default IconApp;
