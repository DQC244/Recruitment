import { Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CommonModalProps, ThemeProps } from "models/types";
import React from "react";
import AppInput from "../AppInput";
import AppTypography from "../AppTypography";
import { CommonModal } from "../modal";

const ApplyJobModal = (props: CommonModalProps) => {
  const classes = useStyles();

  return (
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
            <AppInput label="Full Name" />
            <AppInput label="Email Address" />
            <AppInput label="Message" multiline />
            <AppInput type="file" label="Up Load CV" />
            <Button className={classes.button} variant="contained">
              Send Application
            </Button>
          </Stack>
        ),
      }}
      closeIconProps={{ className: classes.iconClose }}
      {...props}
    />
  );
};

export default ApplyJobModal;

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
