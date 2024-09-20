import { FC, useEffect } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import designVariant from "public/images/design-variant.webp";
import CustomizeForm from "./components/customize-form";
import { StepTwoFields } from "@/shared/types/types";
import { useMainStore } from "@/store/main-store";
import useHistoryBack from "@/hooks/useHistoryBack";
import { PageInfoCard } from "@/components";
import { useShopStore } from "@/store/shop-store";
import { useSecondCreationStepAPI } from "@/hooks/api/useSecondCreationStepAPI";

const DesignSettingsPage: FC = () => {
  const [isModalOpen] = useMainStore(state => [state.isModalOpen]);
  const [shopStepTwoFieldsData, setShopStepTwoFieldsData] = useShopStore(
    state => [state.shopStepTwoFieldsData, state.setShopStepTwoFieldsData]
  );
  const { goBack } = useHistoryBack();
  const params = useParams();
  const {
    design: { data, isSuccess },
  } = useSecondCreationStepAPI(params.designId);

  const methods = useForm<Omit<StepTwoFields, "totalPrice">>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (isSuccess) {
      setShopStepTwoFieldsData({
        font: data.font_style,
        textSize: data.textSize,
        theme: data.theme,
        highlightColor: data.highlightColor,
      });
    }
  }, [
    data,
    shopStepTwoFieldsData.theme,
    params.designId,
    setShopStepTwoFieldsData,
    isSuccess,
  ]);

  if (!data) return null;

  return (
    <div className="py-2">
      <BackButton
        onClick={() => {
          if (!isModalOpen) goBack();
        }}
      />
      <PageInfoCard
        pageType="design"
        title={data.name}
        description={data.description}
        imgUrl={designVariant}
      />
      <FormProvider {...methods}>
        <CustomizeForm
          name={data.name}
          description={data.description}
          mediaUrl="https://gpt-chatbot.ru/chat-gpt-ot-openai-dlya-generacii-teksta"
          price={+data.price.toFixed(2)}
          tags={data.tags}
        />
      </FormProvider>
    </div>
  );
};

export default DesignSettingsPage;
