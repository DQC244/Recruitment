import React, { memo } from "react";
import { Stack, StackProps } from "@mui/material";
import { AppTypography } from "components/common";
import { AppTypographyProps } from "models/types";

const FilterLayout = ({
  children,
  title,
  titleProps,
  ...otherProps
}: FilterLayoutProps) => {
  return (
    <Stack spacing={0.5} {...otherProps}>
      <AppTypography
        responsiveVariant={{ xs: "subtitle2", sm: "subtitle1" }}
        color="attention.black"
        {...titleProps}
      >
        {title}
      </AppTypography>
      {children}
    </Stack>
  );
};

export default memo(FilterLayout);

export type FilterLayoutProps = StackProps & {
  title?: string;
  titleProps?: AppTypographyProps;
};
