import { FC } from "react";
import AddIcon from "public/icons/add-fill.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@/components";
import { Category } from "@/shared/types/category.interface.ts";
import CategoriesList from "@/pages/category/categories-page/components/categories-list.tsx";
import { RoutesPaths } from "@/routes/paths.config.ts";

type Props = {
  data: Category[];
};

const CategoriesPreview: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("categories-pages");

  return (
    <div>
      <Typography
        variant="heading-md"
        color="black_100"
        className="mb-4 inline-block"
      >
        {t("categories-page.preview.title")}
      </Typography>

      <CategoriesList data={data} />

      <Button
        icon={
          <span className="h-6 w-6 fill-black_20">
            <AddIcon />
          </span>
        }
        className="mt-2"
        variant="outline"
        onClick={() => navigate(RoutesPaths.CREATE_CATEGORY)}
      >
        {t("categories-page.preview.button-text")}
      </Button>
    </div>
  );
};

export default CategoriesPreview;
