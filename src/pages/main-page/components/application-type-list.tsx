import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";
import { APPLICATION_TYPES } from "../data";
import ApplicationTypeCard from "./application-type-card";
import { ApplicationCardType } from "@/pages/main-page/types.ts";
import InDevelopmentPlaceholder from "@/pages/main-page/components/in-development-placeholder.tsx";
import { useTelegram } from "@/hooks/useTelegram";
import { useShopStore } from "@/store/shop-store";
import { RoutesPaths } from "@/routes/paths.config";

const ApplicationTypeList: FC = () => {
  const { t } = useTranslation("main-page");
  const [activeStep] = useShopStore(state => [state.activeStep]);
  const { tg } = useTelegram();

  const stepHref = useMemo(() => {
    switch (activeStep) {
      case "second":
        return `${RoutesPaths.CREATE_APP}/${RoutesPaths.SECOND_STEP}`;
      case "third":
        return `${RoutesPaths.CREATE_APP}/${RoutesPaths.THIRD_STEP}`;
      case "payment":
        return `${RoutesPaths.CREATE_APP}/${RoutesPaths.CREATION_PAYMENT}`;
      default:
        return `${RoutesPaths.CREATE_APP}/${RoutesPaths.FIRST_STEP}`;
    }
  }, [activeStep]);

  const data = APPLICATION_TYPES.reduce(
    (acc, elem) =>
      elem.blocked
        ? { ...acc, blocked: [...acc.blocked, elem] }
        : { ...acc, unblocked: [...acc.unblocked, elem] },
    { blocked: [], unblocked: [] } as {
      blocked: ApplicationCardType[];
      unblocked: ApplicationCardType[];
    }
  );

  return (
    <div className="flex flex-col gap-y-4 pb-[99px]">
      <div className="flex flex-col gap-2">
        {data.unblocked.map(el => (
          <ApplicationTypeCard
            key={el.title}
            icon={el.icon}
            href={stepHref}
            description={t(el.description as any)}
          >
            {t(el.title as any)}
          </ApplicationTypeCard>
        ))}

        <div className="relative">
          <InDevelopmentPlaceholder />
          {data.blocked.map(el => (
            <ApplicationTypeCard
              key={el.title}
              icon={el.icon}
              href={el.href}
              description={t(el.description as any)}
            >
              {t(el.title as any)}
            </ApplicationTypeCard>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-[3px]">
        <Typography
          variant="body-sm"
          tag="p"
          color="black_60"
          className="font-normal"
        >
          {t("link.text")}
        </Typography>
        <button
          className="relative text-[12px] font-normal leading-[150%] text-black_60"
          onClick={() => tg.openTelegramLink("https://t.me/tapply_support")}
        >
          {t("link.href")}
          <div className="absolute bottom-[1px] h-[1px] w-full bg-black_60" />
        </button>
      </div>
    </div>
  );
};

export default ApplicationTypeList;
