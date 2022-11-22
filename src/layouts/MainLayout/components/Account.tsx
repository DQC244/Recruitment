import { Avatar, Box, IconButton, IconButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { UserIcon } from "components/icons";
import { ThemeProps } from "models/types";
import React, { MouseEvent, useState } from "react";
import clsx from "clsx";
import LoginModal from "./LoginModal";
import { AppTypography, CommonMenu } from "components/common";
import { ImageConstant, PathConstant } from "const";
import { useRouter } from "next/router";

const Account = ({ className, ...otherProps }: IconButtonProps) => {
  const classes = useStyles();
  const router = useRouter();

  // TODO:update when data
  const hasAccount = true;
  const name = "chien";

  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleRedirectDashboard = (item: any) => {
    if (item.label === "My profile") {
      router.push(PathConstant.DASHBOARD);
    }
  };

  const listMenu = [
    {
      label: (
        <AppTypography color="primary.main">chien@gmail.com</AppTypography>
      ),
    },
    { label: "My profile", onClick: handleRedirectDashboard },
    { label: "Logout" },
  ];

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    if (hasAccount) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    } else {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box className={clsx("center-root", className)}>
        <IconButton
          onClick={handleOpen}
          className={clsx(classes.root, hasAccount && classes.hasAccount)}
          {...otherProps}
        >
          {hasAccount ? (
            <>
              <Avatar src={ImageConstant.LogoImage} />
            </>
          ) : (
            <UserIcon sx={{ fontSize: 24 }} />
          )}
        </IconButton>
        {hasAccount && (
          <AppTypography ml={1} textTransform="capitalize" variant="subtitle1">
            {name}
          </AppTypography>
        )}
      </Box>
      {hasAccount ? (
        <CommonMenu
          onClickItem={handleRedirectDashboard}
          placement="bottom"
          anchorEl={anchorEl}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 2],
              },
            },
          ]}
          open={Boolean(anchorEl)}
          onClick={handleClose}
          data={listMenu}
        />
      ) : (
        <LoginModal open={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Account;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: "fit-content",
    borderRadius: 16,
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  hasAccount: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
}));
