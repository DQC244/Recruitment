import { Avatar, IconButton, IconButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { UserIcon } from "components/icons";
import { ThemeProps } from "models/types";
import React, { MouseEvent, useState } from "react";
import clsx from "clsx";
import LoginModal from "./LoginModal";
import { AppTypography, CommonMenu } from "components/common";
import { ImageConstant } from "const";

const Account = ({ className, ...otherProps }: IconButtonProps) => {
  const classes = useStyles();

  // TODO:update when data
  const hasAccount = false;
  const name = "chien";

  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const listMenu = [
    {
      label: (
        <AppTypography color="primary.main">chien@gmail.com</AppTypography>
      ),
    },
    { label: "My profile" },
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
      <IconButton
        onClick={handleOpen}
        className={clsx(classes.root, className)}
        {...otherProps}
      >
        {hasAccount ? (
          <>
            <Avatar src={ImageConstant.LogoImage} />
            <AppTypography textTransform="capitalize" variant="subtitle1">
              {name}
            </AppTypography>
          </>
        ) : (
          <UserIcon sx={{ fontSize: 24 }} />
        )}
      </IconButton>

      {hasAccount ? (
        <CommonMenu
          onClickItem={() => {
            return;
          }}
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
}));
