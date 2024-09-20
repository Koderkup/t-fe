import designVariant from "public/images/design-variant.webp";

export const DESIGN_VARIANTS = [
  {
    id: 1,
    imgUrl: designVariant,
    title: "France",
    price: 120,
    tag: "Classic",
  },
  {
    id: 2,
    imgUrl: designVariant,
    title: "France2",
    price: 120,
    tag: "Classic",
  },

  {
    id: 3,
    imgUrl: designVariant,
    title: "France3",
    price: 120,
    tag: "Classic",
  },
  {
    id: 4,
    imgUrl: designVariant,
    title: "France4",
    price: 120,
    tag: "Classic",
  },
  {
    id: 5,
    imgUrl: designVariant,
    title: "France5",
    price: 120,
    tag: "Classic",
  },
  {
    id: 6,
    imgUrl: designVariant,
    title: "France6",
    price: 120,
    tag: "Classic",
  },
];

export const TAGS = [
  {
    name: "Bright",
  },
  {
    name: "Light",
  },
  {
    name: "Classic",
  },
  {
    name: "Minimalism",
  },
] as const;
