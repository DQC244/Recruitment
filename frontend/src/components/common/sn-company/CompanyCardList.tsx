import React from "react";
import { Box, Pagination, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LocationIcon, CategoryIcon } from "components/icons";
import { AppConstant, ImageConstant, PathConstant } from "const";
import { ThemeProps } from "models/types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanyActions, CompanySelector } from "redux-store";
import AppLink from "../AppLink";
import AppTypography from "../AppTypography";

const CompanyCardList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const queryParams = useSelector(CompanySelector.getQueryParams, shallowEqual);
  const pagination = useSelector(CompanySelector.getPagination, shallowEqual);
  const companyList = useSelector(CompanySelector.getCompanyList, shallowEqual);
  const categories = useSelector(CompanySelector.getCategoryList, shallowEqual);

  const handleGetCompanyList = (page: number) => {
    const newQueryParams = {
      ...queryParams,
      page,
    };

    dispatch(CompanyActions.getCompanyList(newQueryParams));
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    handleGetCompanyList(value);
  };

  return (
    <>
      <Stack className={classes.root}>
        {companyList.listItems?.length !== 0 ? (
          <>
            {companyList.listItems?.map((item, index) => (
              <AppLink
                href={`${PathConstant.COMPANY}/${item._id}`}
                key={index}
                sx={{
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
              >
                <Stack className={classes.item} spacing={5} direction="row">
                  <Box
                    component="img"
                    className={classes.logo}
                    src={item.logo}
                  />
                  <Stack
                    direction="row"
                    className="space-between-root"
                    flex={1}
                  >
                    <Stack spacing={2}>
                      <AppTypography variant="h5">{item.name}</AppTypography>
                      <Stack direction="row" spacing={0.5}>
                        <CategoryIcon />
                        <AppTypography
                          className={classes.category}
                          variant="body2"
                        >
                          {getCategoryLabel(categories, item.categoryId)}
                        </AppTypography>
                      </Stack>
                      <Stack direction="row" spacing={0.5}>
                        <LocationIcon />
                        <AppTypography
                          variant="body2"
                          sx={{ textTransform: "capitalize" }}
                          color="grey.400"
                        >
                          {item.location}
                        </AppTypography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </AppLink>
            ))}
          </>
        ) : (
          <Stack className="center-root">
            <Box
              component="img"
              sx={{ width: 80, height: 80 }}
              src={ImageConstant.EmptyImage}
            />
            <AppTypography sx={{ textAlign: "center", mt: 5 }}>
              Company Not Found
            </AppTypography>
          </Stack>
        )}
      </Stack>
      <Stack spacing={2} alignItems="center" my={5}>
        <Pagination
          page={pagination?.page || AppConstant.DEFAULT_PAGINATION.page}
          count={pagination?.totalPages || 0}
          shape="rounded"
          onChange={handleChangePage}
        />
      </Stack>
    </>
  );
};

export default CompanyCardList;

const getCategoryLabel = (data: any[], id: string) => {
  let label = "- -";
  data.map((item) => {
    if (item._id === id) {
      label = item.name;
    }
  });

  return label;
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    marginTop: theme.spacing(7),
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  item: {
    alignItems: "center",
    padding: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: "cover",
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  category: {
    textTransform: "capitalize",
    color: theme.palette.grey[400],
  },
}));
