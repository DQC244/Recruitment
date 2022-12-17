import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Alert, Button, Snackbar, Stack } from "@mui/material";
import { SideBar } from "components/common/sn-dashboard";
import {
  BannerCompany,
  CompanyDetailDescription,
} from "components/common/sn-company";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanyActions, CompanySelector } from "redux-store";
import { useAuthContext } from "context";
import { CommonUtils } from "utils";
import { AppTypography } from "components/common";
import { getColorStatus, getStatusLabel } from "components/common/helper";
import CompanyActionPanel from "components/common/CompanyActionPanel";
import { AppService } from "services";
import { ApiConstant } from "const";
import { CompanyClass } from "models";

const MyCompany: NextPage = () => {
  const dispatch = useDispatch();

  const { accountInfo } = useAuthContext();
  const company = useSelector(CompanySelector.getCompanyInfo, shallowEqual);
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");

  const [editMode, setEditMode] = useState(false);

  const updateCompanyService = async (data: CompanyClass) => {
    try {
      const res: any = await AppService.updateCompanyDetail(company._id, data);
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

  const handleEdit = async (data: CompanyClass) => {
    await updateCompanyService(data);
    setEditMode(false);
    dispatch(CompanyActions.getCompany(accountInfo.company));
  };

  useEffect(() => {
    if (accountInfo.company) {
      dispatch(CompanyActions.getCompany(accountInfo.company));
    }
  }, [accountInfo.company]);

  return (
    <Stack direction="row" pl={37.5} spacing={3}>
      <SideBar />
      <Stack pr={3} spacing={3}>
        <Stack
          direction="row"
          alignItems="center"
          mt={3}
          justifyContent="space-between"
        >
          <AppTypography
            sx={{
              background: getColorStatus(Number(company.status)),
              color: "common.white",
              py: 0.5,
              px: 1,
              height: "fit-content",
              borderRadius: 2,
            }}
          >
            {getStatusLabel(Number(company.status))}
          </AppTypography>
          <Button
            sx={{ width: 148 }}
            variant="contained"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit"}
          </Button>
        </Stack>
        <Stack>
          {editMode ? (
            <CompanyActionPanel
              handleSubmit={handleEdit}
              labelButton="Update"
              data={company}
            />
          ) : (
            <>
              <BannerCompany data={company} />
              <CompanyDetailDescription />
            </>
          )}
        </Stack>
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
    </Stack>
  );
};

export default MyCompany;

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);
