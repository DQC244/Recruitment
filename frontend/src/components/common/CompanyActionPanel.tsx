import { Box, Button, InputLabel, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppConstant } from "const";
import { AppSelectProps, ThemeProps } from "models/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CommonUtils } from "utils";
import AppInput from "./AppInput";
import AppSelect from "./AppSelect";
import AppTypography from "./AppTypography";
import BasicDateTimePicker from "./BasicDateTimePicker";
import { CategoriesSelect } from "./select";
import UploadImageInput from "./UploadImageInput";
import dayjs, { Dayjs } from "dayjs";
import TextEditor from "./TextEditor";
import { useHandleUploadFile } from "hooks";
import { CompanyClass } from "models";

const CompanyActionPanel = ({
  handleSubmit,
  labelButton,
  data,
}: CompanyActionPanelProps) => {
  const classes = useStyles();

  const handleUploadFile = useHandleUploadFile();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [categoryId, setCategoryId] = useState<string>();
  const [since, setSince] = useState<Date>();
  const [location, setLocation] = useState<string>();
  const [teamSize, setTeamSize] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [logo, setLogo] = useState<File | string>();
  const [web, setWeb] = useState({} as WebsiteProps);

  const [errorEmailMsg, setErrorEmailMsg] = useState("");
  const [errorPhoneMsg, setErrorPhoneMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isDisabledButton =
    Boolean(errorPhoneMsg) ||
    Boolean(errorEmailMsg) ||
    !name ||
    !email ||
    !phone ||
    !location ||
    !categoryId ||
    !description ||
    !logo ||
    isLoading;

  const handleChangeWebSite =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setWeb({
        ...web,
        [key]: event.currentTarget.value,
      });
    };

  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (!CommonUtils.checkValidPhoneNumber(value)) {
      setErrorPhoneMsg("Phone invalidate");
    } else {
      setErrorPhoneMsg("");
    }
    setPhone(value);
  };

  const handleChangeDate = (value: Dayjs) => {
    setSince(dayjs(value).toDate());
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (!CommonUtils.checkEmailFormat(value)) {
      setErrorEmailMsg("Email invalidate");
    } else {
      setErrorEmailMsg("");
    }
    setEmail(value);
  };

  const handleChangeLogo = (logo: File) => {
    setLogo(logo);
  };

  const handleCreateCompany = async () => {
    setIsLoading(true);
    let url;
    if (logo instanceof File) {
      url = await handleUploadFile(logo);
    }

    const data = {
      name,
      email,
      phone,
      categoryId,
      since: since || dayjs().format("DD-MM-YYYY"),
      location,
      teamSize,
      description,
      logo: url,
      website: web,
    };

    await handleSubmit(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (Object.values(data || {})) {
      setName(data?.name);
      setEmail(data?.email);
      setPhone(data?.phone);
      setCategoryId(data?.categoryId);
      setSince(data?.since);
      setLocation(data?.location);
      setTeamSize(data?.teamSize);
      setDescription(data?.description);
      if(data?.logo){

        setLogo(data?.logo);
      }
      setWeb({
        web: data?.website?.web,
        facebook: data?.website?.facebook,
        twitter: data?.website?.twitter,
        linkedin: data?.website?.linkedin,
      });
    }
  }, [data]);

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <AppTypography variant="h3">Company Details</AppTypography>
      </Box>
      <Stack spacing={3} mt={5}>
        <Stack direction="row" flex={1} spacing={5}>
          <Stack flex={1} spacing={2}>
            <AppInput
              required
              label="Company Name"
              value={name || ""}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <AppInput
              required
              label="Company Email"
              onChange={handleChangeEmail}
              error={Boolean(errorEmailMsg)}
              helperText={errorEmailMsg}
              value={email || ""}
            />
            <Stack>
              <AppInput
                required
                label="Location"
                onChange={(e) => setLocation(e.currentTarget.value)}
                value={location || ""}
              />
            </Stack>
            <Stack>
              <InputLabel
                required
                classes={{
                  root: classes.labelRoot,
                  asterisk: classes.asterisk,
                }}
              >
                Company Category
              </InputLabel>
              <CategoriesSelect
                selectedId={categoryId}
                onChangeCategories={setCategoryId}
              />
            </Stack>
          </Stack>
          <Stack flex={1} spacing={2}>
            <AppInput
              label="Company Website"
              onChange={handleChangeWebSite("web")}
              value={web.web || ""}
            />
            <AppInput
              label="Company Contact Phone"
              required
              onChange={handleChangePhone}
              error={Boolean(errorPhoneMsg)}
              helperText={errorPhoneMsg}
              value={phone || ""}
            />
            <Stack>
              <InputLabel
                required
                classes={{
                  root: classes.labelRoot,
                  asterisk: classes.asterisk,
                }}
              >
                Since
              </InputLabel>
              <BasicDateTimePicker
                value={since}
                onChangeDate={handleChangeDate}
              />
            </Stack>
            <Stack>
              <AppTypography variant="subtitle2">Team Size</AppTypography>
              <AppSelect
                data={companySize}
                selectedIndex={getSelectedIndex(teamSize, companySize)}
                onSelected={(item: any) => setTeamSize(item.label)}
              />
            </Stack>
          </Stack>
        </Stack>
        <InputLabel
          required
          classes={{
            root: classes.labelRoot,
            asterisk: classes.asterisk,
          }}
        >
          Company Description
        </InputLabel>
        <TextEditor
          value={description}
          onChange={setDescription}
          theme="snow"
          className={classes.container}
        />
        <Stack direction="row" spacing={5}>
          <Stack spacing={3} flex={1}>
            <AppInput
              label="Facebook"
              onChange={handleChangeWebSite("facebook")}
              value={web?.facebook || ""}
            />
            <AppInput
              label="Twitter"
              onChange={handleChangeWebSite("twitter")}
              value={web?.twitter || ""}
            />
          </Stack>
          <Stack spacing={3} flex={1}>
            <AppInput
              label="Linkedin"
              value={web?.linkedin || ""}
              onChange={handleChangeWebSite("linkedin")}
            />
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <UploadImageInput
            value={logo}
            onChangeImage={handleChangeLogo}
            label="Logo"
            inputLabelProps={{
              required: true,
            }}
          />
        </Stack>
      </Stack>
      <Button
        disabled={isDisabledButton}
        sx={{ width: 240 }}
        variant="contained"
        onClick={handleCreateCompany}
      >
        {labelButton}
      </Button>
    </>
  );
};

type CompanyActionPanelProps = {
  handleSubmit: (data: any) => Promise<void>;
  labelButton?: string;
  data?: CompanyClass;
};

type WebsiteProps = {
  web?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
};

export default CompanyActionPanel;

const getSelectedIndex = (label?: string, dataArr?: AppSelectProps[]) => {
  let id;
  dataArr?.map((item) => {
    if (label === item.label) {
      id = item.value;
    }
  });

  return id;
};

const companySize = [
  { value: 0, label: AppConstant.COMPANY_SIZE[0] },
  { value: 1, label: AppConstant.COMPANY_SIZE[1] },
  { value: 2, label: AppConstant.COMPANY_SIZE[2] },
  { value: 3, label: AppConstant.COMPANY_SIZE[3] },
  { value: 4, label: AppConstant.COMPANY_SIZE[4] },
  { value: 5, label: AppConstant.COMPANY_SIZE[5] },
];

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
