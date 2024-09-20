import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "public/icons/categories.svg";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@/components";
import { RoutesPaths } from "@/routes/paths.config.ts";

const NoCategoriesPlaceholder: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("categories-pages");

  return (
    <div>
      <div className="mt-5 h-[290px] w-full bg-no-categories-bg bg-cover" />

      <div className="mx-6 mt-[53px] font-medium">
        <Typography tag="h1" color="black_60" variant="heading-xl">
          {t("categories-page.empty-placeholder.title-part-1")}
          <br />
          <span className="!text-main_black">
            {t("categories-page.empty-placeholder.title-part-2")}
          </span>
          <br />
          {t("categories-page.empty-placeholder.title-part-3")}
          <span className="ml-2 !text-main_black">
            {t("categories-page.empty-placeholder.title-part-4")}
          </span>
        </Typography>

        <Typography tag="p" variant="body-md" className="mt-3">
          {t("categories-page.empty-placeholder.description")}
        </Typography>

        <Button
          icon={
            <span className="h-6 w-6">
              <Categories />
            </span>
          }
          className="mt-8"
          onClick={() => navigate(RoutesPaths.CREATE_CATEGORY)}
        >
          {t("categories-page.empty-placeholder.button-text")}
        </Button>
      </div>
    </div>
  );
};

export default NoCategoriesPlaceholder;
