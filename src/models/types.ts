import { ReactNode } from "react";
import { Theme } from "@mui/system";
import { TypographyProps, SxProps, SvgIconProps } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

export interface IProps {
  children?: ReactNode;
  className?: string;
  classes?: object;
}

export interface IIconProps extends SvgIconProps {
  sx?: object;
  className?: string;
}

export interface ThemeProps extends Theme {
  typography?: {
    h1?: object;
    h2?: object;
    h3?: object;
    h4?: object;
    h5?: object;
    h6?: object;
    body1?: object;
    body2?: object;
    subtitle1?: object;
    subtitle2?: object;
    caption?: object;
    overline?: object;
  };
}

export interface AppTypographyProps extends TypographyProps {
  variant?: Variant;
  children?: ReactNode;
  responsiveVariant?: {
    xs?: Variant;
    sm?: Variant;
    md?: Variant;
    lg?: Variant;
    xl?: Variant;
  };
  sx?: SxProps;
  component?: ReactNode;
  className?: string;
}

export interface EventInputFileProps {
  target: HTMLInputElement & EventTarget;
}

export interface ObjectMultiLanguageProps {
  [x: string]: string;
}
