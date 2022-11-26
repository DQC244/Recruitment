import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models";

const ImageIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 115 96"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M73.6562 37.3281C76.8923 37.3281 79.5156 34.7048 79.5156 31.4688C79.5156 28.2327 76.8923 25.6094 73.6562 25.6094C70.4202 25.6094 67.7969 28.2327 67.7969 31.4688C67.7969 34.7048 70.4202 37.3281 73.6562 37.3281Z"
        fill="currentColor"
        stroke="transparent"
        fillOpacity="0.6"
      />
      <path
        d="M1 71.3125L30.4727 41.8398C30.9088 41.3969 31.4287 41.0452 32.0021 40.8051C32.5755 40.565 33.1909 40.4414 33.8125 40.4414C34.4341 40.4414 35.0495 40.565 35.6229 40.8051C36.1963 41.0452 36.7162 41.3969 37.1523 41.8398L63.2852 67.9726C63.7213 68.4155 64.2412 68.7673 64.8146 69.0073C65.388 69.2474 66.0034 69.371 66.625 69.371C67.2466 69.371 67.862 69.2474 68.4354 69.0073C69.0088 68.7673 69.5287 68.4155 69.9648 67.9726L82.0352 55.9023C82.4713 55.4594 82.9912 55.1077 83.5646 54.8676C84.138 54.6275 84.7534 54.5039 85.375 54.5039C85.9966 54.5039 86.612 54.6275 87.1854 54.8676C87.7588 55.1077 88.2787 55.4594 88.7148 55.9023L113.5 80.6875"
        fill="transparent"
        stroke="currentStroke"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M108.812 1H5.6875C3.09866 1 1 3.09866 1 5.6875V90.0625C1 92.6513 3.09866 94.75 5.6875 94.75H108.812C111.401 94.75 113.5 92.6513 113.5 90.0625V5.6875C113.5 3.09866 111.401 1 108.812 1Z"
        stroke="currentStroke"
        fill="transparent"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(ImageIcon);
