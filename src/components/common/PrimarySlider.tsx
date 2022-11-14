import React, { forwardRef, memo, ReactNode } from "react";
import { ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import { ArrowIcon } from "components/icons";
import Slider, {
  Settings as CarouselSettings,
  CustomArrowProps,
} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import clsx from "clsx";

const PrimarySlider = ({
  className,
  children,
  ...otherProps
}: PrimarySliderProps) => {
  const classes = useStyles();

  return (
    <Slider
      className={clsx(classes.slide, className)}
      {...SETTINGS}
      {...otherProps}
    >
      {children}
    </Slider>
  );
};

type PrimarySliderProps = {
  className?: string;
  carouselSettings?: CarouselSettings;
  children: ReactNode;
};

export default memo(PrimarySlider);

const NextArrow = forwardRef<HTMLButtonElement, CustomArrowProps>(
  (props, ref) => {
    const { onClick } = props;
    const classes = useStyles();

    return (
      <IconButton
        className={clsx(
          classes.navigateButton,
          classes.nextButton,
          !onClick && classes.hiddenButton
        )}
        ref={ref}
        onClick={onClick}
      >
        <ArrowIcon
          sx={{
            transform: "rotate(-90deg)",
          }}
        />
      </IconButton>
    );
  }
);

NextArrow.displayName = "NextArrow";

const PrevArrow = forwardRef<HTMLButtonElement, CustomArrowProps>(
  (props, ref) => {
    const { onClick } = props;
    const classes = useStyles();

    return (
      <IconButton
        className={clsx(
          classes.navigateButton,
          classes.preButton,
          !onClick && classes.hiddenButton
        )}
        ref={ref}
        onClick={onClick}
      >
        <ArrowIcon sx={{ transform: "rotate(90deg)" }} />
      </IconButton>
    );
  }
);

PrevArrow.displayName = "PrevArrow";

const SETTINGS = {
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  slide: {
    "& .slick-track": {
      margin: 0,
    },
    " & .slick-list": {
      margin: theme.spacing(0, -1),
      "& .slick-slide > div": {
        padding: theme.spacing(1),
      },
    },
  },
  navigateButton: {
    position: "absolute",
    top: "50%",
    width: 24,
    height: 24,
    transform: "translate(0, -50%)",
    fontSize: 16,
    color: "transparent",
    background: theme.palette.grey[700],
    borderRadius: "50%",
    stroke: theme.palette.common.white,
    zIndex: 1,
    "&:hover": {
      background: theme.palette.grey[700],
    },
  },
  preButton: {
    left: -12,
  },
  nextButton: {
    right: -12,
  },
  hiddenButton: {
    display: "none",
  },
}));
