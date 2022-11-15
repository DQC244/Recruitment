import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LangConstant, NFTConstant } from "const";
import { useTranslation } from "react-i18next";
import CommonTrackFilter from "./CommonTrackFilter";

const LevelFilter = ({ data, ...otherProps }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);

  const [defaultFilters, setDefaultFilters] = useState([NFTConstant.LEVEL_RANGE.min, NFTConstant.LEVEL_RANGE.max]);

  useEffect(() => {
    if (Array.isArray(data) && data?.length === 2) {
      setDefaultFilters(data);
    }
  }, [data]);

  return (
    <CommonTrackFilter
      title={getLabel("lLevel")}
      min={NFTConstant.LEVEL_RANGE.min}
      max={NFTConstant.LEVEL_RANGE.max}
      data={defaultFilters}
      {...otherProps}
    />
  );
};

LevelFilter.propTypes = {
  data: PropTypes.array,
};

export default LevelFilter;
