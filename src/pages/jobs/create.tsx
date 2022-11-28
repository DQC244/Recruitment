import React from "react";
import { NextPage } from "next";
import { Button, Container, Stack } from "@mui/material";
import { HorizontalLinearStepper, JobActionPanel } from "components/common";

const Create: NextPage = () => {
  return (
    <Container>
      <Stack spacing={4}>
        <JobActionPanel />
        <Button sx={{ width: 240 }} variant="contained">
          Create
        </Button>
      </Stack>
      <HorizontalLinearStepper
        steps={[
          "Select master blaster campaign settings",
          "Create an ad group",
          "Create an ad",
        ]}
        onBack={() => {
          return;
        }}
        onNext={() => {
          return;
        }}
      />
    </Container>
  );
};

export default Create;
