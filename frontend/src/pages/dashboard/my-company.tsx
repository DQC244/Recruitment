import React, { useEffect } from "react";
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

const MyCompany: NextPage = () => {
  const dispatch = useDispatch();

  const { accountInfo } = useAuthContext();
  const company = useSelector(CompanySelector.getCompanyInfo, shallowEqual);

  useEffect(() => {
    if (accountInfo.company) {
      dispatch(CompanyActions.getCompany(accountInfo.company));
    }
  }, [accountInfo.company]);

  return (
    <Stack direction="row" pl={37.5} spacing={3}>
      <SideBar />
      <Stack pr={3} spacing={3}>
        <Button sx={{ width: 148, mt: 3 }} variant="contained">
          Edit
        </Button>
        <Stack>
          <BannerCompany data={company} />
          <CompanyDetailDescription />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MyCompany;

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);
