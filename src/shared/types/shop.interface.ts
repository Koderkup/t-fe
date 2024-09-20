export interface ShopSettingsFileds {
  image?: FileList;
  shopName: string;
  botToken: string;
  description: string;
  country?: string;
  countryValue?: string;
  currency: Array<string>;
}

export interface ShopFields {
  id: string;
  name: string;
  telegramId: string;
  type: string;
  inDraft: boolean;
  design_id: number;
  templateId: string;
  description: string;
  mediaUrl: string;
  functionalities: Array<number>;
  configuration: {
    botToken?: string;
    shopCurrencies: Array<string>;
    country: string;
  };
}
