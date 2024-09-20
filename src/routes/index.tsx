import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PageLayout from "@/components/layout/page-layout/page-layout";
import {
  AdBlockPage,
  AdBlocksPage,
  AdditionalFeaturesPage,
  AppSettings,
  BotSettings,
  CategoriesPage,
  CategoryPage,
  CreateAdBlockPage,
  CreateCategoryPage,
  CreateNewsletterPage,
  CreateProductPage,
  CreatePromoBlockPage,
  CreatePromoCodesPage,
  CreateSubcategoryPage,
  DesignSettingsPage,
  FeaturePage,
  FirstCreationStepPage,
  AdminPage,
  MainPage,
  NewsletterPage,
  NewslettersPage,
  OrderSettings,
  OrderDetailsPage,
  OrderHistoryPage,
  PaymentConfirmationPage,
  PaymentMethodsPage,
  PaymentPage,
  PaymentSystems,
  ProductsPage,
  PromoBlockPage,
  PromoBlocksPage,
  PromoCodePage,
  PromoCodesPage,
  SecondCreationStepPage,
  ShopSettingsPage,
  StripeCheckoutFormPage,
  TapplyCoinPage,
  WelcomePage,
  Administrate,
  ProductPage,
} from "@/pages";
import { RoutesPaths } from "@/routes/paths.config.ts";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PageLayout />}>
        <Route index path={RoutesPaths.MAIN} element={<MainPage />} />

        <Route path={RoutesPaths.PRODUCTS} element={<ProductsPage />} />
        <Route
          path={`${RoutesPaths.PRODUCTS}/:productId`}
          element={<ProductPage />}
        />
        <Route
          path={RoutesPaths.CREATE_PRODUCT}
          element={<CreateProductPage />}
        />

        <Route path={RoutesPaths.CATEGORIES} element={<CategoriesPage />} />
        <Route
          path={RoutesPaths.CREATE_CATEGORY}
          element={<CreateCategoryPage />}
        />
        <Route
          path={`${RoutesPaths.CATEGORIES}/:categoryId`}
          element={<CategoryPage />}
        />

        <Route
          path={`${RoutesPaths.CREATE_SUBCATEGORY}`}
          element={<CreateSubcategoryPage />}
        />

        <Route path={RoutesPaths.WELCOME} element={<WelcomePage />} />
        <Route path={RoutesPaths.AD_BLOCK} element={<AdBlocksPage />} />
        <Route
          path={`${RoutesPaths.AD_BLOCK}/:adBlockId`}
          element={<AdBlockPage />}
        />
        <Route
          path={RoutesPaths.CREATE_AD_BLOCK}
          element={<CreateAdBlockPage />}
        />

        <Route path={RoutesPaths.PROMO_BLOCK} element={<PromoBlocksPage />} />
        <Route
          path={RoutesPaths.CREATE_PROMO_BLOCK}
          element={<CreatePromoBlockPage />}
        />
        <Route
          path={`${RoutesPaths.PROMO_BLOCK}/:promoBlockId`}
          element={<PromoBlockPage />}
        />

        <Route path={RoutesPaths.PROMO_CODES} element={<PromoCodesPage />} />
        <Route
          path={RoutesPaths.CREATE_PROMO_CODE}
          element={<CreatePromoCodesPage />}
        />
        <Route
          path={`${RoutesPaths.PROMO_CODES}/:promoCodeId`}
          element={<PromoCodePage />}
        />

        <Route path={RoutesPaths.CREATE_APP}>
          <Route path={RoutesPaths.FIRST_STEP}>
            <Route index element={<FirstCreationStepPage />} />
          </Route>

          <Route>
            <Route
              path={RoutesPaths.SECOND_STEP}
              element={<SecondCreationStepPage />}
            />
            <Route path={`${RoutesPaths.SECOND_STEP}/:designId`}>
              <Route index element={<DesignSettingsPage />} />
            </Route>
          </Route>

          <Route>
            <Route
              path={RoutesPaths.THIRD_STEP}
              element={<AdditionalFeaturesPage />}
            />
            <Route
              path={`${RoutesPaths.THIRD_STEP}/${RoutesPaths.PAYMENT_METHODS}`}
              element={<PaymentMethodsPage />}
            />
            <Route
              path={`${RoutesPaths.THIRD_STEP}/:featureId`}
              element={<FeaturePage />}
            />
          </Route>

          <Route
            path={RoutesPaths.CREATION_PAYMENT}
            element={<PaymentPage />}
          />
          <Route
            path={RoutesPaths.PAYMENT_CONFIRAMTION}
            element={<PaymentConfirmationPage />}
          />
        </Route>

        <Route path={RoutesPaths.TAPPLY_COIN} element={<TapplyCoinPage />} />

        <Route path={RoutesPaths.APP_SETTINGS} element={<AppSettings />} />
        <Route>
          <Route path={RoutesPaths.ADMINISTRATE} element={<Administrate />} />
          <Route
            path={`${RoutesPaths.ADMINISTRATE}/:storeId`}
            element={<AdminPage />}
          />
        </Route>
        <Route
          path={RoutesPaths.SHOP_SETTINGS}
          element={<ShopSettingsPage />}
        />
        <Route path={RoutesPaths.BOT_SETTINGS} element={<BotSettings />} />

        <Route path={RoutesPaths.NEWSLETTERS} element={<NewslettersPage />} />
        <Route
          path={`${RoutesPaths.NEWSLETTERS}/:newsletterId`}
          element={<NewsletterPage />}
        />
        <Route
          path={RoutesPaths.CREATE_NEWSLETTER}
          element={<CreateNewsletterPage />}
        />

        <Route
          path={RoutesPaths.PAYMENT_SYSTEMS}
          element={<PaymentSystems />}
        />

        <Route path={RoutesPaths.ORDER_SETTINGS} element={<OrderSettings />} />
        <Route path={RoutesPaths.ORDERS} element={<OrderHistoryPage />} />

        <Route
          path={`${RoutesPaths.ORDERS}/:orderId`}
          element={<OrderDetailsPage />}
        />
      </Route>
      <Route path={RoutesPaths.STRIPE} element={<StripeCheckoutFormPage />} />
    </>
  )
);

export default routes;
