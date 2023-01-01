import { Box, Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppConstant, ImageConstant, PathConstant } from "const";
import { ThemeProps } from "models/types";
import React, { ReactNode, useState } from "react";
import AppInput from "../AppInput";
import AppTypography from "../AppTypography";
import clsx from "clsx";
import { SearchIcon } from "components/icons";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { JobActions } from "redux-store";

const Banner = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [keySearch, setKeySearch] = useState("");

  //   TODO:update when has api
  const handleSearch = () => {
    if (!keySearch) return;
    dispatch(
      JobActions.setQueryParams({
        ...AppConstant.DEFAULT_PAGINATION,
        search: keySearch,
      })
    );

    router.push(PathConstant.JOBS);
  };

  return (
    <Box className={classes.root}>
      <Container className={clsx("center-root", classes.container)}>
        <AppTypography variant="h2" color="common.white">
          Find your dream Job
        </AppTypography>
        <AppTypography variant="h5" color="common.white">
          Pick a career that doesn't need escaping from!
        </AppTypography>
        <Box className={clsx("center-root", classes.search)}>
          <AppInput
            value={keySearch}
            onChange={(e) => setKeySearch(e.currentTarget.value)}
            fullWidth
            placeholder="Keyword skill (Java, iOS...), Job Title"
          />
          <Button
            startIcon={<SearchIcon />}
            variant="contained"
            onClick={handleSearch}
            sx={{ ml: 1 }}
          >
            Search
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export type company = {
  value: string | number;
  label: ReactNode;
};

export default Banner;

export const CATEGORIES = [
  { value: 1, label: "Design & Art" },
  { value: 2, label: "Health Care" },
  { value: 3, label: "IT Engineer" },
  { value: 4, label: "Management" },
  { value: 5, label: "Marketing" },
  { value: 6, label: "Teaching" },
  { value: 7, label: "Sales" },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    position: "relative",
    width: "100vw",
    height: "calc(var(--vh, 1vh) * 100)",

    "&:after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `url(${ImageConstant.Banner})`,
      filter: "blur(1px)",
      zIndex: -1,
    },
  },
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 120,
  },
  search: {
    width: "100%",
    marginTop: 40,
    backgroundColor: theme.palette.common.white,
    padding: 8,
    borderRadius: 4,
  },
}));
