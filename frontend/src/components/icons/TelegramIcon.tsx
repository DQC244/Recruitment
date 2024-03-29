import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models";

const TelegramIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M10.9999 16.8625L22.2374 26.75C22.3673 26.865 22.5248 26.9442 22.6945 26.9799C22.8643 27.0156 23.0404 27.0065 23.2055 26.9535C23.3707 26.9006 23.5193 26.8056 23.6366 26.6779C23.754 26.5501 23.8361 26.3941 23.8749 26.225L28.5749 5.70004C28.6143 5.52327 28.605 5.33913 28.5479 5.16726C28.4908 4.99538 28.3881 4.84224 28.2508 4.72417C28.1135 4.6061 27.9467 4.52753 27.7682 4.49686C27.5897 4.4662 27.4062 4.48457 27.2374 4.55004L4.16239 13.6125C3.23739 13.975 3.36239 15.325 4.33739 15.525L10.9999 16.8625Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 16.8625L28.0125 4.57495"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6125 21.8L12.7125 25.7001C12.5734 25.8413 12.3954 25.9381 12.2011 25.9779C12.0069 26.0178 11.8052 25.9991 11.6216 25.924C11.4381 25.849 11.281 25.7211 11.1703 25.5566C11.0596 25.3921 11.0003 25.1983 11 25V16.8625"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(TelegramIcon);
