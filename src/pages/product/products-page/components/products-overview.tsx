import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Product } from "@/shared/types/product.interface.ts";
import { Category } from "@/shared/types/category.interface.ts";
import {
  AddButton,
  Label,
  ProductCard,
  ProductsList,
  Typography,
} from "@/components";
import { RoutesPaths } from "@/routes/paths.config.ts";

type Props = {
  productsData: Product[];
  categoriesData: Category[];
};

const ProductsOverview: FC<Props> = ({ productsData, categoriesData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("products-pages");

  return (
    <div className="flex flex-col gap-y-4 px-4 py-2">
      <Typography tag="h1" variant="heading-xl" color="black_100">
        {t("products-page.overview.title")}
      </Typography>

      <div className="relative -left-4 w-screen">
        <Swiper slidesPerView="auto" spaceBetween={8} className="!w-auto !px-4">
          <SwiperSlide className="!w-auto">
            <Label selected>{t("products-page.overview.all-category")}</Label>
          </SwiperSlide>

          {categoriesData.map(elem => (
            <SwiperSlide key={elem.id} className="!w-auto overflow-hidden">
              <Label
                onClick={() => navigate(`${RoutesPaths.CATEGORIES}/${elem.id}`)}
              >
                {elem.name}
              </Label>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ProductsList>
        {productsData.map(elem => (
          <Link key={elem.id} to={elem.id}>
            <ProductCard key={elem.id} {...elem} />
          </Link>
        ))}

        <AddButton onClick={() => navigate(RoutesPaths.CREATE_PRODUCT)}>
          <Typography variant="body-base" color="black_20">
            {t("products-page.overview.button-text")}
          </Typography>
        </AddButton>
      </ProductsList>
    </div>
  );
};

export default ProductsOverview;
