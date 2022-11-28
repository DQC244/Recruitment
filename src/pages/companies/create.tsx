import React from "react";
import { NextPage } from "next";
import { Button, Container, Stack } from "@mui/material";
import CompanyActionPanel from "components/common/CompanyActionPanel";

const Create: NextPage = () => {
  return (
    <Container>
      <Stack spacing={5}>
        <CompanyActionPanel />
        <Button sx={{ width: 240 }} variant="contained">
          Create
        </Button>
      </Stack>
    </Container>
  );
};

export default Create;
