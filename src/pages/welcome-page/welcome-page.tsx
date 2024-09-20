import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@twa-dev/sdk/react";
import { useTranslation } from "react-i18next";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import WelcomeText from "./components/welcome-text";
import { AppSettingsFormLayout, Button } from "@/components";
import { AppSettingsFormFields, LocaleKeys } from "@/shared/types/types";
import { useUserAPI } from "@/hooks/api/useUserAPI.ts";
import { useTelegram } from "@/hooks/useTelegram.ts";
import { useMainStore } from "@/store/main-store";

const WelcomePage: FC = () => {
  const { i18n } = useTranslation("translation");
  const [toggleBanners] = useMainStore(state => [state.toggleBanners]);
  const navigate = useNavigate();
  const { createUser } = useUserAPI();
  const { user } = useTelegram();

  const methods = useForm<AppSettingsFormFields>({
    defaultValues: {
      language: i18n.t(`languages-modal.${i18n.language as LocaleKeys}`),
      name: user?.first_name,
      lastName: user?.last_name,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<AppSettingsFormFields> = ({
    name,
    lastName,
  }) => {
    if (!user?.id) return;

    createUser.mutate({
      firstname: name,
      lastname: lastName,
      telegramId: user.id.toString(),
    });
  };

  useEffect(() => {
    if (createUser.isSuccess) toggleBanners();
  }, [createUser.isSuccess, toggleBanners]);

  return (
    <div className="flex h-screen flex-col justify-between pb-[9px]">
      <BackButton onClick={() => navigate(-1)} />
      <div className="flex flex-col gap-8">
        <WelcomeText />
        <FormProvider {...methods}>
          <AppSettingsFormLayout />
        </FormProvider>
      </div>
      <div className="px-4 py-[10px]">
        <Button onClick={methods.handleSubmit(onSubmit)} type="submit">
          {i18n.t("action-sheet.actions.continue")}
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
