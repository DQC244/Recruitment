import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models";

const QualificationIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M4 8V18"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.7749 26.9999C7.77548 25.4653 9.14312 24.2045 10.7539 23.3317C12.3648 22.459 14.1679 22.002 15.9999 22.002C17.8319 22.002 19.635 22.459 21.2459 23.3317C22.8567 24.2045 24.2243 25.4653 25.2249 26.9999"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 8L16 12L4 8L16 4L28 8Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.1625 10.2749C22.0798 11.2766 22.6859 12.5236 22.9068 13.8638C23.1277 15.204 22.954 16.5795 22.4067 17.8226C21.8595 19.0658 20.9624 20.1229 19.8248 20.865C18.6872 21.6072 17.3583 22.0023 16 22.0023C14.6417 22.0023 13.3128 21.6072 12.1752 20.865C11.0376 20.1229 10.1405 19.0658 9.59329 17.8226C9.04604 16.5795 8.87229 15.204 9.09322 13.8638C9.31414 12.5236 9.9202 11.2766 10.8375 10.2749"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(QualificationIcon);
