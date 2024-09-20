export type PromoBlock = {
  id: string;
  link: string;
  title?: string;
  description?: string;
  buttonText?: string;
  isActive: boolean;
  mediaUrl: string;
  image?: File | null;
  shopId: string;
};
