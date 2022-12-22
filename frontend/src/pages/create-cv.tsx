import React, { Fragment, useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, Button, Container, InputClasses, Stack } from "@mui/material";
import { CommonUtils } from "utils";
import { AppInput } from "components/common";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import MainCv from "components/common/sn-cv/MainCv";
import { ArrowIcon } from "components/icons";
import { useRouter } from "next/router";
import {
  Document,
  Font,
  Image,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { ImageConstant } from "const";
import { MySkillsItemPdf, MySkillsPdf } from "components/common/sn-cv/MySkills";
import {
  MyFavoriteItemPdf,
  MyFavoritePdf,
} from "components/common/sn-cv/MyFavorite";
import {
  QualificationItemPdf,
  QualificationPdf,
} from "components/common/sn-cv/Qualification";
import {
  MyEducationItemPdf,
  MyEducationPdf,
} from "components/common/sn-cv/MyEducation";
import { DescInformationPdf } from "components/common/sn-cv/InfoUser";
Font.register({
  family: "Inter Tight",
  fonts: [
    { src: "fonts/InterTight-Medium.ttf", fontWeight: 500 },
    { src: "fonts/InterTight-Regular.ttf", fontWeight: 400 },
    { src: "fonts/InterTight-SemiBold.ttf", fontWeight: 600 },
  ],
});

const CreateCv: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);
  const [title, setTitle] = useState("Untitled CV");
  const regex = /[\r\n]+/;
  const [PDF, setPDF] = useState(<Fragment />);
  const [image, setImage] = useState<any>();

  const handleCompleteCv = () => {
    setIsComplete(true);
    handleFormatData();
  };

  const handleFormatData = () => {
    const element = CommonUtils.getElementByClass("education");
    let Education: any[] = [];
    Array.prototype.slice.call(element).map((item) => {
      const text = item.innerText.split(regex);
      const textItem = text.slice(1);
      Education.push(
        <MyEducationPdf title={text[0]} key={Education.length}>
          {textItem
            .reduce(
              (
                accumulator: any,
                currentValue: any,
                currentIndex: any,
                array: any
              ) => {
                if (currentIndex % 3 === 0)
                  accumulator.push(array.slice(currentIndex, currentIndex + 3));
                return accumulator;
              },
              []
            )
            .map((item: any, index: any) => (
              <MyEducationItemPdf
                key={index}
                data={{
                  name: item[0],
                  label: item[1],
                  desc: item[2],
                }}
              />
            ))}
        </MyEducationPdf>
      );
    });

    let target;
    const targetElement = CommonUtils.getElementByClass("target");
    if (targetElement?.length && targetElement[0] instanceof HTMLElement) {
      const textArr = targetElement[0].innerText.split(regex);
      target = <MyTargetPdf data={{ title: textArr[0], desc: textArr[1] }} />;
    }

    let info;
    const infoElement = CommonUtils.getElementByClass("info");
    if (infoElement?.length && infoElement[0] instanceof HTMLElement) {
      const textArr = infoElement[0].innerText.split(regex);
      info = (
        <DescInformationPdf
          data={{
            sex: textArr[0],
            birthday: textArr[1],
            phone: textArr[2],
            gmail: textArr[3],
            web: textArr[4],
            location: textArr[5],
          }}
        />
      );
    }

    let skill: any[] = [];
    const skillElement = CommonUtils.getElementByClass("skill");
    Array.prototype.slice.call(skillElement).map((item) => {
      const text = item.innerText.split(regex);
      const textItem = text.slice(1);

      skill.push(
        <MySkillsPdf title={text[0]} key={skill.length}>
          {textItem
            .reduce(
              (
                accumulator: any,
                currentValue: any,
                currentIndex: any,
                array: any
              ) => {
                if (currentIndex % 2 === 0)
                  accumulator.push(array.slice(currentIndex, currentIndex + 2));
                return accumulator;
              },
              []
            )
            .map((item: any, index: any) => (
              <MySkillsItemPdf
                key={index}
                data={{
                  title: item[0],
                  desc: item[1],
                }}
              />
            ))}
        </MySkillsPdf>
      );
    });

    let favorite: any[] = [];
    const favoriteElement = CommonUtils.getElementByClass("favorite");
    Array.prototype.slice.call(favoriteElement).map((item) => {
      const text = item.innerText.split(regex);
      const textItem = text.slice(1);

      favorite.push(
        <MyFavoritePdf title={text[0]} key={favorite.length}>
          {textItem.map((item: any, index: any) => (
            <MyFavoriteItemPdf key={index} desc={item} />
          ))}
        </MyFavoritePdf>
      );
    });

    let qualification: any[] = [];
    const qualificationElement = CommonUtils.getElementByClass("qualification");
    Array.prototype.slice.call(qualificationElement).map((item) => {
      const text = item.innerText.split(regex);
      const textItem = text.slice(1);

      qualification.push(
        <QualificationPdf title={text[0]} key={qualification.length}>
          {textItem
            .reduce(
              (
                accumulator: any,
                currentValue: any,
                currentIndex: any,
                array: any
              ) => {
                if (currentIndex % 2 === 0)
                  accumulator.push(array.slice(currentIndex, currentIndex + 2));
                return accumulator;
              },
              []
            )
            .map((item: any, index: any) => (
              <QualificationItemPdf
                key={index}
                data={{
                  title: item[0],
                  desc: item[1],
                }}
              />
            ))}
        </QualificationPdf>
      );
    });

    const header = CommonUtils.getElementByClass("header");
    let infoText;
    if (header?.length && header[0] instanceof HTMLElement) {
      const textArr = header[0].innerText.split(regex);
      infoText = {
        name: textArr[0],
        location: textArr[1],
      };
    }
    if (image) {
      infoText = { ...infoText, image: URL.createObjectURL(image) };
    }

    setPDF(
      <MainCvPdf>
        <LeftColumnPdf>
          {info}
          {skill}
          {favorite}
          {qualification}
        </LeftColumnPdf>
        <RightColumnPdf>
          {target}
          {Education}
        </RightColumnPdf>
        <HeaderPdf data={infoText} />
      </MainCvPdf>
    );
  };

  useEffect(() => {}, []);

  return (
    <>
      <Container sx={{ py: 5 }}>
        <Box className="space-between-root">
          <Button
            classes={{ startIcon: classes.startIcon }}
            variant="contained"
            startIcon={<ArrowIcon />}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Box>
            <Button className={classes.buttonSave} onClick={handleCompleteCv}>
              Complete CV
            </Button>
            <Button
              disabled={!isComplete}
              id="downloadPdf"
              variant="contained"
              color="secondary"
              sx={{
                "&:hover": {
                  backgroundColor: "#fe9703",
                },
              }}
            >
              <PDFDownloadLink
                onClick={() => setIsComplete(false)}
                document={PDF}
                fileName={`${title}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download now!"
                }
              </PDFDownloadLink>
            </Button>
          </Box>
        </Box>
        <Stack spacing={5} alignItems="center" mt={2}>
          <AppInput
            InputProps={{
              classes: { input: classes.inputTitle } as InputClasses,
            }}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <MainCv handleChangeImage={setImage} />
        </Stack>
      </Container>
    </>
  );
};

export default CreateCv;

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);

const useStyles = makeStyles((theme: ThemeProps) => ({
  inputTitle: {
    textAlign: "center",
  },
  startIcon: {
    stroke: theme.palette.common.white,
    transform: "rotate(90deg)",
  },
  buttonSave: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,

    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

const MainCvPdf = ({ data, children }: any) => {
  const styles = StyleSheet.create({
    logo: {
      position: "absolute",
      bottom: 8,
      width: 26,
      right: 8,
      fontSize: 12,
      fontWeight: 700,
    },
  });

  return (
    <Document>
      <Page
        wrap={true}
        size={[794, 1123]}
        style={{ display: "flex", flexDirection: "row" }}
      >
        {children}
        <Text style={styles.logo}>DQC</Text>
      </Page>
    </Document>
  );
};

const HeaderPdf = ({ data }: HeaderPdfProps) => {
  const styles = StyleSheet.create({
    info: {
      height: 150,
      width: "100%",
      position: "absolute",
      top: 40,
      backgroundColor: "#548ca8",
      padding: "40px 24px",
      fontFamily: "Inter Tight",
    },
    name: {
      margin: 0,
      color: "white",
      fontSize: 32,
      fontWeight: 700,
      textTransform: "uppercase",
    },
    location: {
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
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover",
    },
  });

  return (
    <View style={styles.info}>
      <Text style={styles.name}>{data?.name}</Text>
      <Text style={styles.location}>{data?.location}</Text>
      <View style={styles.imageBox}>
        <Image
          src={data?.image || ImageConstant.AvatarDefault}
          style={styles.image}
        />
      </View>
    </View>
  );
};

type HeaderPdfProps = {
  data: any;
};

const MyTargetPdf = ({ data }: any) => {
  const styles = StyleSheet.create({
    root: {
      padding: "16px 16px 16px 0px",
      fontFamily: "Inter Tight",
    },
    title: {
      fontSize: 20,
      fontWeight: 700,
      margin: 0,
      textTransform: "uppercase",
    },
    desc: {
      margin: "24px 0px 0px 0px",
      fontSize: 12,
      fontWeight: 400,
    },
  });

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{data?.title}</Text>
      <Text style={styles.desc}>{data?.desc}</Text>
    </View>
  );
};

const LeftColumnPdf = ({ children }: any) => {
  const styles = StyleSheet.create({
    leftColumn: {
      backgroundColor: "#2a3743",
      width: 300,
      height: "100%",
      padding: "200px 16px 0px",
    },
  });

  return <View style={styles.leftColumn}>{children}</View>;
};
const RightColumnPdf = ({ data, children }: any) => {
  const styles = StyleSheet.create({
    rightColumn: {
      width: 494,
      height: "100%",
      backgroundColor: "#eeeeee",
      padding: "200px 56px 0px 16px",
      flexDirection: "column",
    },
  });
  return <View style={styles.rightColumn}>{children}</View>;
};
