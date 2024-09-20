export interface AppSettingsFormFields {
  name: string;
  lastName: string;
  language: string;
}

export interface StepOneFields {
  shopName: string;
  address: string;
  phoneNumber: string;
  email: string;
  shopType: string;
  description: string;
  templateId?: string;
  shopTypeValue?: string;
  mediaUrl?: string;
  botToken?: string;
}

export interface ShopFeature {
  featureId?: string;
  featureTitle: string;
  featureText: string;
  featurePrice: number;
}

export interface StepTwoFields {
  theme: string;
  highlightColor: string;
  font: string;
  textSize: number | string;
  features: Array<ShopFeature>;
  visualDesignFeature?: ShopFeature;
  totalPrice: number;
}

export interface FeatureType {
  featureName: string;
  url?: string;
  subMenu?: Array<{ featureName: string }>;
}

export type OrderStatus =
  | "Pending"
  | "Paid"
  | "Confirmed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface StoreCardProps {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
}

export type LocaleKeys = "en" | "ru" | "pt" | "hi" | "uk" | "zh";

export type AttributesOptions = "color" | "size";
