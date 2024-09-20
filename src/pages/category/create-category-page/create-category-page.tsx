import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@twa-dev/sdk/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormWrapper,
  InputField,
  TextareaField,
  Typography,
} from "@/components";
import { CreateCategoryFields } from "@/pages/category/create-category-page/types.ts";
import { useCategoriesAPI } from "@/hooks/api/useCategoriesAPI.ts";
import { useMainStore } from "@/store/main-store";

const CreateCategoryPage: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateCategoryFields>({ mode: "onBlur" });
  const { createCategory } = useCategoriesAPI();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const { t } = useTranslation(["categories-pages", "translation"]);

  const onSubmit: SubmitHandler<CreateCategoryFields> = data => {
    createCategory.mutate({ ...data, shopId: activeShopId || "" });
  };

  return (
    <div className="flex h-screen flex-col justify-between px-4 pb-5 pt-2">
      <BackButton onClick={() => navigate(-1)} />

      <div>
        <Typography variant="heading-md" color="black_100">
          {t("create-category-page.title", { ns: "categories-pages" })}
        </Typography>

        <FormWrapper>
          <InputField
            label={t("create-category-page.name", { ns: "categories-pages" })}
            {...register("name", {
              required: t("error-messages.required", { ns: "translation" }),
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            placeholder={t("create-category-page.name-placeholder", {
              ns: "categories-pages",
            })}
            autoComplete="off"
          />

          <TextareaField
            label={t("create-category-page.description", {
              ns: "categories-pages",
            })}
            {...register("description", {
              required: t("error-messages.required", { ns: "translation" }),
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            placeholder={t("create-category-page.description-placeholder", {
              ns: "categories-pages",
            })}
            autoComplete="off"
          />
        </FormWrapper>
      </div>

      <Button disabled={!isValid} onClick={handleSubmit(onSubmit)}>
        {t("create-category-page.button-text", { ns: "categories-pages" })}
      </Button>
    </div>
  );
};

export default CreateCategoryPage;
