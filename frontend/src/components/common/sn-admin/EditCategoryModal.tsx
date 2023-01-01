import { Button, Stack } from "@mui/material";
import { CommonModalProps } from "models/types";
import React, { useEffect, useState } from "react";
import AppInput from "../AppInput";
import { CommonModal } from "../modal";
import UploadImageInput from "../UploadImageInput";

const EditCategoryModal = ({
  label,
  data,
  onSubmit,
  ...otherProps
}: EditModalProps) => {
  const [category, setCategory] = useState<any>();

  const handleChangeImage = (url: File) => {
    setCategory({ ...category, image: url });
  };

  useEffect(() => {
    if (Object.values(data || {}).length) {
      setCategory(data);
    }
  }, [data]);
  return (
    <CommonModal
      hasCloseIcon
      modalTitleProps={{ title: "Edit Category" }}
      modalContentProps={{
        content: (
          <Stack spacing={2}>
            <AppInput
              label="Name"
              required
              value={category?.name || ""}
              onChange={(event) =>
                setCategory({ ...category, name: event.currentTarget.value })
              }
            />
            <UploadImageInput
              label="Thumbnail"
              onChangeImage={handleChangeImage}
              inputLabelProps={{ required: true }}
              value={category?.image}
            />
            <Button
              disabled={!category?.name || !category?.image}
              variant="contained"
              onClick={() => onSubmit(category)}
            >
              {label || "Update"}
            </Button>
          </Stack>
        ),
      }}
      {...otherProps}
    />
  );
};

type EditModalProps = CommonModalProps & {
  data?: any;
  label?: string;
  onSubmit: (value: any) => void;
};

export default EditCategoryModal;
