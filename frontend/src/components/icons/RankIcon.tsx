import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models";

const RankIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M27 27H5"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 10V22C18 22.5523 18.4477 23 19 23H24C24.5523 23 25 22.5523 25 22V10C25 9.44771 24.5523 9 24 9H19C18.4477 9 18 9.44771 18 10Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 4H8C7.44772 4 7 4.44772 7 5V22C7 22.5523 7.44772 23 8 23H13C13.5523 23 14 22.5523 14 22V5C14 4.44772 13.5523 4 13 4Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(RankIcon);
