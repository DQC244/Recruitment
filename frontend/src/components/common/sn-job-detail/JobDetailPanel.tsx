import { Box, Chip, Grid, Stack } from "@mui/material";
import { CompanyClass, JobClass } from "models";
import React, { useMemo } from "react";
import AppTypography from "../AppTypography";
import { BannerCompany } from "../sn-company";
import JobOverview from "./JobOverview";
import JobPanel from "./JobPanel";

const JobDetailPanel = ({
  jobInfo,
  companyInfo,
  isPreview,
}: JobDetailPanelProps) => {
  const chipList = useMemo(() => {
    if (jobInfo?.tag) {
      return jobInfo?.tag.split(" ");
    }
    return [];
  }, [jobInfo?.tag]);

  return (
    <>
      <JobPanel data={jobInfo} />
      <Stack direction="row" sx={{ my: 10 }} spacing={3}>
        <Stack flex={1} maxWidth="calc(100% - 300px)" overflow="hidden">
          <BannerCompany data={companyInfo} />
          <Stack mt={2}>
            <Grid container direction="row" spacing={0.5} mb={5}>
              {chipList.map((item, index) => (
                <Grid item key={index}>
                  <Chip label={item} variant="outlined" />
                </Grid>
              ))}
            </Grid>
            <AppTypography variant="h4" color="black">
              Job Description
            </AppTypography>
            <Box
              dangerouslySetInnerHTML={{ __html: jobInfo?.description || "" }}
            ></Box>
          </Stack>
        </Stack>
        <Box width={300}>
          <JobOverview isPreview={isPreview} jobInfo={jobInfo} />
        </Box>
      </Stack>
    </>
  );
};

type JobDetailPanelProps = {
  jobInfo?: JobClass;
  companyInfo?: CompanyClass;
  isPreview?: Boolean;
};

export default JobDetailPanel;
