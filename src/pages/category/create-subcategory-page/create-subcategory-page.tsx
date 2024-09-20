import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, InputField, TextareaField, Typography } from "@/components";
import { CreateSubcategoryFields } from "@/pages/category/create-subcategory-page/types.ts";
import { useCategoriesAPI } from "@/hooks/api/useCategoriesAPI";
import { useMainStore } from "@/store/main-store";

const CreateSubcategoryPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const { t } = useTranslation(["categories-pages", "translation"]);
  const { createCategory } = useCategoriesAPI();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateSubcategoryFields>({
    defaultValues: {
      name: "",
      description: "",
      parentId: location.state?.categoryName,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<CreateSubcategoryFields> = data => {
    createCategory.mutate({
      name: data.name,
      description: data.description,
      parentId: location.state.categoryId,
      shopId: activeShopId || "",
    });
  };

  return (
    <div className="flex h-screen flex-col justify-between px-4 pb-5 pt-2">
      <BackButton onClick={() => navigate(-1)} />

      <div>
        <Typography variant="heading-md" color="black_100">
          {t("create-subcategory-page.title", { ns: "categories-pages" })}
        </Typography>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label={t("create-subcategory-page.name", {
              ns: "categories-pages",
            })}
            {...register("name", {
              required: t("error-messages.required", { ns: "translation" }),
            })}
            placeholder={t("create-subcategory-page.name-placeholder", {
              ns: "categories-pages",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            autoComplete="off"
          />

          <InputField
            label={t("create-subcategory-page.parent-category", {
              ns: "categories-pages",
            })}
            {...register("parentId")}
            disabled
          />

          <TextareaField
            label={t("create-subcategory-page.description", {
              ns: "categories-pages",
            })}
            {...register("description", {
              required: t("error-messages.required", { ns: "translation" }),
            })}
            placeholder={t("create-subcategory-page.description-placeholder", {
              ns: "categories-pages",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            autoComplete="off"
          />
        </form>
      </div>

      <Button disabled={!isValid} onClick={handleSubmit(onSubmit)}>
        {t("create-subcategory-page.button-text", { ns: "categories-pages" })}
      </Button>
    </div>
  );
};

export default CreateSubcategoryPage;
