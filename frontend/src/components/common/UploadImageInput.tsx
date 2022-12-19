import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, BoxProps, InputBase, InputLabel } from "@mui/material";
import { ImageIcon } from "components/icons";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const UploadImageInput = ({
  label,
  onChangeImage,
  value,
  inputLabelProps,
  wrapperClassName,
  iconClassName,
  imageClassName,
  ...otherProps
}: UploadImageInputProps) => {
  const classes = useStyles();

  const [localImageUrl, setLocalImageUrl] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadFileArray = event?.target?.files;

    if (!uploadFileArray?.length) return;

    if (uploadFileArray[0].size > MAXIMUM_SIZE) {
      return;
    }

    const localImageUrl = URL.createObjectURL(uploadFileArray[0]);

    setLocalImageUrl(localImageUrl);

    onChangeImage(uploadFileArray[0]);
  };

  useEffect(() => {
    if (value) {
      setLocalImageUrl(value);
    }
  }, [value]);

  return (
    <Box {...otherProps}>
      <InputLabel
        classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
        {...inputLabelProps}
      >
        {label}
      </InputLabel>
      <InputLabel
        className={clsx("center-root", classes.wrapper, wrapperClassName)}
        htmlFor="input-file"
      >
        {localImageUrl ? (
          <>
            <Box
              src={localImageUrl}
              component="img"
              className={clsx("center-root", classes.image, imageClassName)}
            />
            <Box className={clsx("center-root", classes.replaceButton)}>
              Replace
            </Box>
          </>
        ) : (
          <>
            <ImageIcon className={clsx(classes.imageIcon, iconClassName)} />
          </>
        )}
      </InputLabel>
      <InputBase
        inputProps={{
          accept: IMAGE_TYPE,
        }}
        type="file"
        id="input-file"
        sx={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
};

const IMAGE_TYPE = "image/gif, image/png, image/jpg";
const MAXIMUM_SIZE = 100000000;

type UploadImageInputProps = BoxProps & {
  label?: string;
  value?: string;
  inputLabelProps?: object;
  wrapperClassName?: string;
  iconClassName?: string;
  imageClassName?: string;

  onChangeImage: (url: File) => void;
};

export default memo(UploadImageInput);

const useStyles = makeStyles((theme: ThemeProps) => ({
  labelRoot: {
    ...theme.typography?.subtitle2,
    color: "black",
  },
  asterisk: {
    color: theme.palette.error[4],
  },
  imageIcon: {
    marginBottom: theme.spacing(2),
    color: "black",
    stroke: "black",
    fontSize: 112,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    transition: ".25s ease",
  },
  replaceButton: {
    position: "absolute",
    width: 148,
    height: 48,
    top: "50%",
    left: "50%",
    color: "black",
    transform: "translate(-50%, -50%)",
    background: "rgba(255, 255, 255, 0.16)",
    border: `1px solid ${theme.palette.common.black}`,
    borderRadius: 8,
    opacity: 0,
    transition: ".25s ease",
  },
  wrapper: {
    position: "relative",
    width: 400,
    height: 400,
    flexDirection: "column",
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid black",
    borderRadius: 8,
    cursor: "pointer",
    "&:hover": {
      "& $image": {
        opacity: 0.3,
      },
      "& $replaceButton": {
        opacity: 1,
      },
    },
  },
}));
