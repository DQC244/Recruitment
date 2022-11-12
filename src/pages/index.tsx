import React, { useEffect } from "react";
import { NextPage } from "next";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AccountActions, AccountSelector } from "redux-store";
import { AccountClass } from "models";
import { AppLink } from "components/common";
import { PathConstant } from "const";

const Home: NextPage = () => {
  const { t: getLabel } = useTranslation();
  const dispatch = useDispatch();
  const account = useSelector(AccountSelector.getAccountInfo);

  useEffect(() => {
    setTimeout(() => {
      account.name = Date.now().toString();
      dispatch(AccountActions.accountSet({ account: new AccountClass(account) }));
    }, 2000);
  }, []);

  return (
    <Container>
      <Typography variant="h1">Home</Typography>
      <Typography>Test Language: {getLabel("lLogin")}</Typography>
      <Typography>Email: {account.email}</Typography>
      <Typography>Name: {account.name}</Typography>
      <AppLink href={PathConstant.UI_DEMO}>UI Demo</AppLink>
    </Container>
  );
};

export default Home;
