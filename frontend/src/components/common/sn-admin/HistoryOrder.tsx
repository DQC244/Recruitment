import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React, { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import clsx from "clsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AdminActions, AdminSelector } from "redux-store";
import { AppConstant } from "const";
import AppTypography from "../AppTypography";
import dayjs from "dayjs";

const HistoryOrder = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isMoreList, setIsMoreList] = useState(true);
  const { pagination } = useSelector(AdminSelector.getOrderList, shallowEqual);
  const params = useSelector(AdminSelector.getQueryParams, shallowEqual);

  const getOrderList = (query: any) => {
    dispatch(
      AdminActions.getOrderList({
        ...params,
        ...query,
      })
    );
  };

  const handleGetList = () => {
    if (pagination.page >= pagination.totalPages) {
      setIsMoreList(false);
      return;
    }

    getOrderList({ page: pagination.page + 1 });
  };

  const orderList = useSelector(AdminSelector.getOrderList, shallowEqual);

  useEffect(() => {
    getOrderList({
      ...AppConstant.DEFAULT_PAGINATION,
    });
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container className={classes.header}>
        {HEADER.map((item, index) => (
          <Grid xs={3} item key={index} alignItems="center">
            <AppTypography variant="subtitle1" textAlign="center">
              {item}
            </AppTypography>
          </Grid>
        ))}
      </Grid>

      <InfiniteScroll
        className={clsx("scrollbar", classes.scroll)}
        dataLength={orderList.listItems?.length || 0}
        hasMore={isMoreList}
        next={handleGetList}
        height={500}
        loader={<Fragment />}
      >
        {orderList.listItems?.map((item, index) => (
          <Grid sx={{ p: 1 }} container key={index}>
            <Grid xs={3} item alignItems="center">
              <AppTypography className="eclipse" textAlign="center">
                {item.userId}
              </AppTypography>
            </Grid>
            <Grid xs={3} item alignItems="center">
              <AppTypography className="eclipse" textAlign="center">
                {item.packageId}
              </AppTypography>
            </Grid>
            <Grid xs={3} item alignItems="center">
              <AppTypography
                className="eclipse"
                textAlign="center"
                color="primary.main"
              >
                {`${item.amount}$`}
              </AppTypography>
            </Grid>
            <Grid xs={3} item alignItems="center">
              <AppTypography className="eclipse" textAlign="center">
                {dayjs(item.updatedAt).format("h:mm A DD/MM/YYYY")}
              </AppTypography>
            </Grid>
          </Grid>
        ))}
      </InfiniteScroll>
    </Box>
  );
};

const HEADER = ["User", "PackageId", "Price", "Time"];

export default HistoryOrder;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: 1000,
    boxShadow: "10px 10px 30px 10px rgb(0 0 0 / 10%)",
    padding: "8px 0px",
  },
  scroll: {},
  header: {
    borderBottom: `2px solid ${theme.palette.grey[300]}`,
  },
}));
