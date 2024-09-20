export type AppConfiguration = {
  shopId: string;
  id: string;
  minOrderAmountWithDelivery: number;
  minOrderAmountWithoutDelivery: number;
  location: string;
  phoneNumber: string;
  email: string;
  emailPassword: string;
  botMessages: {
    welcome?: string;
    confirmOrder?: string;
  };
  shopCurrencies: [
    {
      value: string;
      label: string;
    },
  ];
};

export type AppConfigurationUpdateDTO = {
  minOrderAmountWithDelivery?: number | string;
  minOrderAmountWithoutDelivery?: number | string;
  forwardingId?: string;
  botMessages?: {
    welcome?: string;
    confirmOrder?: string;
  };
  country?: string;
  mediaUrl?: FormData;
  shopCurrencies?: Array<string>;
  botToken?: string;
};
