import { makeStyles } from "@mui/styles";
import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ThemeProps } from "models/types";
import React from "react";
import HOC from "./HOC";
Font.register({
  family: "Inter Tight",
  fonts: [
    { src: "fonts/InterTight-Medium.ttf", fontWeight: 500 },
    { src: "fonts/InterTight-Regular.ttf", fontWeight: 400 },
    { src: "fonts/InterTight-SemiBold.ttf", fontWeight: 600 },
  ],
});
import clsx from "clsx";

const MyFavorite = () => {
  const classes = useStyles();

  return (
    <HOC>
      <div className={clsx("favorite", classes.root)}>
        <p
          contentEditable={true}
          suppressContentEditableWarning={true}
          className={classes.title}
        >
          Sở thích
        </p>
        <HOC>
          <p
            contentEditable={true}
            suppressContentEditableWarning={true}
            className={classes.desc}
          >
            Đọc sách: - Mỗi tháng đọc 1 quyển sách về kinh doanh. Đá bóng: -
            Tham gia hoạt động đá bóng của công ty hàng tuần
          </p>
        </HOC>
      </div>
    </HOC>
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

export const MyFavoritePdf = ({ children, title }: any) => {
  const styles = StyleSheet.create({
    root: {
      fontFamily: "Inter Tight",
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
  });
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export const MyFavoriteItemPdf = ({ desc }: any) => {
  const styles = StyleSheet.create({
    desc: {
      fontSize: 12,
      fontWeight: 400,
      margin: "8px 0 0",
    },
  });

  return <Text style={styles.desc}>{desc}</Text>;
};
