import Categories from "public/icons/categories.svg";
import Products from "public/icons/database-2-fill.svg";
import Orders from "public/icons/truck-fill.svg";
import Newsletters from "public/icons/newspaper-fill.svg";
import Payment from "public/icons/secure-payment-fill.svg";
import BotSettings from "public/icons/shopping-cart-2-fill.svg";
import AdBlock from "public/icons/advertisement-fill.svg";
import PromoCodes from "public/icons/price-tag-3-fill.svg";
import PromoBlock from "public/icons/table-fill.svg";
import OrderSettings from "public/icons/settings-fill.svg";
import { RoutesPaths } from "@/routes/paths.config.ts";

export const navigationData = {
  main: [
    {
      path: RoutesPaths.CATEGORIES,
      icon: <Categories />,
      translateKey: "home-page.navigation.categories",
      namespace: "categories-pages",
    },

    {
      path: RoutesPaths.PRODUCTS,
      icon: <Products />,
      translateKey: "home-page.navigation.products",
      namespace: "products-pages",
    },

    {
      path: RoutesPaths.ORDERS,
      icon: <Orders />,
      translateKey: "home-page.navigation.orders",
      namespace: "orders-pages",
    },

    {
      path: RoutesPaths.NEWSLETTERS,
      icon: <Newsletters />,
      translateKey: "home-page.navigation.newsletters",
      namespace: "newsletter",
    },

    {
      path: RoutesPaths.AD_BLOCK,
      icon: <AdBlock />,
      translateKey: "home-page.navigation.ad-block",
      namespace: "ad-block-page",
    },

    {
      path: RoutesPaths.PROMO_CODES,
      icon: <PromoCodes />,
      translateKey: "home-page.navigation.promo-codes",
      namespace: "promo-codes",
    },

    {
      path: RoutesPaths.PROMO_BLOCK,
      icon: <PromoBlock />,
      translateKey: "home-page.navigation.promo-block",
      namespace: "promo-codes",
    },
  ],
  settings: [
    {
      path: RoutesPaths.PAYMENT_SYSTEMS,
      icon: <Payment />,
      translateKey: "home-page.navigation.payment",
      namespace: "payment-systems-page",
    },

    {
      path: RoutesPaths.BOT_SETTINGS,
      icon: <BotSettings />,
      translateKey: "home-page.navigation.bot-settings",
      namespace: "bot-settings-page",
    },

    {
      path: RoutesPaths.ORDER_SETTINGS,
      icon: <OrderSettings />,
      translateKey: "home-page.navigation.order-settings",
      namespace: "order-settings-page",
    },
  ],
} as const;
