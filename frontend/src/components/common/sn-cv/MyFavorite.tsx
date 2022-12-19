import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React from "react";

const MyFavorite = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p contentEditable={true} suppressContentEditableWarning={true} className={classes.title}>
        Sở thích
      </p>
      <p contentEditable={true} suppressContentEditableWarning={true} className={classes.desc}>
        Đọc sách: - Mỗi tháng đọc 1 quyển sách về kinh doanh. Đá bóng: - Tham
        gia hoạt động đá bóng của công ty hàng tuần
      </p>
    </div>
  );
};

export default MyFavorite;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: "16px 0px",
    color: "white",
    fontWeight: 700,
    borderTop: "2px solid white",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    textTransform: "uppercase",
  },
  desc: {
    fontSize: 12,
    fontWeight: 400,
    margin: "8px 0 0",
    lineHeight: "14px",
  },
}));
