import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models";

const TimeCloseIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M16 10V16"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.2 19L16 16"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.9751 12.4624H3.9751V7.4624"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.2251 23.775C9.76312 25.3143 11.7231 26.3628 13.8572 26.788C15.9912 27.2132 18.2034 26.9958 20.2139 26.1635C22.2244 25.3312 23.9429 23.9213 25.152 22.1122C26.3611 20.3031 27.0064 18.176 27.0064 16C27.0064 13.824 26.3611 11.6969 25.152 9.8878C23.9429 8.07866 22.2244 6.66877 20.2139 5.83647C18.2034 5.00417 15.9912 4.78686 13.8572 5.21202C11.7231 5.63719 9.76312 6.68573 8.2251 8.22501L3.9751 12.4625"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(TimeCloseIcon);
