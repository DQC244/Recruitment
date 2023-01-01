import React, { useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import { Alert, Button, Container, Snackbar, Stack } from "@mui/material";
import {
  AppLink,
  HorizontalLinearStepper,
  JobActionPanel,
} from "components/common";
import { ApiConstant, EnvConstant, PathConstant } from "const";
import { CommonUtils } from "utils";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import PackageList from "components/common/sn-jobs/PackageList";
import JobDetailPanel from "components/common/sn-job-detail/JobDetailPanel";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanyActions, CompanySelector } from "redux-store";
import { useAuthContext } from "context";
import { JobClass, PackageClass } from "models";
import StripeCheckout from "react-stripe-checkout";
import useCheckout from "hooks/useCheckout";
import { useRouter } from "next/router";
import { AppService } from "services";
import useCheckExpirePackage from "hooks/useCheckExpirePackage";

const Create: NextPage = () => {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const handleCheckout = useCheckout();
  const handleCheckExpirePackage = useCheckExpirePackage();

  const STRIPS_KEY = EnvConstant.STRIPS_KEY;
  const SECRET_KEY = EnvConstant.SECRET_KEY;

  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [isNoCompany, setIsNoCompany] = useState(false);
  const [jobInfo, setJobInfo] = useState<JobClass>();
  const [packageId, setPackageId] = useState<PackageClass>();
  const [stripToken, setStripToken] = useState<any>(null);
  const [verify, setVerify] = useState(false);

  const companyInfo = useSelector(CompanySelector.getCompanyInfo, shallowEqual);

  const { accountInfo } = useAuthContext();

  const { key, publicKey } = useMemo(() => {
    if (STRIPS_KEY && SECRET_KEY)
      return {
        key: SECRET_KEY,
        publicKey: STRIPS_KEY,
      };
    return { key: "", publicKey: "" };
  }, [STRIPS_KEY, SECRET_KEY]);

  const handleCreateJobService = async (data: any) => {
    try {
      const res: any = await AppService.createJob(data);
      if (res.status === ApiConstant.STT_OK) {
        setError("");
        setTimeout(()=>{
          router.replace(PathConstant.SUCCESS);
        },200)
      } else {
        setError(res.data.message);
      }
      setIsOpenMsg(true);
    } catch (error) {
      setError("something went wrong");
      setIsOpenMsg(true);
    }
  };

  const handleCreateJob = async (data: any) => {
    setJobInfo(data);
  };

  const action = useMemo(() => {
    switch (step) {
      case 0:
        return <PackageList onChangePackage={setPackageId} />;
      case 1:
        return <JobActionPanel label="Confirm" onSubmit={handleCreateJob} />;
      case 2:
        return (
          <JobDetailPanel
            jobInfo={jobInfo}
            companyInfo={companyInfo}
            isPreview={true}
          />
        );
    }
  }, [step, jobInfo, companyInfo, handleCreateJob]);

  const handleBackStep = () => {
    setStep((step) => step - 1);
  };

  const handleNextStep = () => {
    if (step === STEP_LIST.length - 1) {
      if (accountInfo.package && verify) {
        handleCreateJobService(jobInfo);
       
      }

      return;
    }

    setStep((step) => step + 1);
  };

  const verifyPackage = async () => {
    const verify = await handleCheckExpirePackage();
    if (accountInfo.package && verify) {
      setStep(1);
      setVerify(true);
    }
  };

  const onToken = (token: any) => {
    setStripToken(token);
  };

  useEffect(() => {
    if (accountInfo.company) {
      dispatch(CompanyActions.getCompany(accountInfo.company));
      setIsNoCompany(false);
    } else {
      setIsNoCompany(true);
    }
  }, [accountInfo.company]);

  useEffect(() => {
    if (packageId?.price && stripToken) {
      const total = packageId.price * 100;

      handleCheckout(stripToken.id, total, packageId._id, (data: any) => {
        handleCreateJobService(jobInfo);
        router.replace(PathConstant.SUCCESS);
      });
    }
  }, [packageId?.price, stripToken, jobInfo]);

  useEffect(() => {
    verifyPackage();
  }, [accountInfo.package]);

  return (
    <Container>
      <Stack spacing={4} py={5}>
        {isNoCompany ? (
          <AppLink
            variant="h3"
            sx={{ textAlign: "center" }}
            href={PathConstant.CREATE_COMPANY}
          >
            You Must Create Company first
          </AppLink>
        ) : (
          action
        )}
      </Stack>
      <HorizontalLinearStepper
        activeStep={step}
        className={classes.stepper}
        steps={STEP_LIST}
        onBack={handleBackStep}
        onNext={handleNextStep}
        buttonCheckout={
          step === STEP_LIST.length - 1 && !accountInfo.package ? (
            <StripeCheckout
              image="https://i.ibb.co/KqdxtTz/Rectangle-10316.png"
              amount={Number(packageId?.price) * 100}
              description={`Your total is $${packageId?.price}`}
              name="DQC"
              billingAddress
              shippingAddress
              token={onToken}
              stripeKey={publicKey}
              key={key}
            >
              <Button variant="contained">Checkout</Button>
            </StripeCheckout>
          ) : (
            <Button
              disabled={!jobInfo && step === 1 ? true : false}
              variant="contained"
              onClick={handleNextStep}
            >
              {step === STEP_LIST.length - 1 ? "Create" : "Next"}
            </Button>
          )
        }
      />
      <Snackbar
        open={isOpenMsg}
        autoHideDuration={5000}
        onClose={() => setIsOpenMsg(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setIsOpenMsg(false)}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || "success!"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Create;

const STEP_LIST = ["Choose Package", "Listing Details", "Preview Listing"];

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);

const useStyles = makeStyles((theme: ThemeProps) => ({
  stepper: {
    position: "fixed",
    bottom: 0,
    left: 0,
    padding: "16px 24px",
    background: theme.palette.common.white,
    zIndex: 99999999,
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  },
}));
