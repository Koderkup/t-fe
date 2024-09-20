import img1 from "public/images/img1.webp";
import img2 from "public/images/img2.webp";
import img3 from "public/images/img3.webp";
import img4 from "public/images/img4.webp";
import img5 from "public/images/img5.webp";
import img6 from "public/images/img6.webp";

export const BANNERS_DATA = [
  {
    imgUrl: img1,
    titleTranslateKey: "welcome-page.step-1-title",
    descriptionTranslateKey: "welcome-page.step-1-description",
  },
  {
    imgUrl: img2,
    titleTranslateKey: "welcome-page.step-2-title",
    descriptionTranslateKey: "welcome-page.step-2-description",
  },
  {
    imgUrl: img3,
    titleTranslateKey: "welcome-page.step-3-title",
    descriptionTranslateKey: "welcome-page.step-3-description",
  },
  {
    imgUrl: img4,
    titleTranslateKey: "welcome-page.step-4-title",
    descriptionTranslateKey: "welcome-page.step-4-description",
  },
  {
    imgUrl: img5,
    titleTranslateKey: "welcome-page.step-5-title",
    descriptionTranslateKey: "welcome-page.step-5-description",
  },

  {
    imgUrl: img6,
    titleTranslateKey: "welcome-page.step-6-title",
    descriptionTranslateKey: "welcome-page.step-6-description",
  },
] as const;
