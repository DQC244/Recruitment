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

const Qualification = () => {
  const classes = useStyles();

  return (
    <HOC>
      <div className={clsx("qualification", classes.root)}>
        <p
          contentEditable={true}
          suppressContentEditableWarning={true}
          className={classes.title}
        >
          CHỨNG CHỈ
        </p>
        <HOC>
          <div className={classes.itemWrapper}>
            <p
              className={classes.year}
              contentEditable={true}
              suppressContentEditableWarning={true}
            >
              2020:
            </p>
            <p
              className={classes.desc}
              contentEditable={true}
              suppressContentEditableWarning={true}
            >
              Giải nhất Tài năng
            </p>
          </div>
        </HOC>
      </div>
    </HOC>
  );
};

export default Qualification;

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
  itemWrapper: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 8,
  },
  year: {
    fontSize: 14,
    lineHeight: "14px",
    margin: "0px 4px 0px 0px",
  },
  desc: {
    fontSize: 12,
    fontWeight: 400,
    margin: 0,
    lineHeight: "14px",
  },
}));

export const QualificationPdf = ({ children, title }: any) => {
  const styles = StyleSheet.create({
    root: {
      padding: "16px 0px",
      color: "white",
      fontWeight: 700,
      borderTop: "2px solid white",
      fontFamily: "Inter Tight",
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

export const QualificationItemPdf = ({ data }: any) => {
  const styles = StyleSheet.create({
    itemWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      marginTop: 8,
    },
    year: {
      fontSize: 14,
      margin: "0px 4px 0px 0px",
    },
    desc: {
      fontSize: 12,
      fontWeight: 400,
      margin: 0,
    },
  });

  return (
    <View style={styles.itemWrapper}>
      <Text style={styles.year}>{data?.title}</Text>
      <Text style={styles.desc}>{data?.desc}</Text>
    </View>
  );
};
