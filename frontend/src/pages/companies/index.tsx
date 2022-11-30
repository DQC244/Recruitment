import React, { useState } from "react";
import { NextPage } from "next";
import { Box, Button, Container, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppInput, AppSelect, AppTypography } from "components/common";
import clsx from "clsx";
import { LocationIcon, SearchIcon } from "components/icons";
import { COMPANY_LOCATION_DATA } from "components/common/sn-register/EmployerForm";
import { CATEGORIES, company } from "components/common/sn-home/Banner";
import { CompanyCardList } from "components/common/sn-company";

const Companies: NextPage = () => {
  const classes = useStyles();

  const [companyLocation, setCompanyLocation] = useState<company>(
    COMPANY_LOCATION_DATA[0]
  );
  const [categories, setCategories] = useState<company>(CATEGORIES[0]);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    return;
  };

  const handleChangeLocationCompany = (item: company) => {
    setCompanyLocation(item);
  };

  const handleChangeCategory = (item: company) => {
    setCategories(item);
  };

  return (
    <Container className={classes.root}>
      <Stack width="100%">
        <Box className={clsx("center-root", classes.titleWrapper)}>
          <AppTypography variant="h4">Company List</AppTypography>
        </Box>
        <Stack direction="row">
          <AppInput
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Key Word"
          />
          <Button
            startIcon={<SearchIcon />}
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Stack>
        <Stack direction="row">
          <AppSelect
            selectedIndex={companyLocation.value}
            onSelected={handleChangeLocationCompany}
            data={COMPANY_LOCATION_DATA}
            buttonProps={{
              startIcon: <LocationIcon />,
            }}
          />
          <AppSelect
            selectedIndex={categories.value}
            onSelected={handleChangeCategory}
            data={CATEGORIES}
          />
        </Stack>
        <CompanyCardList />
      </Stack>
    </Container>
  );
};

export default Companies;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  titleWrapper: {
    height: 200,
    width: "100%",
    backgroundColor: "#f6f6f6",
    textAlign: "center",
    color: theme.palette.grey[600],
  },
}));
