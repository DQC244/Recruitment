import React, { memo } from "react";
import { makeStyles } from "@mui/styles";
import {
  InputClasses,
  InputLabelClasses,
  InputLabelProps,
  InputProps,
  TextField,
  FormHelperTextProps,
  FormHelperTextClasses,
  StandardTextFieldProps,
} from "@mui/material";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const AppInput = ({
  InputProps = {},
  InputLabelProps = {},
  FormHelperTextProps = {},
  ...otherProps
}: AppInputProps) => {
  const classes = useStyles();

  const { classes: inputClasses, ...otherInputProps } = InputProps;
  const { classes: inputLabelClasses, ...otherInputLabelProps } =
    InputLabelProps;
  const { classes: helperTextClasses, ...otherHelperTextProps } =
    FormHelperTextProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        classes: {
          ...inputClasses,
          root: clsx(classes.inputRoot, inputClasses?.root),
          input: clsx(classes.input, inputClasses?.input),
          disabled: clsx(classes.inputDisabled, inputClasses?.disabled),
          focused: clsx(classes.inputFocused, inputClasses?.focused),
          error: clsx(classes.inputError, inputClasses?.error),
        },
        ...otherInputProps,
      }}
      InputLabelProps={{
        classes: {
          ...inputLabelClasses,
          root: clsx(classes.inputLabelRoot, inputLabelClasses?.root),
          focused: clsx(classes.inputLabelFocused, inputLabelClasses?.focused),
          error: clsx(classes.inputLabelError, inputLabelClasses?.error),
          asterisk: clsx(
            classes.inputLabelAsterisk,
            inputLabelClasses?.asterisk
          ),
        },
        shrink: true,
        ...otherInputLabelProps,
      }}
      FormHelperTextProps={{
        classes: {
          ...helperTextClasses,
          error: clsx(classes.helperTextError, helperTextClasses?.error),
        },
        ...otherHelperTextProps,
      }}
      {...otherProps}
    />
  );
};

export type AppInputProps = StandardTextFieldProps & {
  InputLabelProps?: InputLabelProps & {
    classes?: InputLabelClasses;
  };
  InputProps?: InputProps & {
    classes?: InputClasses;
  };
  FormHelperTextProps?: FormHelperTextProps & {
    classes?: FormHelperTextClasses;
  };
};

export default memo(AppInput);

const useStyles = makeStyles<ThemeProps>((theme) => ({
  inputRoot: {
    "&$inputRoot": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      borderRadius: 8,
      "& [class*='notchedOutline']": {
        padding: 0,
        borderColor: theme.palette.grey[400],
        borderRadius: 8,
        boxShadow: "unset",
        "& legend": {
          width: 0,
        },
      },
    },
  },
  inputFocused: {
    "&$inputRoot [class*='notchedOutline']": {
      borderColor: `1px solid ${theme.palette.grey[600]}`,
      boxShadow: "none",
    },
  },
  input: {
    ...theme.typography?.body1,
    height: "unset",
    padding: theme.spacing(1.5, 2),
    color: theme.palette.text.primary,
    "&::placeholder": {
      color: theme.palette.common.black,
    },
  },
  inputDisabled: {
    "&$inputDisabled": {
      backgroundColor: "rgba(255, 255, 255, 0.04)",
      "&::placeholder": {
        color: theme.palette.grey[600],
        "-webkit-text-fill-color": theme.palette.grey[600],
      },
      "&:hover [class*='notchedOutline']": {
        borderColor: "transparent",
      },
    },
  },
  inputError: {
    "&$inputError": {
      "& [class*='notchedOutline']": {
        borderColor: theme.palette.error[3],
      },
      "&:hover [class*='notchedOutline']": {
        borderColor: theme.palette.error[3],
      },
    },
  },
  inputLabelRoot: {
    ...theme?.typography?.subtitle2,
    position: "relative",
    transform: "initial",
    color: theme.palette.common.black,
    marginBottom: theme.spacing(0.5),
  },
  inputLabelFocused: {
    "&$inputLabelFocused": {
      color: theme.palette.common.black,
    },
  },
  inputLabelError: {
    "&$inputLabelError": {
      color: theme.palette.common.black,
    },
  },
  inputLabelAsterisk: {
    "&$inputLabelAsterisk": {
      color: theme.palette.error[4],
    },
  },
  helperTextError: {
    "&$helperTextError": {
      margin: theme.spacing(0.5, 0, 0),
      color: theme.palette.error[3],
    },
  },
}));
