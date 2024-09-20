import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import NoProductsPlaceholder from "@/pages/product/products-page/components/no-products-placeholder.tsx";
import { useProductsAPI } from "@/hooks/api/useProductsAPI.ts";
import { useCategoriesAPI } from "@/hooks/api/useCategoriesAPI.ts";
import ProductsOverview from "@/pages/product/products-page/components/products-overview.tsx";
import { RoutesPaths } from "@/routes/paths.config";
import { useMainStore } from "@/store/main-store";

const ProductsPage: FC = () => {
  const navigate = useNavigate();
  const { products } = useProductsAPI();
  const { categories } = useCategoriesAPI();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);

  return (
    <div>
      <BackButton
        onClick={() => navigate(`${RoutesPaths.ADMINISTRATE}/${activeShopId}`)}
      />

      {products?.data?.length && categories?.data?.length ? (
        <ProductsOverview
          productsData={products.data}
          categoriesData={categories.data}
        />
      ) : (
        <NoProductsPlaceholder />
      )}
    </div>
  );
};

export default ProductsPage;
