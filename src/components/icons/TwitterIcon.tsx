import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models";

const TwitterIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M15.9999 11C15.9999 8.24997 18.3124 5.96247 21.0624 5.99997C22.0255 6.01108 22.9649 6.30011 23.7676 6.83231C24.5703 7.36451 25.2023 8.11722 25.5874 8.99997H29.9999L25.9624 13.0375C25.7019 17.0932 23.9065 20.8974 20.9414 23.6768C17.9763 26.4562 14.064 28.002 9.99994 28C5.99994 28 4.99994 26.5 4.99994 26.5C4.99994 26.5 8.99994 25 10.9999 22C10.9999 22 2.99994 18 4.99994 6.99997C4.99994 6.99997 9.99994 12 15.9999 13V11Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(TwitterIcon);
