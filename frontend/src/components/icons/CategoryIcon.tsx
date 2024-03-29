import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models";

const CategoryIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M6.8125 25.1875C5.6625 24.0375 6.425 21.625 5.8375 20.2125C5.25 18.8 3 17.5625 3 16C3 14.4375 5.225 13.25 5.8375 11.7875C6.45 10.325 5.6625 7.9625 6.8125 6.8125C7.9625 5.6625 10.375 6.425 11.7875 5.8375C13.2 5.25 14.4375 3 16 3C17.5625 3 18.75 5.225 20.2125 5.8375C21.675 6.45 24.0375 5.6625 25.1875 6.8125C26.3375 7.9625 25.575 10.375 26.1625 11.7875C26.75 13.2 29 14.4375 29 16C29 17.5625 26.775 18.75 26.1625 20.2125C25.55 21.675 26.3375 24.0375 25.1875 25.1875C24.0375 26.3375 21.625 25.575 20.2125 26.1625C18.8 26.75 17.5625 29 16 29C14.4375 29 13.25 26.775 11.7875 26.1625C10.325 25.55 7.9625 26.3375 6.8125 25.1875Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(CategoryIcon);
