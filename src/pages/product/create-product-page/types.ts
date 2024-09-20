export type CreateProductFields = {
  name: string;
  descriptionFull: string;
  descriptionShort: string;
  category: string;
  images: File[];
  featured: boolean;
  price: number;
  featuredText?: string;
};
