import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AppSettingsFormLayout, FormWrapper } from "@/components";
import { AppSettingsFormFields, LocaleKeys } from "@/shared/types/types.ts";
import { useTelegram } from "@/hooks/useTelegram";
import { useUserAPI } from "@/hooks/api/useUserAPI";

const AppSettingForm: FC = () => {
  const { user } = useTelegram();
  const {
    getUserByTelegramId: { data, isSuccess, refetch },
  } = useUserAPI(user?.id);
  const { i18n } = useTranslation("translation");

  const methods = useForm<AppSettingsFormFields>({
    defaultValues: {
      language: i18n.t(`languages-modal.${i18n.language as LocaleKeys}`),
    },
  });

  useEffect(() => {
    if (isSuccess) {
      methods.reset({
        name: data?.firstname,
        lastName: data?.lastname,
      });
    }
    refetch();
  }, [data?.firstname, data?.lastname, isSuccess, methods, refetch]);

  return (
    <FormWrapper>
      <FormProvider {...methods}>
        <AppSettingsFormLayout type="edit" />
      </FormProvider>
    </FormWrapper>
  );
};

export default AppSettingForm;
