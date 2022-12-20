import { Alert, Button, Snackbar, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ApiConstant } from "const";
import useUploadCv from "hooks/useUploadCv";
import { CommonModalProps, ThemeProps } from "models/types";
import React, { ChangeEvent, useState } from "react";
import { AppService } from "services";
import AppInput from "../AppInput";
import AppTypography from "../AppTypography";
import { CommonModal } from "../modal";

const ApplyJobModal = ({ jobId, onClose, ...otherProps }: ApplyModalProps) => {
  const classes = useStyles();
  const handleUploadCv = useUploadCv();

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [cvUrl, setCvUrl] = useState<File>();
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");

  const isDisableButton = !data.email || !data.name || !data.message || !cvUrl;

  const handleApplyService = async (data: any) => {
    try {
      const res: any = await AppService.applyJob(data);
      if (res.status === ApiConstant.STT_OK) {
        setError("");
      } else {
        setError(res.data.message || "Something went wrong");
      }
      setIsOpenMsg(true);
    } catch (error) {
      setError("Something went wrong");
      setIsOpenMsg(true);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadFileArray = event?.target?.files;

    if (!uploadFileArray?.length) return;

    setCvUrl(uploadFileArray[0]);
  };

  const handleApply = async () => {
    let url;
    if (cvUrl instanceof File) {
      url = await handleUploadCv(cvUrl);
      const payload = {
        ...data,
        jobId,
        cvUrl: url,
      };

      handleApplyService(payload);
      onClose();
    }
  };

  return (
    <>
      <CommonModal
        hasCloseIcon
        classes={{ paper: classes.paper }}
        modalTitle={
          <AppTypography variant="h3" className={classes.title}>
            APPLY FOR THIS JOB
          </AppTypography>
        }
        modalContentProps={{
          content: (
            <Stack spacing={3} mt={4}>
              <AppInput
                label="Full Name"
                value={data?.name}
                onChange={(e) =>
                  setData({ ...data, name: e.currentTarget.value })
                }
              />
              <AppInput
                label="Email Address"
                value={data?.email}
                onChange={(e) =>
                  setData({ ...data, email: e.currentTarget.value })
                }
              />
              <AppInput
                label="Message"
                value={data?.message}
                multiline
                onChange={(e) =>
                  setData({ ...data, message: e.currentTarget.value })
                }
              />
              <AppInput
                type="file"
                label="Up Load CV"
                onChange={handleFileChange}
                InputProps={{
                  inputProps: {
                    accept: IMAGE_TYPE,
                  },
                }}
              />
              <Button
                className={classes.button}
                variant="contained"
                disabled={isDisableButton}
                onClick={handleApply}
              >
                Send Application
              </Button>
            </Stack>
          ),
        }}
        onClose={onClose}
        closeIconProps={{ className: classes.iconClose }}
        {...otherProps}
      />
      <Snackbar
        open={isOpenMsg}
        autoHideDuration={5000}
        onClose={() => setIsOpenMsg(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setIsOpenMsg(false)}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || "success!"}
        </Alert>
      </Snackbar>
    </>
  );
};

type ApplyModalProps = CommonModalProps & {
  jobId?: string;
};

export default ApplyJobModal;

const IMAGE_TYPE = "application/pdf";

const useStyles = makeStyles((theme: ThemeProps) => ({
  paper: {
    border: "unset",
  },
  title: {
    textAlign: "center",
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  button: {
    textTransform: "uppercase",
  },
  iconClose: {
    color: theme.palette.common.white,
  },
}));
