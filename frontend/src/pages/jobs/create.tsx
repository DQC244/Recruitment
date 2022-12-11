import React, { useState } from "react";
import { NextPage } from "next";
import { Alert, Container, Snackbar, Stack } from "@mui/material";
import { HorizontalLinearStepper, JobActionPanel } from "components/common";
import { AppService } from "services";
import { ApiConstant } from "const";
import { CommonUtils } from "utils";

const Create: NextPage = () => {
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");

  const handleCreateJob = async (data: any) => {
    try {
      const res: any = await AppService.createJob(data);
      if (res.status === ApiConstant.STT_OK) {
        setError("");
      } else {
        setError(res.data.message);
      }
      setIsOpenMsg(true);
    } catch (error) {
      setError("something went wrong");
      setIsOpenMsg(true);
    }
  };

  return (
    <Container>
      <Stack spacing={4} py={5}>
        <JobActionPanel label="Create" onSubmit={handleCreateJob} />
      </Stack>
      {/* <HorizontalLinearStepper
        steps={[
          "Select master blaster campaign settings",
          "Create an ad group",
          "Create an ad",
        ]}
        onBack={() => {
          return;
        }}
        onNext={() => {
          return;
        }}
      /> */}
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
    </Container>
  );
};

export default Create;

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);
