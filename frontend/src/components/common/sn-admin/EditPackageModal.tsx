import { Button, Stack } from "@mui/material";
import { CommonModalProps } from "models/types";
import React, { useEffect, useState } from "react";
import AppInput from "../AppInput";
import { CommonModal } from "../modal";

const EditPackageModal = ({
  label,
  data,
  onSubmit,
  ...otherProps
}: EditModalProps) => {
  const [packageData, setPackageData] = useState<any>();

  const isDisableButton =
    !packageData?.name ||
    !packageData?.description ||
    !packageData.price ||
    !packageData?.expireDay;

  useEffect(() => {
    if (Object.values(data || {}).length) {
      setPackageData(data);
    }
  }, [data]);
  return (
    <CommonModal
      hasCloseIcon
      modalTitleProps={{ title: "Edit package" }}
      modalContentProps={{
        content: (
          <Stack spacing={2}>
            <AppInput
              label="Name"
              required
              value={packageData?.name || ""}
              onChange={(event) =>
                setPackageData({
                  ...packageData,
                  name: event.currentTarget.value,
                })
              }
            />
            <AppInput
              label="Description"
              required
              multiline={true}
              value={packageData?.description || ""}
              onChange={(event) =>
                setPackageData({
                  ...packageData,
                  description: event.currentTarget.value,
                })
              }
            />
            <AppInput
              required
              label="Price"
              value={packageData?.price || ""}
              onChange={(e) =>
                setPackageData({
                  ...packageData,
                  price: e.currentTarget.value,
                })
              }
              onKeyDown={(event) =>
                INVALID_CHARS.includes(event.key) && event.preventDefault()
              }
              type="number"
            />
            <AppInput
              required
              label="Expire Day"
              value={packageData?.expireDay || ""}
              onChange={(e) =>
                setPackageData({
                  ...packageData,
                  expireDay: e.currentTarget.value,
                })
              }
              onKeyDown={(event) =>
                INVALID_CHARS.includes(event.key) && event.preventDefault()
              }
              type="number"
            />

            <Button
              disabled={isDisableButton}
              variant="contained"
              onClick={() => onSubmit(packageData)}
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

export default EditPackageModal;

const INVALID_CHARS = ["e", "E", "+", "-", ".", ","];
