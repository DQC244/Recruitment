import React, { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, Button, Container, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppInput, AppTypography } from "components/common";
import clsx from "clsx";
import { LocationIcon, SearchIcon } from "components/icons";
import { company } from "components/common/sn-home/Banner";
import { CompanyCardList } from "components/common/sn-company";
import { CategoriesSelect } from "components/common/select";
import { useDispatch, useSelector } from "react-redux";
import { CompanyActions, CompanySelector } from "redux-store";
import { AppConstant } from "const";
import { CommonUtils } from "utils";

const Companies: NextPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const queryParams = useSelector(CompanySelector.getQueryParams);
  const [search, setSearch] = useState("");

  const handleDebounce = CommonUtils.debounce((queryParams: any) => {
    dispatch(
      CompanyActions.setQueryParams({
        ...queryParams,
      })
    );
  }, AppConstant.DEBOUNCE_TIME_IN_MILLISECOND);

  const handleChangeLocationCompany = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;

    const newQuery = {
      ...queryParams,
      location: value,
    };

    handleDebounce(newQuery);
  };

  const handleChangeCategory = (item: company) => {
    dispatch(
      CompanyActions.setQueryParams({
        ...queryParams,
        categoryId: item,
      })
    );
  };

  const handleSearch = () => {
    dispatch(
      CompanyActions.setQueryParams({
        ...queryParams,
        search,
      })
    );
    return;
  };

  useEffect(() => {
    if (!queryParams) return;

    dispatch(
      CompanyActions.getCompanyList({
        ...queryParams,
        status: AppConstant.STATUS.published,
      })
    );
  }, [queryParams]);

  useEffect(() => {
    if (!queryParams) return;

    dispatch(
      CompanyActions.getCompanyList({
        page: AppConstant.DEFAULT_PAGINATION.page,
        size: AppConstant.DEFAULT_PAGINATION.size,
        status: AppConstant.STATUS.published,
      })
    );
  }, []);

  return (
    <Container className={classes.root}>
      <Stack width="100%">
        <Box className={clsx("center-root", classes.titleWrapper)}>
          <AppTypography variant="h3">Company List</AppTypography>
        </Box>
        <Stack direction="row" mt={2}>
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
            sx={{ ml: 1 }}
          >
            Search
          </Button>
        </Stack>
        <Stack direction="row" mt={2} justifyContent="space-between">
          <AppInput
            label="Location"
            onChange={handleChangeLocationCompany}
            InputProps={{
              startAdornment: <LocationIcon />,
            }}
            sx={{ width: 200 }}
          />
          <Stack alignItems="flex-end">
            <AppTypography variant="subtitle2" sx={{ mb: 0.5 }}>
              Category
            </AppTypography>
            <CategoriesSelect onChangeCategories={handleChangeCategory} />
          </Stack>
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
    boxShadow: "5px 5px 25px rgb(0 0 0 / 8%)",
    textAlign: "center",
  },
}));
