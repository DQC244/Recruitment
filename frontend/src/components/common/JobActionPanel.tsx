import { Box, Button, ButtonProps, InputLabel, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import dayjs, { Dayjs } from "dayjs";
import { useHandleUploadFile } from "hooks";
import { ThemeProps } from "models/types";
import React, { ChangeEvent, memo, useState } from "react";
import { BasicDateTimePicker } from ".";
import AppInput from "./AppInput";
import AppTypography from "./AppTypography";
import { JobExperienceSelect, QualificationSelect } from "./select";
import JobTypeSelect from "./select/JobTypeSelect";
import TextEditor from "./TextEditor";
import UploadImageInput from "./UploadImageInput";

const JobActionPanel = ({ label, onSubmit, buttonProps }: JobActionPanel) => {
  const classes = useStyles();

  const handleUploadFile = useHandleUploadFile();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File>();
  const [type, setType] = useState<Number>();
  const [location, setLocation] = useState("");
  const [closeDate, setCloseDate] = useState<Date | null>(null);
  const [tag, setTag] = useState("");
  const [qualification, setQualification] = useState<Number>();
  const [experience, setExperience] = useState<Number>();
  const [salary, setSalary] = useState<SalaryProps>({} as SalaryProps);

  const [isLoading, setIsLoading] = useState(false);
  const [dateErrorMsg, setDateErrorMsg] = useState("");
  const [salaryError, setSalaryError] = useState(false);

  const handleChangeDate = (value: Dayjs) => {
    const newValue = dayjs(value).toDate();
    setCloseDate(newValue);

    const closeDateTime = dayjs(newValue).unix() * 1000;

    if (closeDateTime <= Date.now()) {
      setDateErrorMsg("Closing Date inValid");
      return;
    }
    setDateErrorMsg("");
  };

  const handleChangeSalary =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      const newValue = parseInt(value);

      setSalary({
        ...salary,
        [key]: newValue,
      });
    };

  const isDisabled =
    !title ||
    !description ||
    !image ||
    isNaN(type as any) ||
    !location ||
    !closeDate ||
    !salary.min ||
    !salary.max ||
    Boolean(dateErrorMsg) ||
    isLoading;

  const handleSubmit = async () => {
    setIsLoading(true);

    if (salary.min >= salary.max) {
      setSalaryError(true);
      setIsLoading(false);
      return;
    }

    let url;
    if (image) {
      url = await handleUploadFile(image);
    }

    const data = {
      title,
      description,
      image: url,
      type,
      location,
      closeDate: dayjs(closeDate).format("DD-MM-YYYY"),
      tag,
      qualification,
      experience,
      salary,
    };
    if (onSubmit instanceof Function) {
      await onSubmit(data);
    }
    setIsLoading(false);
  };

  return (
    <>
      <AppTypography variant="h3">Job Detail</AppTypography>
      <Stack spacing={3} mt={5}>
        <AppInput
          required={true}
          label="Job Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <AppInput
          required={true}
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.currentTarget.value)}
        />
        <Box>
          <InputLabel
            required
            classes={{
              root: classes.labelRoot,
              asterisk: classes.asterisk,
            }}
          >
            Job Type
          </InputLabel>
          <JobTypeSelect onChangeJobType={setType} />
        </Box>

        <InputLabel
          required
          classes={{
            root: classes.labelRoot,
            asterisk: classes.asterisk,
          }}
        >
          Job Description
        </InputLabel>
        <TextEditor
          value={description}
          onChange={setDescription}
          theme="snow"
          className={classes.container}
        />
        <Stack width={200}>
          <InputLabel
            required
            classes={{
              root: classes.labelRoot,
              asterisk: classes.asterisk,
            }}
          >
            Closing Date
          </InputLabel>
          <BasicDateTimePicker
            inputProps={{
              error: Boolean(dateErrorMsg),
              helperText: dateErrorMsg,
            }}
            value={closeDate}
            onChangeDate={handleChangeDate}
          />
        </Stack>

        <Stack direction="row" spacing={6}>
          <AppInput
            required
            label="Minimum Salary"
            onChange={handleChangeSalary("min")}
            onKeyDown={(event) =>
              INVALID_CHARS.includes(event.key) && event.preventDefault()
            }
            type="number"
          />
          <AppInput
            required
            label="Maximum Salary"
            onChange={handleChangeSalary("max")}
            onKeyDown={(event) =>
              INVALID_CHARS.includes(event.key) && event.preventDefault()
            }
            type="number"
          />
        </Stack>
        <AppInput
          label="Job Tags (Optional)"
          value={tag}
          onChange={(e) => setTag(e.currentTarget.value)}
        />
        <Box>
          <AppTypography variant="subtitle2">
            Job Qualification (Optional)
          </AppTypography>
          <QualificationSelect onChangeQualification={setQualification} />
        </Box>
        <Box>
          <AppTypography variant="subtitle2">
            Job Experience (Optional)
          </AppTypography>
          <JobExperienceSelect onChangeJobExperience={setExperience} />
        </Box>
        <UploadImageInput
          label="Cover Image"
          onChangeImage={setImage}
          inputLabelProps={{
            required: true,
          }}
        />
      </Stack>
      <Button
        onClick={handleSubmit}
        disabled={isDisabled}
        sx={{ width: 240 }}
        variant="contained"
        {...buttonProps}
      >
        {label}
      </Button>
      {salaryError && <AppTypography color="error.main">Check Salary again</AppTypography>}
    </>
  );
};

type JobActionPanel = {
  label?: string;
  onSubmit?: (data: any) => void;
  buttonProps?: ButtonProps;
};

type SalaryProps = {
  min: number;
  max: number;
};

export default memo(JobActionPanel);

const INVALID_CHARS = ["e", "E", "+", "-", ".", ","];

const useStyles = makeStyles((theme: ThemeProps) => ({
  labelRoot: {
    ...theme.typography?.subtitle2,
    color: "black",
  },
  asterisk: {
    color: theme.palette.error[4],
  },
  container: {
    "& .ql-container": {
      height: 300,
      minHeight: 300,
    },
  },
}));
