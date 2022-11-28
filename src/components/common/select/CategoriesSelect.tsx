import React, { memo, useState } from "react";
import AppSelect from "../AppSelect";

const CategoriesSelect = ({ onChangeCategories }: CategoriesSelectProps) => {
  const [categories, setCategories] = useState(CATEGORIES[0]);

  const handleChangeCategory = (item: any) => {
    setCategories(item);
    onChangeCategories(item);
  };

  return (
    <AppSelect
      selectedIndex={categories.value}
      onSelected={handleChangeCategory}
      data={CATEGORIES}
    />
  );
};

type CategoriesSelectProps = {
  onChangeCategories: (item: any) => void;
};

export default memo(CategoriesSelect);

const CATEGORIES = [
  { value: 1, label: "Design & Art" },
  { value: 2, label: "Health Care" },
  { value: 3, label: "IT Engineer" },
  { value: 4, label: "Management" },
  { value: 5, label: "Marketing" },
  { value: 6, label: "Teaching" },
  { value: 7, label: "Sales" },
];
