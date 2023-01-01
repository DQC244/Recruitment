import { Box, Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  ExperienceIcon,
  LocationIcon,
  MoneyIcon,
  QualificationIcon,
  TimeCloseIcon,
} from "components/icons";
import { AppConstant, PathConstant } from "const";
import { useAuthContext } from "context";
import dayjs from "dayjs";
import { JobClass } from "models";
import { ThemeProps } from "models/types";
import React, { memo, useState } from "react";
import AppTypography from "../AppTypography";
import { getExperienceLabel, getQualificationLabel } from "../helper";
import ApplyJobModal from "./ApplyJobModal";
import OverviewItem from "./OverviewItem";

const JobOverview = ({ jobInfo, isPreview }: JobOverviewProps) => {
  const classes = useStyles();
  const { hasAccount, accountInfo, setIsOpen } = useAuthContext();

  const [isOpenApplyModal, setIsOpenApplyModal] = useState(false);

  const handleCheckApply = () => {
    if (hasAccount) {
      setIsOpenApplyModal(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Box>
      <AppTypography variant="h5">Job Overview</AppTypography>
      <Stack className={classes.container} spacing={3}>
        <OverviewItem
          label="Expiration Date"
          description={jobInfo?.closeDate}
          icon={<TimeCloseIcon />}
        />
        <OverviewItem
          label="Location"
          description={jobInfo?.location}
          icon={<LocationIcon />}
        />
        <OverviewItem
          label="Experience"
          description={getExperienceLabel(jobInfo?.experience)}
          icon={<ExperienceIcon />}
        />
        <OverviewItem
          label="Qualification"
          description={getQualificationLabel(jobInfo?.qualification)}
          icon={<QualificationIcon />}
        />
        <OverviewItem
          label="Salary"
          description={`$${jobInfo?.salary?.min || "--"} - $${
            jobInfo?.salary?.max || "--"
          }`}
          icon={<MoneyIcon />}
        />
        {!isPreview &&
          Boolean(
            ![
              AppConstant.USER_TYPE.employer,
              AppConstant.USER_TYPE.admin,
            ].includes(accountInfo.permission)
          ) && (
            <Stack spacing={1}>
              <Button
                onClick={handleCheckApply}
                variant="contained"
                className={classes.applyButton}
              >
                <AppTypography>Apply for job</AppTypography>
              </Button>
              {hasAccount && (
                <>
                  <AppTypography textAlign="center">OR</AppTypography>
                  <Button variant="contained" href={PathConstant.CREATE_CV}>
                    Create CV
                  </Button>
                </>
              )}
            </Stack>
          )}
      </Stack>
      <ApplyJobModal
        jobId={jobInfo?._id}
        open={isOpenApplyModal}
        onClose={() => setIsOpenApplyModal(false)}
      />
    </Box>
  );
};

export default memo(JobOverview);

type JobOverviewProps = {
  jobInfo?: JobClass;
  isPreview?: Boolean;
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 4,
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
  },
  applyButton: {
    textTransform: "uppercase",
  },
}));
