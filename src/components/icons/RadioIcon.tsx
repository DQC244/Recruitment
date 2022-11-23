import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models";

const RadioIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="11"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="5" y="5" width="14" height="14" rx="7" fill="currentColor" />
    </SvgIcon>
  );
};

export default memo(RadioIcon);
