import React from "react";
import { NextPage } from "next";
import { Box, Container, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import {
  JobPanel,
  CompanyPanel,
  JobOverview,
} from "components/common/sn-job-detail";
import { ImageConstant } from "const";
import { AppTypography } from "components/common";

const JobsDetail: NextPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <JobPanel data={DATA} />
      <Stack direction="row" sx={{ my: 10 }} spacing={3}>
        <Stack flex={1}>
          <CompanyPanel data={DATA} />
          <Stack mt={5}>
            <AppTypography variant="h4" color="grey.600">
              Company Description
            </AppTypography>
            <AppTypography>
              Company Description Sed ut perspiciatis unde omnis iste natus
              error sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
              voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              quia consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt. Neque porro quisquam est. Ut enim ad minima veniam, quis
              nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
              aliquid ex ea commodi consequatur? Quis autem vel eum iure
              reprehenderit qui in ea voluptate velit esse quam nihil molestiae
              consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
              pariatur? At vero eos et accusamus et iusto odio dignissimos
              ducimus qui blanditiis praesentium voluptatum deleniti atque
              corrupti quos dolores et quas molestias excepturi sint occaecati
              cupiditate non provident, similique sunt in culpa qui officia
              deserunt mollitia animi. Job Overview Our development team focuses
              on unit testing, TDD, CI, design patterns and refactoring.
              Internal and external training is encouraged through mentoring,
              guided self-learning, conferences, user groups and training
              courses. We maintain and improve existing codebases, and create
              new systems, exposing developers to constant variety. Our team
              understands the performance implications of serving more than
              25,000 page requests per-hour, crafting awesome user experiences.
              While we leverage existing tech, we also research new technologies
              to overcome technical and business challenges, to maintain our
              industry-leading status. Key Requirements Personally passionate
              and up to date with current trends and technologies, committed to
              quality and comfortable working with adult media. Bachelor or
              Master degree level educational background. 4 years relevant PHP
              dev experience. Troubleshooting, testing and maintaining the core
              product software and databases. We Offer An exciting job where you
              can assume responsibility and develop professionally. A dynamic
              team with friendly, highly-qualified colleagues from all over the
              world. Strong, sustainable growth and fresh challenges every day.
              Flat hierarchies and short decision paths. If you feel that this
              is the place where you belong and start your career with a ton of
              new opportunities, please don’t hasitate to apply for the job
              position
            </AppTypography>
          </Stack>
        </Stack>
        <Box width={300}>
          <JobOverview />
        </Box>
      </Stack>
    </Container>
  );
};

const DATA = {
  name: "Finance Manager",
  jobType: 1,
  image: ImageConstant.LogoImage,
  companyLogo: ImageConstant.LogoImage,
  email: "chien@gmail.com",
  companyName: "facebook",
};

export default JobsDetail;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {},
  form: {
    margin: "100px auto",
  },
}));
