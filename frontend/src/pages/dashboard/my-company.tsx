import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Button, Stack } from "@mui/material";
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

const MyCompany: NextPage = () => {
  const dispatch = useDispatch();

  const { accountInfo } = useAuthContext();
  const company = useSelector(CompanySelector.getCompanyInfo, shallowEqual);

  const [editMode, setEditMode] = useState(false);

  const handleEdit = async () => {};

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
            onClick={() => setEditMode(true)}
          >
            Edit
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
    </Stack>
  );
};

export default MyCompany;

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);
