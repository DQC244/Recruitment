import { ApiConstant } from "const";
import { AppSelectProps } from "models/types";
import React, { memo, useEffect, useMemo, useState } from "react";
import { AppService } from "services";
import AppSelect from "../AppSelect";

const CategoriesSelect = ({ onChangeCategories }: CategoriesSelectProps) => {
  const [category, setCategory] = useState<AppSelectProps>(
    {} as AppSelectProps
  );
  const [categories, setCategories] = useState<any[]>([]);

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
    try {
      const res: any = await AppService.getCategories();

      if (res.status === ApiConstant.STT_OK) {
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

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
};

export default memo(CategoriesSelect);
