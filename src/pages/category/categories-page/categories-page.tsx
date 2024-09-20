import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import NoCategoriesPlaceholder from "@/pages/category/categories-page/components/no-categories-placeholder.tsx";
import { useCategoriesAPI } from "@/hooks/api/useCategoriesAPI.ts";
import CategoriesPreview from "@/pages/category/categories-page/components/categories-preview.tsx";
import { PageContainer } from "@/components";
import { useMainStore } from "@/store/main-store";
import { RoutesPaths } from "@/routes/paths.config";

const CategoriesPage: FC = () => {
  const navigate = useNavigate();
  const { categories } = useCategoriesAPI();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const [activeItemId, setActiveItemId] = useMainStore(state => [
    state.activeItemId,
    state.setActiveItemId,
  ]);

  const handleBackClick = () => {
    if (activeItemId) {
      setActiveItemId(null);
    } else {
      navigate(`${RoutesPaths.ADMINISTRATE}/${activeShopId}`);
    }
  };

  return (
    <PageContainer>
      <BackButton onClick={handleBackClick} />

      {categories?.data?.length ? (
        <CategoriesPreview data={categories.data} />
      ) : (
        <NoCategoriesPlaceholder />
      )}
    </PageContainer>
  );
};

export default CategoriesPage;
