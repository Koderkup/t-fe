import { FC } from "react";
import DollarIcon from "public/icons/dollar-sign.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import InformationIcon from "public/icons/information-line.svg";
import { useTranslation } from "react-i18next";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormWrapper,
  InputField,
  Label,
  PageContainer,
  PageInfo,
  Tooltip,
} from "@/components";
import { OrderSettingsFormFields } from "@/pages/order-settings/types.ts";
import { useAppConfigurationAPI } from "@/hooks/api/useAppConfigurationAPI.ts";
import { RoutesPaths } from "@/routes/paths.config";
import { useMainStore } from "@/store/main-store";

const pricesPreset = [100, 200, 300, 400];

const OrderSettings: FC = () => {
  const { t } = useTranslation("order-settings-page");
  const { updateAppConfiguration } = useAppConfigurationAPI();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const navigate = useNavigate();

  const { register, watch, setValue, formState, handleSubmit } =
    useForm<OrderSettingsFormFields>({
      defaultValues: {
        minOrderAmountWithDelivery: "",
        minOrderAmountWithoutDelivery: "",
        forwardingId: "",
      },
    });
  const amount = watch("minOrderAmountWithDelivery");
  const amountWithDelivery = watch("minOrderAmountWithoutDelivery");

  const handleSelect = (inputId: string, value: number) => {
    if (inputId === "minOrderAmountWithDelivery") {
      setValue("minOrderAmountWithDelivery", value);
    }

    if (inputId === "minOrderAmountWithoutDelivery") {
      setValue("minOrderAmountWithoutDelivery", value);
    }
  };

  const onSubmit: SubmitHandler<OrderSettingsFormFields> = data => {
    updateAppConfiguration.mutate({
      data: {
        minOrderAmountWithDelivery: Number(data.minOrderAmountWithDelivery),
        minOrderAmountWithoutDelivery: Number(
          data.minOrderAmountWithoutDelivery
        ),
        forwardingId: data.forwardingId,
      },
      shopId: activeShopId || "",
    });
  };

  return (
    <PageContainer className="flex h-screen flex-col">
      <BackButton
        onClick={() => navigate(`${RoutesPaths.ADMINISTRATE}/${activeShopId}`)}
      />
      <PageInfo title={t("title")} />

      <FormWrapper className="flex flex-col gap-y-4">
        <InputField
          label={t("min-order-amount")}
          placeholder="0"
          leftIcon={<DollarIcon />}
          type="number"
          {...register("minOrderAmountWithDelivery")}
        />

        <div className="flex gap-2">
          {pricesPreset.map(elem => (
            <Label
              key={elem}
              onClick={() => handleSelect("minOrderAmountWithDelivery", elem)}
              selected={amount === elem}
            >
              ${elem}
            </Label>
          ))}
        </div>

        <InputField
          label={t("min-order-amount-with-delivery")}
          placeholder="0"
          leftIcon={<DollarIcon />}
          type="number"
          {...register("minOrderAmountWithoutDelivery")}
        />

        <div className="flex gap-2">
          {pricesPreset.map(elem => (
            <Label
              key={elem}
              onClick={() =>
                handleSelect("minOrderAmountWithoutDelivery", elem)
              }
              selected={amountWithDelivery === elem}
            >
              ${elem}
            </Label>
          ))}
        </div>

        <InputField
          label={t("forwarding-id")}
          placeholder={t("forwarding-id-placeholder")}
          type="number"
          {...register("forwardingId")}
          rightIcon={
            <Tooltip
              parent={<InformationIcon />}
              id="forwarding id"
              content={t("tooltip-text")}
              noArrow
              place="top-start"
            />
          }
        />
      </FormWrapper>

      <Button
        className="mt-auto"
        disabled={!formState.isDirty}
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        {t("button-text")}
      </Button>
    </PageContainer>
  );
};

export default OrderSettings;
