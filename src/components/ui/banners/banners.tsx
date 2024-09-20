import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProgressBar from "./components/progress-bar";
import ActionButtons from "./components/action-buttons";
import { BANNERS_DATA } from "./data";
import BannerCard from "./components/banner-card";
import { useMainStore } from "@/store/main-store";
import usePreloadImages from "@/hooks/usePreloadImages";
import { lockScroll } from "@/utils/lock-scroll";

const Banners: FC = () => {
  const [currentStep, isBannersOpen] = useMainStore(state => [
    state.currentStep,
    state.isBannersOpen,
  ]);
  const data = BANNERS_DATA[currentStep - 1];
  const imgUrls = BANNERS_DATA.map(el => el.imgUrl);
  const { t } = useTranslation("welcome-page");

  usePreloadImages(imgUrls);

  useEffect(() => {
    if (isBannersOpen) {
      lockScroll(true);
    }

    return () => {
      lockScroll(false);
    };
  }, [isBannersOpen]);

  if (!isBannersOpen) return null;

  return (
    <div className="fixed inset-[0] z-[100] flex h-[100vh] w-full flex-col justify-between overflow-y-auto bg-white">
      <div>
        <ProgressBar />
        <BannerCard
          title={t(data.titleTranslateKey)}
          description={t(data.descriptionTranslateKey)}
          imgUrl={data.imgUrl}
        />
      </div>
      <ActionButtons />
    </div>
  );
};

export default Banners;
