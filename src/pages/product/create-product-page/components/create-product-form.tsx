import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { FormWrapper, InputField, TextareaField } from "@/components";
import { CreateProductFields } from "@/pages/product/create-product-page/types.ts";
import MediaBlock from "@/pages/product/create-product-page/components/media-block.tsx";
import FeaturedBlock from "@/pages/product/create-product-page/components/featured-block.tsx";
import PriceBlock from "@/pages/product/create-product-page/components/price-block.tsx";
import LabelsBlock from "@/pages/product/create-product-page/components/labels-block.tsx";
import AttributesBlock from "@/pages/product/create-product-page/components/attributes-block.tsx";
import { useCategoriesAPI } from "@/hooks/api/useCategoriesAPI.ts";
import { Category } from "@/shared/types/category.interface.ts";
import FieldControl from "@/components/ui/form/field-control/field-control";

const CreateProductForm: FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateProductFields>();
  const { categories } = useCategoriesAPI();
  const location = useLocation();
  const { t } = useTranslation("products-pages");

  const transformCategories = (data?: Category[]) => {
    if (!data?.length) return [];

    return data.map(elem => ({
      value: elem.id,
      label: elem.name,
    }));
  };

  const getParentCategoryById = () => {
    const parentCategory = categories?.data?.find(
      elem => elem.id === location.state?.parentCategoryId
    );
    if (!parentCategory) return null;

    return {
      value: parentCategory.id,
      label: parentCategory.name,
    };
  };

  return (
    <FormWrapper>
      <InputField
        label={t("create-product-page.name")}
        placeholder={t("create-product-page.name-placeholder")}
        autoComplete="off"
        {...register("name", { required: true })}
        error={!!errors.name}
        helperText={t("create-product-page.name-error")}
      />

      <InputField
        label={t("create-product-page.description-short")}
        placeholder={t("create-product-page.description-placeholder")}
        autoComplete="off"
        {...register("descriptionShort", { required: true })}
        error={!!errors.descriptionShort}
        helperText={t("create-product-page.description-short-error")}
      />

      <TextareaField
        label={t("create-product-page.description-full")}
        placeholder={t("create-product-page.description-placeholder")}
        autoComplete="off"
        {...register("descriptionFull", { required: true })}
        error={!!errors.descriptionFull}
        helperText={t("create-product-page.description-full-error")}
      />

      <FieldControl label={t("create-product-page.category")}>
        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              classNamePrefix="select"
              options={transformCategories(categories?.data)}
              isDisabled={!!location.state?.parentCategoryId}
              defaultValue={getParentCategoryById()}
              placeholder={t("create-product-page.category-placeholder")}
              noOptionsMessage={() => "No options..."}
              isClearable
              value={transformCategories(categories?.data).find(
                c => c.value === field.value
              )}
              onChange={val => field.onChange(val?.value)}
            />
          )}
        />
      </FieldControl>

      <MediaBlock />
      <FeaturedBlock />
      <PriceBlock />
      <LabelsBlock />
      <AttributesBlock />
    </FormWrapper>
  );
};

export default CreateProductForm;
