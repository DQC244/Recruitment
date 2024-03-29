import { AppSelectProps } from "models/types";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CompanyActions, CompanySelector } from "redux-store";
import AppSelect from "../AppSelect";

const CategoriesSelect = ({
  onChangeCategories,
  selectedId,
}: CategoriesSelectProps) => {
  const dispatch = useDispatch();
  const categories = useSelector(CompanySelector.getCategoryList);

  const [category, setCategory] = useState<AppSelectProps>(
    {} as AppSelectProps
  );

  const handleChangeCategory = (item: any) => {
    setCategory(item);
    onChangeCategories(item.value);
  };

  const dataFormat = useMemo(() => {
    const newCategories = categories.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });

    return newCategories;
  }, [categories]);

  const handleGetCategories = async () => {
    dispatch(CompanyActions.getCategoryList());
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  useEffect(() => {
    if (selectedId && dataFormat.length) {
      const select = dataFormat.filter((item) => item.value === selectedId)[0];
      setCategory(select);
    }
  }, [selectedId, dataFormat]);

  return (
    <AppSelect
      selectedIndex={category.value}
      onSelected={handleChangeCategory}
      data={dataFormat}
    />
  );
};

type CategoriesSelectProps = {
  onChangeCategories: (item: any) => void;
  selectedId?: string;
};

export default memo(CategoriesSelect);
