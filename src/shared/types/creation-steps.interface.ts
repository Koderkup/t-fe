export interface FirstCreationStep {
  id: string;
  name: string;
  type: string;
  telegramId: string;
  userId: string;
}

export interface IFunctionality {
  id: string;
  name: string;
  description: string;
  mediaUrl: string;
  price: number;
  subMenu?: Array<IFunctionality>;
}

export interface IShop {
  id: string;
  name: string;
  type: string;
  telegramId: string;
  userId: string;
  configuration: AppCfg;
  inDraft: boolean;
  designId?: number;
  functionalityIds?: Array<number | string>;
}

export interface IDesign {
  id: string;
  name: string;
  description: string;
  color: string;
  font_style: string;
  price: number;
  theme: string;
  highlightColor: string;
  textSize: number;
  mediaUrl: string;
  tags: Array<string>;
}

export interface AppCfg {
  location: string;
  phoneNumber: string;
  email: string;
  shopCurrencies: Array<string>;
  shopId: string;
  botToken?: string;
  country?: string;
}

export interface PaymentInformation {
  userId: string;
  shopId: string;
  paymentIdentifier: string;
  paymentMethod: string;
  totalPrice: number;
  currency?: string;
  designId: number;
  functionalityIds?: number;
}
