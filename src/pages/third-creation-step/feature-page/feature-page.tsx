import { BackButton } from "@twa-dev/sdk/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useHistoryBack from "@/hooks/useHistoryBack";
import { Button, PageInfoCard } from "@/components";
import { useShopStore } from "@/store/shop-store";
import { useThirdCretionStepAPI } from "@/hooks/api/useThirdCreationStepAPI";

const FeaturePage: FC = () => {
  const { t } = useTranslation("step-three-page");
  const params = useParams();
  const {
    functionality: { data },
  } = useThirdCretionStepAPI(params.featureId);
  const [addFeature] = useShopStore(state => [state.addFeature]);
  const { goBack } = useHistoryBack();

  if (!data) return null;

  return (
    <div className="px-4 py-2">
      <BackButton onClick={goBack} />
      <div className="flex h-screen flex-col justify-between">
        <PageInfoCard
          pageType="feature"
          title={data.name}
          description={data.description}
          price={+data.price.toFixed(2)}
          imgUrl={data.mediaUrl}
        />
        <div className="py-2">
          <Button
            onClick={() => {
              addFeature({
                featureId: data.id.toString(),
                featurePrice: +data.price.toFixed(2),
                featureText: data.name,
                featureTitle: `${data.name} feature`,
              });
              goBack();
            }}
          >
            {t("feature-page.add-for", {
              price: `$${+data.price.toFixed(2)}`,
            })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturePage;
