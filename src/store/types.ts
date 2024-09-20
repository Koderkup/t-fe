import { AttributesFields } from "@/shared/types/product.interface";
import { ShopFeature, StepTwoFields } from "@/shared/types/types";

export type MainStore = {
  currentStep: number;
  isBannersOpen: boolean;
  isModalOpen: boolean;
  attributes: Array<AttributesFields>;
  isLabelInputOpen: boolean;
  stepTwoFormData: Omit<StepTwoFields, "features" | "totalPrice">;
  paymentMethod: string;
  activeShopId: string | null;
  activeItemId: string | null;
  isSuccesModalOpen: boolean;
  productMedias: Array<string>;
  activeMedia: null | string;
  incrementStep: () => void;
  toggleBanners: () => void;
  toggleModal: (isOpen: boolean) => void;
  setAttributes: (data: AttributesFields) => void;
  deleteAttribute: (name: string) => void;
  clearAttributes: () => void;
  toggleLabelInput: (show: boolean) => void;
  toggleSuccesModal: (open: boolean) => void;
  setStepTwoFormData: (data: Partial<StepTwoFields>) => void;
  setPaymentMethod: (data: string) => void;
  setActiveItemId: (id: string | null) => void;
  setActiveShopId: (id: string | null) => void;
  setProductMedias: (productMedias: Array<string>) => void;
  setActiveMedia: (activeMedia: string | null) => void;
};

export type TgStore = {
  userPhoneNumber?: string;
  setUserPhoneNumber: (phoneNumber: string) => void;
};

export type ShopStore = {
  shopId: string;
  activeStep: "second" | "third" | "payment" | null;
  setShopId: (id: string) => void;
  setActiveStep: (step: "second" | "third" | "payment" | null) => void;
  shopStepTwoFieldsData: StepTwoFields;
  setShopStepTwoFieldsData: (data: Partial<StepTwoFields>) => void;
  removeFeature: (featureName: string) => void;
  removeDesignFeature: () => void;
  addFeature: (feature: ShopFeature) => void;
  addVisualDesignFeature: (designFeature: ShopFeature) => void;
  clearFeatures: () => void;
};
