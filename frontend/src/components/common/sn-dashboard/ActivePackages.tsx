import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React, { useEffect, useState } from "react";
import AppTypography from "../AppTypography";
import clsx from "clsx";
import { CardPackages } from "../packages";
import { PackageClass } from "models";
import useCheckExpirePackage from "hooks/useCheckExpirePackage";
import { useAuthContext } from "context";

const ActivePackages = ({ data }: ActivePackagesProps) => {
  const classes = useStyles();
  const [isPackage, setIsPackage] = useState(PACKAGE_STATUS.no);

  const { accountInfo } = useAuthContext();
  const handleCheckExpirePackage = useCheckExpirePackage();

  const handleCheckPackage = async () => {
    const result = await handleCheckExpirePackage();
    if (!result && accountInfo.package) {
      setIsPackage(PACKAGE_STATUS.expire);
    } else {
      setIsPackage(PACKAGE_STATUS.has);
    }
  };

  useEffect(() => {
    handleCheckPackage();
  }, []);

  return (
    <Stack className={classes.root}>
      <AppTypography variant="h4" className={classes.title}>
        Active Packages
      </AppTypography>
      <Box className={clsx("center-root", classes.wrapper)}>
        {isPackage === PACKAGE_STATUS.has ? (
          <CardPackages data={data} />
        ) : (
          <AppTypography>
            {isPackage === PACKAGE_STATUS.expire
              ? "Your package has expired"
              : "No packages have been bought or all packages have been used."}
          </AppTypography>
        )}
      </Box>
    </Stack>
  );
};

type ActivePackagesProps = {
  data?: PackageClass;
};

export default ActivePackages;

const PACKAGE_STATUS = {
  no: 0,
  expire: 1,
  has: 2,
};
const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 0 15px rgb(0 0 0 / 10%)",
    minWidth: 500,
    minHeight: 300,
    maxWidth: "100%",
  },
  wrapper: {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    flex: 1,
  },
  title: {
    padding: theme.spacing(2, 3),
  },
}));
