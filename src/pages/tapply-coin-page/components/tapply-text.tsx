import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";
import { TOKEN_USAGE } from "../data";

const TapplyText: FC = () => {
  const { t } = useTranslation("payment-page");

  return (
    <div className="mt-4 flex flex-col gap-y-[12px] px-6">
      <Typography variant="heading-lg" color="black_100" tag="h1">
        {t("link-text")}
      </Typography>
      <div className="flex flex-col gap-3">
        <Typography
          variant="body-base"
          className="font-normal"
          color="black_100"
        >
          {t("tapply-coin-page.description")}
        </Typography>
        <Typography
          variant="body-base"
          className="font-normal"
          color="black_100"
        >
          {t("tapply-coin-page.list-title")}
        </Typography>
        <ol className="ml-[6px] list-inside list-decimal">
          {TOKEN_USAGE.map(el => (
            <li key={el.text}>
              <Typography
                variant="body-base"
                className="font-normal"
                color="black_100"
              >
                {t(el.text)}
              </Typography>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TapplyText;
