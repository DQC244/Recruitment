import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, Button, Container, InputClasses, Stack } from "@mui/material";
import { CommonUtils } from "utils";
import { AppInput } from "components/common";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import MainCv from "components/common/sn-cv/MainCv";
import { ArrowIcon } from "components/icons";
import { useRouter } from "next/router";

const CreateCv: NextPage = () => {
  const classes = useStyles();
  const router=useRouter()
  const [title, setTitle] = useState("Untitled CV");

  return (
    <>
      <Container>
        <Box className="space-between-root" mt={2}>
          <Button
            classes={{ startIcon: classes.startIcon }}
            variant="contained"
            startIcon={<ArrowIcon />}
            onClick={()=>{
              router.back()
            }}
          >
            Back
          </Button>
          <Button className={classes.buttonSave}>Download CV</Button>
        </Box>
        <Stack spacing={5} alignItems="center" mt={2}>
          <AppInput
            InputProps={{
              classes: { input: classes.inputTitle } as InputClasses,
            }}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <MainCv />
        </Stack>
      </Container>
    </>
  );
};

export default CreateCv;

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);

const useStyles = makeStyles((theme: ThemeProps) => ({
  inputTitle: {
    textAlign: "center",
  },
  startIcon: {
    stroke: theme.palette.common.white,
    transform: "rotate(90deg)",
  },
  buttonSave: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,

    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));
