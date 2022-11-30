import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models";

const SearchIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 28 28"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M12.6875 21.875C17.7616 21.875 21.875 17.7616 21.875 12.6875C21.875 7.61338 17.7616 3.5 12.6875 3.5C7.61338 3.5 3.5 7.61338 3.5 12.6875C3.5 17.7616 7.61338 21.875 12.6875 21.875Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.1843 19.1846L24.5 24.5002"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(SearchIcon);
