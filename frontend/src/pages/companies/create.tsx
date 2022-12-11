import React, { useState } from "react";
import { NextPage } from "next";
import { Alert, Container, Snackbar, Stack } from "@mui/material";
import CompanyActionPanel from "components/common/CompanyActionPanel";
import { AppService } from "services";
import { ApiConstant, PathConstant } from "const";
import { useRouter } from "next/router";
import { CommonUtils } from "utils";

const Create: NextPage = () => {
  const router = useRouter();

  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: AppService.companyType) => {
    try {
      const res: any = await AppService.createCompany(data);
      if (res.status === ApiConstant.STT_OK) {
        setError("");
        setTimeout(() => {
          router.push(`${PathConstant.COMPANY}/${res.data._id}`);
        }, 3000);
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
      <Stack spacing={5}>
        <CompanyActionPanel handleSubmit={handleSubmit} labelButton="Create" />
      </Stack>
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
