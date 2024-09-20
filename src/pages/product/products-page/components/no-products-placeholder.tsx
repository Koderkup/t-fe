import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ShoppingBag from "../../../../../public/icons/shopping-bag-3-fill.svg";
import { Button, Typography } from "@/components";
import { RoutesPaths } from "@/routes/paths.config.ts";

const NoProductsPlaceholder: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("products-pages");

  return (
    <div>
      <div className="mt-5 h-[290px] w-full bg-no-products-bg bg-cover" />

      <div className="mx-6 mt-[18px]">
        <Typography
          tag="h1"
          color="black_100"
          variant="heading-xl"
          className="mb-4 font-medium"
        >
          {t("products-page.empty-placeholder.title")}
        </Typography>

        <Typography tag="p" variant="body-md">
          {t("products-page.empty-placeholder.description")}
        </Typography>

        <Button
          icon={<ShoppingBag />}
          className="mt-[72px]"
          onClick={() => navigate(RoutesPaths.CREATE_PRODUCT)}
        >
          {t("products-page.empty-placeholder.button-text")}
        </Button>
      </div>
    </div>
  );
};

export default NoProductsPlaceholder;
