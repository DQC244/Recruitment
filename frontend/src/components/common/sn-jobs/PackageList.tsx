import { Box } from "@mui/material";
import { PackageClass } from "models";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanyActions, CompanySelector } from "redux-store";
import AppTypography from "../AppTypography";
import { CardPackages } from "../packages";

const PackageList = ({ onChangePackage }: PackageListProps) => {
  const dispatch = useDispatch();
  const packageList = useSelector(CompanySelector.getPackageList, shallowEqual);

  const [checked, setChecked] = useState<PackageClass>();

  const handleChangeChecked = (index: PackageClass) => {
    setChecked(index);
  };

  useEffect(() => {
    dispatch(CompanyActions.getPackageList());
  }, []);

  useEffect(() => {
    if (packageList.length) {
      setChecked(packageList[0]);
    }
  }, [packageList]);

  useEffect(() => {
    onChangePackage(checked);
  }, [checked]);

  return (
    <Box>
      <AppTypography variant="subtitle1">Choose Package</AppTypography>
      {packageList.map((item, index) => (
        <CardPackages
          key={index}
          data={item}
          checked={item._id === checked?._id}
          onChangeChecked={() => handleChangeChecked(item)}
        />
      ))}
    </Box>
  );
};

type PackageListProps = {
  onChangePackage: (string?: PackageClass) => void;
};

export default PackageList;
