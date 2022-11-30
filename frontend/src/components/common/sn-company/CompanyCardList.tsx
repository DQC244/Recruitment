import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LocationIcon } from "components/icons";
import { ImageConstant, PathConstant } from "const";
import { ThemeProps } from "models/types";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AppImage from "../AppImage";
import AppLink from "../AppLink";
import AppTypography from "../AppTypography";

const CompanyCardList = () => {
  const classes = useStyles();
  const [isMoreList, setIsMoreList] = useState(true);
  let currentPage = 1;
  const totalPage = 4;

  const handleGetListJob = () => {
    if (currentPage >= totalPage) {
      setIsMoreList(false);
    }
    currentPage + 1;
  };

  return (
    <Stack className={classes.root}>
      <InfiniteScroll
        hasMore={isMoreList}
        next={handleGetListJob}
        loader={<h4>Loading...</h4>}
        dataLength={COMPANY_LIST.length}
      >
        {COMPANY_LIST.map((item, index) => (
          <AppLink href={`${PathConstant.COMPANY}/${item.id}`} key={index}>
            <Stack className={classes.item} spacing={5} direction="row">
              <AppImage
                className={classes.logo}
                src={item.logo}
                imageProps={{
                  objectFit: "cover",
                }}
              />
              <Stack direction="row" className="space-between-root" flex={1}>
                <Stack spacing={2}>
                  <AppTypography variant="h5">{item.name}</AppTypography>
                  <Stack direction="row">
                    <LocationIcon />
                    <AppTypography variant="subtitle2" color="grey.500">
                      {item.location}
                    </AppTypography>
                  </Stack>
                </Stack>
                <AppTypography variant="body2" className={classes.totalJob}>
                  {item.totalJob + " jobs"}
                </AppTypography>
              </Stack>
            </Stack>
          </AppLink>
        ))}
      </InfiniteScroll>
    </Stack>
  );
};

export default CompanyCardList;

const COMPANY_LIST = [
  {
    id: 1,
    name: "facebook",
    location: "hanoi",
    logo: ImageConstant.Banner,
    totalJob: 6,
  },
  {
    id: 1,
    name: "facebook",
    location: "hanoi",
    logo: ImageConstant.Banner,
    totalJob: 6,
  },
  {
    id: 1,
    name: "facebook",
    location: "hanoi",
    logo: ImageConstant.Banner,
    totalJob: 6,
  },
  {
    id: 1,
    name: "facebook",
    location: "hanoi",
    logo: ImageConstant.Banner,
    totalJob: 6,
  },
  {
    id: 1,
    name: "facebook",
    location: "hanoi",
    logo: ImageConstant.Banner,
    totalJob: 6,
  },
  {
    id: 1,
    name: "facebook",
    location: "hanoi",
    logo: ImageConstant.Banner,
    totalJob: 6,
  },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    marginTop: theme.spacing(7),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderBottom: "unset",
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
  },
  totalJob: {
    padding: theme.spacing(0.25, 1),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 2,
    color: theme.palette.primary.main,
  },
}));
