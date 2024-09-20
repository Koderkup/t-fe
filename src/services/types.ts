import { ProductPrices } from "@/shared/types/product.interface";

export type CreateCategoryDto = {
  shopId: string;
  name: string;
  description: string;
  parentId?: string;
};

export type CreateUserPaymentDto = {
  paymentIdentifier: string;
  paymentMethod: string;
  currency?: string;
  functionalityIds?: Array<string | number>;
  shopId: string;
  userId: string;
  designId: string | number;
  totalPrice: number;
};

export type CreateProductDto = {
  id?: string;
  shopId: string;
  name: string;
  descriptionFull: string;
  descriptionShort: string;
  discount: number;
  prices: Array<ProductPrices>;
  cost: number;
  stock: number;
  mediaUrl?: string;
  careListId?: string;
  currency: string;
  colors?: Array<string>;
  sizes?: Array<string>;
  categoryTypeId: string;
  isFeatured: boolean;
  featuredText: string;
};

export type CreateSizeDto = {
  name: string;
  shopId: string;
};

export type CreateColorDto = {
  shopId: string;
  name: string;
  hexCode: string;
};
