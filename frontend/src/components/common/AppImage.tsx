import React, { memo } from "react";
import { Box, BoxProps } from "@mui/material";
import Image from "next/image";

const AppImage = ({
  className,
  src,
  imageProps,
  ...otherProps
}: AppImageType) => {
  return (
    <Box position="relative" className={className} {...otherProps}>
      {src && (
        <Image
          layout="fill"
          objectFit="contain"
          draggable={false}
          src={src}
          {...imageProps}
        />
      )}
    </Box>
  );
};

type AppImageType = BoxProps & {
  src?: string;
  imageProps?: object;
};

export default memo(AppImage);
