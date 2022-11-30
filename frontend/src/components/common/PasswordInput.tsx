import React, { useState, useCallback, memo, ChangeEvent } from "react";
import { AppInput } from "components/common";
import { IconButton } from "@mui/material";
import { HiddenIcon, UnHiddenIcon } from "components/icons";
import { CommonUtils } from "utils";
import { AppInputProps } from "./AppInput";

const PasswordInput = ({
  onChangeValue,
  InputLabelProps,
  InputProps,
  ...otherProps
}: PasswordInputProps) => {
  const [value, setValue] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const createHandleShowPassword = useCallback(
    (show: boolean) => () => setIsShowPassword(show),
    []
  );

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = CommonUtils.removeUnnecessarySpace(event.target.value);
    setValue(newValue);
    onChangeValue(newValue);
  }, []);

  return (
    <AppInput
      type={isShowPassword ? "text" : "password"}
      required
      onChange={onChange}
      InputLabelProps={{ shrink: true, ...InputLabelProps }}
      InputProps={{
        endAdornment: (
          <IconButton
            sx={{
              display: value.length ? "flex" : "none",
              borderRadius: "50%",
            }}
            onClick={createHandleShowPassword(!isShowPassword)}
          >
            {isShowPassword ? (
              <UnHiddenIcon sx={{ color: "common.black" }} />
            ) : (
              <HiddenIcon sx={{ color: "common.black" }} />
            )}
          </IconButton>
        ),
        ...InputProps,
      }}
      {...otherProps}
    />
  );
};

type PasswordInputProps = AppInputProps & {
  onChangeValue: (value: string) => void;
};

export default memo(PasswordInput);
