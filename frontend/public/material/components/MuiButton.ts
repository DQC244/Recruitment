import palette from "../palette";
import typography from "../typography";

const mediumStyle = {
  padding: "11px 31px",
  borderRadius: 4,
};

const containedMediumStyle = {
  minWidth: 120,
};

const textMediumStyle = {
  minWidth: 48,
};

const textSizeMedium = typography.body1;

export default {
  styleOverrides: {
    root: {
      textTransform: "none" as const,
      color: palette.common.black,
      ...mediumStyle,
      ...textSizeMedium,
    },

    contained: {
      ...containedMediumStyle,
      border: "unset",
      color: palette.common.white,
      "&:disabled": {
        borderColor: "#9698A4",
        color: palette.text.disabled,
      },
    },
    containedPrimary: {
      backgroundColor: palette.primary.main,
      boxShadow: "unset",
      "&:hover": {
        backgroundColor: palette.primary.light,
      },
    },
    containedSecondary: {
      borderColor: "#F5D139",
      backgroundColor: palette.secondary.main,
      boxShadow: `0px 2px 1px 0px ${palette.shadow.secondary}`,
      "&:hover": {
        borderColor: "#F9E191",
        backgroundColor: palette.secondary.light,
      },
    },

    outlined: {
      color: palette.primary.light,
      "&, &:hover": {
        borderColor: "currentColor",
        backgroundColor: "transparent",
      },
    },

    text: {
      ...textMediumStyle,
      "&:disabled": {
        color: palette.text.disabled,
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    textSecondary: {
      color: palette.secondary.main,
      "&:hover": {
        color: palette.secondary.light,
      },
    },
  },
};
