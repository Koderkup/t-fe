import Resources from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: Resources;
  }
}

export type StatusKeys = keyof Resources["orders-pages"]["status-variants"];
export type DesignTags = keyof Resources["step-two-page"]["design-tags"];
