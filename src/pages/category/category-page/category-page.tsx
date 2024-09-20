import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "@twa-dev/sdk/react";
import { useTranslation } from "react-i18next";
import AddIcon from "../../../../public/icons/add-fill.svg";
import { useCategoriesAPI } from "@/hooks/api/useCategoriesAPI.ts";
import {
  AddButton,
  Button,
  CategoryCard,
  ProductCard,
  ProductsList,
  Typography,
} from "@/components";
import PageContainer from "@/components/layout/page-container/page-container.tsx";
import { RoutesPaths } from "@/routes/paths.config.ts";
import Cell from "@/components/ui/cell/cell.tsx";
import { useMainStore } from "@/store/main-store";

const CategoryPage: FC = () => {
  const params = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { category, deleteCategory } = useCategoriesAPI(params.categoryId);
  const { t } = useTranslation("categories-pages");
  const [activeItemId, setActiveItemId] = useMainStore(state => [
    state.activeItemId,
    state.setActiveItemId,
  ]);

  const handleNavigate = () => {
    navigate(RoutesPaths.PRODUCTS, {
      state: { parentCategoryId: category?.data?.id },
    });
  };

  const handleBackClick = () => {
    if (activeItemId) {
      setActiveItemId(null);
    } else {
      navigate(-1);
    }
  };

  return (
    <PageContainer>
      <BackButton onClick={handleBackClick} />

      <div className="flex flex-col gap-2">
        <CategoryCard
          id={params.categoryId || ""}
          deleteFn={() => deleteCategory.mutate(params.categoryId || "")}
          {...category.data}
        />

        {!!category?.data?.subcategories?.length &&
          category.data.subcategories.map(elem => (
            <Cell key={elem.id} size="small">
              {elem.name}
            </Cell>
          ))}

        <Button
          icon={
            <span className="h-6 w-6 fill-black_20">
              <AddIcon />
            </span>
          }
          variant="outline"
          onClick={() =>
            navigate(RoutesPaths.CREATE_SUBCATEGORY, {
              state: {
                categoryId: category.data?.id,
                categoryName: category.data?.name,
              },
            })
          }
        >
          {t("category-page.add-subcategory-text")}
        </Button>
      </div>

      <Typography
        variant="heading-sm"
        color="main_black"
        className="mt-4 inline-block"
      >
        {t("category-page.title")}
      </Typography>

      {category.data?.products?.length ? (
        <ProductsList>
          {category.data.products.map(elem => (
            <ProductCard
              key={elem.id}
              {...elem}
              onCLick={() => navigate(`${RoutesPaths.PRODUCTS}/${elem.id}`)}
            />
          ))}

          <AddButton onClick={handleNavigate}>
            <Typography variant="body-base" color="black_20">
              {t("category-page.add-product-text")}
            </Typography>
          </AddButton>
        </ProductsList>
      ) : (
        <Button
          className="mt-2"
          icon={
            <span className="h-6 w-6 fill-black_20">
              <AddIcon />
            </span>
          }
          variant="outline"
          onClick={handleNavigate}
        >
          {t("category-page.add-product-text")}
        </Button>
      )}
    </PageContainer>
  );
};

export default CategoryPage;
