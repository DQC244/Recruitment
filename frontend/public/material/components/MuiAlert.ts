import palette from "../palette";
import typography from "../typography";

export default {
  styleOverrides: {
    root: {
      ...typography.h4,
    },

    standardError: {
      background: palette.error.main,
      color: palette.common.white,
    },
    standardSuccess: {
      background: palette.success.main,
      color: palette.common.white,
    },
    icon: {
      color: "inherit !important",
      fontSize: 32,
    },
  },
};
