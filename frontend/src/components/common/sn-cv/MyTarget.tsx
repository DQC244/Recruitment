import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React from "react";

const MyTarget = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.title} contentEditable={true} suppressContentEditableWarning={true}>MỤC TIÊU NGHỀ NGHIỆP</p>
      <p contentEditable={true} suppressContentEditableWarning={true} className={classes.desc}>
        Áp dụng những kinh nghiệm về kỹ năng bán hàng và sự hiểu biết về thị
        trường để trở thành một nhân viên bán hàng chuyên nghiệp, mang đến nhiều
        giá trị cho khách hàng. Từ đó giúp Công ty tăng số lượng khách hàng và
        mở rộng tập khách hàng.
      </p>
    </div>
  );
};

export default MyTarget;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: "16px 16px 16px 0px",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    textTransform: "uppercase",
  },
  desc: {
    marginTop:24,
    fontSize: 12,
    fontWeight: 400,
    margin: 0,
    lineHeight: "14px",
  },
}));
