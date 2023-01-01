import { Box, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuthContext } from "context";
import { ThemeProps } from "models/types";
import React from "react";
import UploadImageInput from "../UploadImageInput";
import InfoUser from "./InfoUser";
import MyEducation from "./MyEducation";
import MyFavorite from "./MyFavorite";
import MySkills from "./MySkills";
import MyTarget from "./MyTarget";
import Qualification from "./Qualification";
import clsx from "clsx";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { ImageConstant } from "const";

const MainCv = ({ handleChangeImage }: any) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <p className={classes.logo}>DQC</p>
      <Box className={clsx("header", classes.info)}>
        <p
          className={classes.name}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          ĐỖ QUYẾT CHIẾN
        </p>
        <p
          className={classes.location}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          nhan vien kinh doanh
        </p>
        <UploadImageInput
          wrapperClassName={classes.imageBox}
          iconClassName={classes.iconClassName}
          imageClassName={classes.image}
          onChangeImage={handleChangeImage}
        />
      </Box>
      <Box className={classes.leftColumn}>
        <InfoUser />
        <MySkills />
        <MyFavorite />
        <Qualification />
      </Box>
      <Box className={classes.rightColumn}>
        <MyTarget />
        <MyEducation />
        <MyEducation
          data={{
            title: "KINH NGHIỆM LÀM VIỆC",
            name: "Công ty DQC",
            label: "Nhân viên bán hàng",
            desc: "- Hỗ trợ viết bài quảng cáo sản phẩm qua kênh facebook, các forum,... - Giới thiệu, tư vấn sản phẩm, giải đáp các vấn đề thắc mắc của khách hàng qua điện thoại và email.",
          }}
        />
        <MyEducation
          data={{
            title: "HOẠT ĐỘNG",
            name: "Nhóm tình nguyện DQC",
            label: "Tình nguyện viên",
            desc: "Tập hợp các món quà và phân phát tới người vô gia cư. - Chia sẻ, động viên họ vượt qua giai đoạn khó khăn, giúp họ có những suy nghĩ lạc quan.",
          }}
        />
      </Box>
    </Box>
  );
};

export default MainCv;

export const MainCvPdf = ({ data }: any) => {
  const styles = StyleSheet.create({
    root: {
      position: "relative",
      display: "flex",
      width: 794,
      minHeight: 1123,
    },
    logo: {
      position: "absolute",
      bottom: 8,
      right: 8,
      margin: 0,
      fontSize: 12,
      fontWeight: 700,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.root}>
        <Text style={styles.logo}>DQC</Text>
        <HeaderPdf data={data} />
      </Page>
    </Document>
  );
};

export const HeaderPdf = ({ data }: HeaderPdfProps) => {
  const styles = StyleSheet.create({
    info: {
      position: "absolute",
      top: 40,
      left: 0,
      width: "100%",
      height: 150,
      backgroundColor: "#548ca8",
      padding: "40px 24px",
    },
    name: {
      margin: 0,
      color: "white",
      fontSize: 32,
      fontWeight: 700,
      textTransform: "uppercase",
      width: "fit-content",
    },
    location: {
      width: "fit-content",
      margin: "16px 0px 0px",
      color: "white",
      fontSize: 20,
      fontWeight: 500,
      textTransform: "uppercase",
    },
    imageBox: {
      position: "absolute",
      top: -5,
      right: 50,
      width: 160,
      height: 160,
      borderRadius: "50%",
      border: "5px solid #fff",
      backgroundColor: "#f1f1f1",
    },
    image: {
      objectFit: "cover",
    },
  });

  return (
    <View style={styles.info}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.location}>{data.location}</Text>
      <View style={styles.imageBox}>
        <Image
          src={data.image || ImageConstant.AvatarDefault}
          style={styles.image}
        />
      </View>
    </View>
  );
};

type HeaderPdfProps = {
  data: any;
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: 794,
    minHeight: 1123,
    height: 1123,
    overflow: "hidden",
  },
  leftColumn: {
    backgroundColor: "#2a3743",
    width: 300,
    height: "100%",
    padding: "200px 16px 0px",
    minHeight: 1123,
  },
  rightColumn: {
    flex: 1,
    backgroundColor: "#eeeeee",
    padding: "200px 56px 0px 16px",
    height: "100%",
    minHeight: 1123,
  },
  info: {
    position: "absolute",
    top: 40,
    left: 0,
    width: "100%",
    height: 150,
    backgroundColor: "#548ca8",
    padding: "40px 24px",
  },
  name: {
    margin: 0,
    color: "white",
    fontSize: 32,
    fontWeight: 700,
    textTransform: "uppercase",
    width: "fit-content",
  },
  location: {
    width: "fit-content",
    margin: "16px 0px 0px",
    color: "white",
    fontSize: 20,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  imageBox: {
    position: "absolute",
    top: -5,
    right: 50,
    width: 160,
    height: 160,
    borderRadius: "50%",
    border: "5px solid #fff",
    backgroundColor: "#f1f1f1",
  },
  iconClassName: {
    margin: 0,
  },
  image: {
    objectFit: "cover",
  },
  logo: {
    position: "absolute",
    bottom: 8,
    right: 8,
    margin: 0,
    fontSize: 12,
    fontWeight: 700,
  },
}));
