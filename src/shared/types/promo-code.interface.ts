export type PromoCode = {
  id: string;
  code: string;
  discount: number;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  shopId: string;
};
