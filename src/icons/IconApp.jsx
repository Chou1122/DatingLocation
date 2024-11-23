import React from "react";
import IconBxHeartCircle from "./IconList/logo";

const iconName = {
  ["logo"]: IconBxHeartCircle,
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
