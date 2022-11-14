import React, { memo } from "react";
import { Box, BoxProps } from "@mui/material";
import Image, { ImageProps } from "next/image";

const AppImage = ({ className, src, ...otherProps }: AppImageType) => {
  return (
    <Box position="relative" className={className}>
      <Image layout="fill" objectFit="contain" src={src} {...otherProps} />
    </Box>
  );
};

type AppImageType = BoxProps &
  ImageProps & {
    src: string;
  };

export default memo(AppImage);
